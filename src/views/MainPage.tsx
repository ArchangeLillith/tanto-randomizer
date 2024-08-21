import { useCallback, useContext, useEffect, useRef, useState } from "react";
import {
	BeerTile,
	BuildingsTile,
	CouplesTile,
	EventsTile,
	PrivateMaidTile,
	ReminescensesTile,
	SetTile,
	SistersTile,
	SlantTile,
	BannedMaidsTile,
	CautionTile,
} from "../components/tiles/index";
import { StateContext } from "../utils/stateHandler";
import { Card, ESet, FilterState, setMapping } from "../utils/types";
import {
	filterCards,
	// chooseChambermaidChiefs,
} from "../utils/CardFilterService";
import {
	CardStructure,
	LegendBox,
	StateBox,
} from "../components/town-building-blocks";
import { CSSTransition } from "react-transition-group";
import { maidUrlList } from "../../genericMaidUrls";
import { createTheTown } from "../utils/CreateTheTown";
import ListView from "./ListView";
import Footer from "../components/Footer";

const MainPage: React.FC = () => {
	const { state, dispatch } = useContext(StateContext);

	const [mainPageState, setMainPageState] = useState({
		currentSetCards: [] as Card[],
		townMaterial: [] as Card[],
		finalTown: [] as Card[],
		isInitialized: false,
		showSistersTile: false,
		showPrivateMaids: false,
		showEvents: false,
		showBuildings: false,
		showReminescenses: false,
		showBeer: false,
		showCouples: false,
	});
	const prevStateRef = useRef<FilterState | undefined>(undefined);

	/**
	 * Handles updating if the tile should be shown or not depending on what's in the state.setList
	 * react-transition-groups handles the logic
	 */
	const updateVisibility = useCallback(() => {
		const visibilityConfig = [
			{
				sets: [ESet.BaseSet],
				setter: (value: boolean) =>
					setMainPageState((prev) => ({ ...prev, showSistersTile: value })),
			},
			{
				sets: [ESet.BaseSet, ESet.ExpandingTheHouse],
				setter: (value: boolean) =>
					setMainPageState((prev) => ({ ...prev, showPrivateMaids: value })),
			},
			{
				sets: [ESet.BaseSet, ESet.Oktoberfest, ESet.WinterRomance],
				setter: (value: boolean) =>
					setMainPageState((prev) => ({ ...prev, showEvents: value })),
			},
			{
				sets: [ESet.ExpandingTheHouse, ESet.Oktoberfest, ESet.WinterRomance],
				setter: (value: boolean) =>
					setMainPageState((prev) => ({ ...prev, showBuildings: value })),
			},
			{
				sets: [ESet.RomanticVacation],
				setter: (value: boolean) =>
					setMainPageState((prev) => ({ ...prev, showReminescenses: value })),
			},
			{
				sets: [ESet.Oktoberfest],
				setter: (value: boolean) =>
					setMainPageState((prev) => ({ ...prev, showBeer: value })),
			},
			{
				sets: [ESet.WinterRomance],
				setter: (value: boolean) =>
					setMainPageState((prev) => ({ ...prev, showCouples: value })),
			},
		];

		visibilityConfig.forEach(({ sets, setter }) => {
			setter(sets.some((set) => state.setList.includes(set)));
		});
	}, [state.setList]);

	/**
	 * Runs when state changes. Sees if the setList has changed and if it has, re-populates the currentSetCards array with all the cards from the chosen sets. Also sets the initializer that allows other things to run, ensuring that errors aren't throw incorrectly because an array is empty on load
	 */
	useEffect(() => {
		// Retrieve the previous state from the ref
		const prevState = prevStateRef.current;
		//Create the currentSetCards array if the sets were what was changed
		if (
			prevState &&
			JSON.stringify(prevState.setList) !== JSON.stringify(state.setList)
		) {
			// `setList` has changed, so exit early
			//selectedCards is the result of the reducer function
			const selectedCards = state.setList.reduce(
				//accumulator is the place everything is added and persists between iterations, setName is the set that's currently being looked at
				(accumulator: Card[], setName: ESet) => {
					//setMapping[setName] calls to get the cards from the database, it's a bit weird due to the mapping caused by some typing issues and it makes it so we can do it in one call like this instead of looping through a bunch of ifs
					//If there are no cards for the set chosen, this returns nothing which should never happen but it's good to have extra error handling just in case
					//When the cards are grabbed, they're concatted with the potentially already populated accumulator as to not override.
					return accumulator.concat(setMapping[setName] || []);
				},
				[]
			);
			//Set the current state to the correct array that was just made
			setMainPageState((prev) => ({ ...prev, currentSetCards: selectedCards }));
		}
		// Update the ref to the current state
		prevStateRef.current = state;
		// Set initialization flag to true after the first render
		if (!mainPageState.isInitialized) {
			setMainPageState((prev) => ({ ...prev, isInitialized: true }));
		}
		//This is throwing a fit because the linter sees that I have the setMapping in the useEffect and it's warning me that there's no re-render when it changes. This doensn't matter because it's a stable, unchanging value declared outside the useEffect and we don't *want* the useEffect to triger off of that
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state]);

	/**
	 * Only runs if the above useEffect has run, meaning the user has selected a set or more. On state change, this filters the cards in the currentSetCards by what the user has selected, and yes this runs on every input the user does. While we could do this in a different place, it's done here on each state change to ensure there are still 10 cards at least in the town materials. If not, it throws an error to the frontend that there aren't enough cards to make a town. This, while less performant, will make it so the user sees an immediate change when a choice they've made has pulled the town material to less than 10, not enough to make a town. Then they can choose other options, knowing what limited the pool too much. Feels better from a user experience prespective rather than doing this all on submit when the user is done selecting all the different options.
	 * Throws an error if the town is less than 10
	 */
	useEffect(() => {
		if (mainPageState.isInitialized) {
			const filteredCards: Card[] = filterCards(
				mainPageState.currentSetCards,
				state
			);
			setMainPageState((prev) => ({ ...prev, townMaterial: filteredCards }));
			if (
				filteredCards.length < 10 &&
				state.setList.length > 0 &&
				mainPageState.currentSetCards.length > 0
			) {
				alert("Less than 10");
			}
		}
	}, [mainPageState.currentSetCards, state, mainPageState.isInitialized]);

	/**
	 * Watches the state.setList and calls updateVisibility on change
	 */
	useEffect(() => {
		updateVisibility();
	}, [state.setList, updateVisibility]);

	/**
	 * Calls to an external util to take in the town material and pull 10 cards from it. Random if there are no "force include" options selected (beer, sisters ect), OR random then checks to see if "force include" options are met. If they're not, it splices and adds the cards it needs to in order to align with the filter.
	 * @returns a Card[] of length 10
	 */
	const handleTownCreation = () => {
		if (state.setList.length < 1) {
			alert("Please choose a set");
			return;
		}
		//Refactor implement this
		// const cheifs = chooseChambermaidChiefs(townMaterial);
		const final = createTheTown(
			mainPageState.townMaterial,
			mainPageState.currentSetCards,
			state
		);
		//Sets the final array to what was returned from creating the town
		setMainPageState((prev) => ({ ...prev, finalTown: [...final] }));
	};

	/**
	 * Randomly selects 10 maidUrls from an external string array that coorespond to urls of generic maid images to be used if the card doesn't already have an image.
	 */
	const getRandomMaid = useCallback(() => {
		const maidUrlListCopy = [...maidUrlList];
		const genericMaidList: string[] = [];
		for (let i = 0; i < 10; i++) {
			const index = Math.floor(Math.random() * maidUrlListCopy.length);
			genericMaidList.push(maidUrlListCopy[index]);
			maidUrlListCopy.splice(index, 1);
		}
		return genericMaidList;
	}, [maidUrlList]);
	const genericMaidList = getRandomMaid();

	const handleReset = () => {
		dispatch({ type: "RESET_STATE" });
	};

	const resetFinalTown = () => {
		console.log(`Resetting final Town`);
		//Resets state
		handleReset();
		//Sets final town after so no wonky flickers happen
		setMainPageState((prev) => ({ ...prev, finalTown: [] }));
	};
	getRandomMaid();

	const reRunTown = () => {
		const setCards = state.setList.reduce(
			(accumulator: Card[], setName: ESet) => {
				return accumulator.concat(setMapping[setName] || []);
			},
			[]
		);
		console.log(`Grabbed set cards`, setCards);
		const townMaterial: Card[] = filterCards(setCards, state);
		console.log(`Filtered`, townMaterial);
		const final = createTheTown(townMaterial, setCards, state);
		console.log(`Final town`, final);

		setMainPageState((prev) => ({ ...prev, finalTown: [] }));
		setMainPageState((prev) => ({ ...prev, finalTown: [...final] }));
	};

	if (mainPageState.finalTown.length === 10) {
		return (
			<div className="final-town-wrapper">
				<LegendBox />
				<StateBox
					state={state}
					resetFinalTown={resetFinalTown}
					reRunTown={reRunTown}
				/>
				{state.listView === false ? (
					<div className="town-grid">
						{mainPageState.finalTown.map((card, index) => (
							<CardStructure
								key={card.id + card.set}
								card={card}
								genericMaidUrl={genericMaidList[index]}
							/>
						))}
					</div>
				) : (
					//Pull this into tile when done
					<ListView finalTown={mainPageState.finalTown} />
				)}
				<Footer />
			</div>
		);
	}

	return (
		<div className="choices-view-container">
			{mainPageState.townMaterial.length > 0 && (
				<div className="right-fixed-box">
					<ul className="nameDisplayList">
						{mainPageState.currentSetCards.map((card) => {
							//Pull the chief maids out cause they're pulled out anyways
							if (!card.chiefMaid)
								return (
									<li
										key={card.name}
										className={
											mainPageState.townMaterial.includes(card)
												? "enabledName"
												: "disabledName"
										}
									>
										{card.name}
									</li>
								);
						})}
					</ul>
				</div>
			)}
			<SetTile />
			<CSSTransition
				in={mainPageState.showSistersTile}
				timeout={300}
				classNames="tile"
				unmountOnExit
			>
				<SistersTile />
			</CSSTransition>
			<CSSTransition
				in={mainPageState.showReminescenses}
				timeout={300}
				classNames="tile"
				unmountOnExit
			>
				<ReminescensesTile />
			</CSSTransition>
			<CSSTransition
				in={mainPageState.showBeer}
				timeout={300}
				classNames="tile"
				unmountOnExit
			>
				<BeerTile />
			</CSSTransition>
			<CSSTransition
				in={
					mainPageState.showBeer ||
					mainPageState.showReminescenses ||
					mainPageState.showSistersTile
				}
				timeout={300}
				classNames="tile"
				unmountOnExit
			>
				<CautionTile />
			</CSSTransition>
			<CSSTransition
				in={mainPageState.showPrivateMaids}
				timeout={300}
				classNames="tile"
				unmountOnExit
			>
				<PrivateMaidTile />
			</CSSTransition>
			<CSSTransition
				in={mainPageState.showEvents}
				timeout={300}
				classNames="tile"
				unmountOnExit
			>
				<EventsTile />
			</CSSTransition>
			<CSSTransition
				in={mainPageState.showBuildings}
				timeout={300}
				classNames="tile"
				unmountOnExit
			>
				<BuildingsTile />
			</CSSTransition>

			<CSSTransition
				in={mainPageState.showCouples}
				timeout={300}
				classNames="tile"
				unmountOnExit
			>
				<CouplesTile />
			</CSSTransition>
			<BannedMaidsTile />

			<SlantTile />
			<div className="button-container">
				<button
					className="button-75"
					role="button"
					onClick={handleTownCreation}
				>
					<span className="text">Create Town!</span>
				</button>
			</div>
			<Footer />
		</div>
	);
};

export default MainPage;
