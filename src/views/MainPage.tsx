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
import svgIcons from "../utils/svgIcons";

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
		errors: [] as string[],
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
		const prevState = prevStateRef.current;
		if (
			prevState &&
			JSON.stringify(prevState.setList) !== JSON.stringify(state.setList)
		) {		
			const selectedCards = state.setList.reduce(
				(accumulator: Card[], setName: ESet) => {
					return accumulator.concat(setMapping[setName] || []);
				},
				[]
			);
			setMainPageState((prev) => ({ ...prev, currentSetCards: selectedCards }));
		}
		prevStateRef.current = state;
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
		const final = createTheTown(
			mainPageState.townMaterial,
			mainPageState.currentSetCards,
			state
		);
		const finalTown = final.town;
		const errorList = final.ERROR_LIST;
		setMainPageState((prev) => ({ ...prev, finalTown: [...finalTown] }));
		setMainPageState((prev) => ({ ...prev, errors: [...errorList] }));
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
		handleReset();
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
		const finalTown = final.town;
		const errorList = final.ERROR_LIST;
		console.log(`Final town`, final);

		setMainPageState((prev) => ({ ...prev, errors: [] }));
		setMainPageState((prev) => ({ ...prev, finalTown: [] }));
		setMainPageState((prev) => ({ ...prev, finalTown: [...finalTown] }));
		setMainPageState((prev) => ({ ...prev, errors: [...errorList] }));
	};

	if (mainPageState.finalTown.length === 10) {
		return (
			<div className="final-town-wrapper">
				<LegendBox />
				<StateBox
					state={state}
					resetFinalTown={resetFinalTown}
					reRunTown={reRunTown}
					errors={mainPageState.errors}
				/>
				{state.listView === false ? (
					<div className="town-grid">
						{mainPageState.finalTown.map((card, index) => (
							<div className="card-background heart-indicator">
								<div className="set-heart-indicator">
									{card.set === ESet.BaseSet && svgIcons.svgHeartIcons.base_set}
									{card.set === ESet.ExpandingTheHouse &&
										svgIcons.svgHeartIcons.expanding_the_house}
									{card.set === ESet.RomanticVacation &&
										svgIcons.svgHeartIcons.romantic_vacation}
									{card.set === ESet.Oktoberfest &&
										svgIcons.svgHeartIcons.oktoberfest}
									{card.set === ESet.WinterRomance &&
										svgIcons.svgHeartIcons.winter_romance}
								</div>
								<CardStructure
									key={card.id + card.set}
									card={card}
									genericMaidUrl={genericMaidList[index]}
								/>
							</div>
						))}
					</div>
				) : (
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
