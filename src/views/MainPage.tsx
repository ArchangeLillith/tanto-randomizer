import { useCallback, useContext, useEffect, useRef, useState } from "react";
import BeerTile from "../components/tiles/BeerTile";
import BuildingsTile from "../components/tiles/BuildingsTile";
import CouplesTile from "../components/tiles/CouplesTile";
import EventsTile from "../components/tiles/EventsTile";
import PrivateMaidTile from "../components/tiles/PrivateMaidTile";
import ReminescensesTile from "../components/tiles/ReminescensesTile";
import SetTile from "../components/tiles/SetTile";
import SistersTile from "../components/tiles/SistersTile";
import { StateContext } from "../utils/stateHandler";
import { Card, ESet, FilterState, setMapping } from "../utils/types";
import {
	filterCards,
	// chooseChambermaidChiefs,
} from "../utils/CardFilterService";
import SlantTile from "../components/tiles/SlantTile";
import CardStructure from "../components/town-building-blocks/CardStructure";
import LegendBox from "../components/town-building-blocks/LegendBox";
import StateBox from "../components/town-building-blocks/StateBox";
import { CSSTransition } from "react-transition-group";
import { maidUrlList } from "../utils";
import BannedMaidsTile from "../components/tiles/BannedMaidsTile";
import { createTheTown } from "../utils/CreateTheTown";
import CautionTile from "../components/tiles/CautionTile";
import ListView from "./ListView";
import Footer from "../components/Footer";

const MainPage: React.FC = () => {
	// console.log(
	// 	`Welcome to my Tanto Cuore Randomizer! If you're curious how I built this, please feel free to dig through my GiHub linked at the bottom. Happy playing!`
	// );
	const { state } = useContext(StateContext);
	//The current sets cards in one big array
	const [currentSetCards, setCurrentSetCards] = useState<Card[]>([]);
	//All the cards that pass the filters
	const [townMaterial, setTownMaterial] = useState<Card[]>([]);
	//Final cards to be displayed in the town
	const [finalTown, setFinalTown] = useState<Card[]>([]);
	//Boolean to make sure the screen renders once
	const [isInitialized, setIsInitialized] = useState<boolean>(false);
	// Ref to store previous state
	const prevStateRef = useRef<FilterState | undefined>(undefined);
	//The handlers that show when a tile shoud be rendered for react-transition-groups
	const [showSistersTile, setShowSistersTile] = useState(false);
	const [showPrivateMaids, setShowPrivateMaids] = useState(false);
	const [showEvents, setShowEvents] = useState(false);
	const [showBuildings, setShowBuildings] = useState(false);
	const [showReminescenses, setShowReminescenses] = useState(false);
	const [showBeer, setShowBeer] = useState(false);
	const [showCouples, setShowCouples] = useState(false);

	/**
	 * Handles updating if the tile should be shown or not depending on what's in the state.setList
	 * react-transition-groups handles the logic
	 */
	const updateVisibility = useCallback(() => {
		const visibilityConfig = [
			{ sets: [ESet.BaseSet], setter: setShowSistersTile },
			{
				sets: [ESet.BaseSet, ESet.ExpandingTheHouse],
				setter: setShowPrivateMaids,
			},
			{
				sets: [ESet.BaseSet, ESet.Oktoberfest, ESet.WinterRomance],
				setter: setShowEvents,
			},
			{
				sets: [ESet.ExpandingTheHouse, ESet.Oktoberfest, ESet.WinterRomance],
				setter: setShowBuildings,
			},
			{ sets: [ESet.RomanticVacation], setter: setShowReminescenses },
			{ sets: [ESet.Oktoberfest], setter: setShowBeer },
			{ sets: [ESet.WinterRomance], setter: setShowCouples },
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
			setCurrentSetCards(selectedCards);
		}
		// Update the ref to the current state
		prevStateRef.current = state;
		// Set initialization flag to true after the first render
		if (!isInitialized) {
			setIsInitialized(true);
		}
		//This is throwing a fit because the linter sees that I have the setMapping in the useEffect and it's warning me that there's no re-render when it changes. This doensn't matter because it's a stable, unchanging value declared outside the useEffect and we don't *want* the useEffect to triger off of that
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state]);

	/**
	 * Only runs if the above useEffect has run, meaning the user has selected a set or more. On state change, this filters the cards in the currentSetCards by what the user has selected, and yes this runs on every input the user does. While we could do this in a different place, it's done here on each state change to ensure there are still 10 cards at least in the town materials. If not, it throws an error to the frontend that there aren't enough cards to make a town. This, while less performant, will make it so the user sees an immediate change when a choice they've made has pulled the town material to less than 10, not enough to make a town. Then they can choose other options, knowing what limited the pool too much. Feels better from a user experience prespective rather than doing this all on submit when the user is done selecting all the different options.
	 * Throws an error if the town is less than 10
	 */
	useEffect(() => {
		if (isInitialized) {
			const filteredCards: Card[] = filterCards(currentSetCards, state);
			setTownMaterial(filteredCards);
			if (
				filteredCards.length < 10 &&
				state.setList.length > 0 &&
				currentSetCards.length > 0
			) {
				alert("Less than 10");
			}
		}
	}, [currentSetCards, state, isInitialized]);

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
		const final = createTheTown(townMaterial, currentSetCards, state);
		//Sets the final array to what was returned from creating the town
		setFinalTown([...final]);
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

	getRandomMaid();

	if (finalTown.length === 10) {
		return (
			<div className="final-town-wrapper">
				<LegendBox />
				<StateBox state={state} />
				{state.listView === false ? (
					<div className="town-grid">
						{finalTown.map((card, index) => (
							<CardStructure
								key={card.id + card.set}
								card={card}
								genericMaidUrl={genericMaidList[index]}
							/>
						))}
					</div>
				) : (
					//Pull this into tile when done
					<ListView finalTown={finalTown} />
				)}
				<Footer />
			</div>
		);
	}

	return (
		<div className="choices-view-container">
			{townMaterial.length > 0 && (
				<div className="right-fixed-box">
					<ul className="nameDisplayList">
						{currentSetCards.map((card) => {
							//Pull the chief maids out cause they're pulled out anyways
							if (!card.chiefMaid)
								return (
									<li
										key={card.name}
										className={
											townMaterial.includes(card)
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
				in={showSistersTile}
				timeout={300}
				classNames="tile"
				unmountOnExit
			>
				<SistersTile />
			</CSSTransition>
			<CSSTransition
				in={showReminescenses}
				timeout={300}
				classNames="tile"
				unmountOnExit
			>
				<ReminescensesTile />
			</CSSTransition>
			<CSSTransition
				in={showBeer}
				timeout={300}
				classNames="tile"
				unmountOnExit
			>
				<BeerTile />
			</CSSTransition>
			<CSSTransition
				in={showBeer || showReminescenses || showSistersTile}
				timeout={300}
				classNames="tile"
				unmountOnExit
			>
				<CautionTile />
			</CSSTransition>
			<CSSTransition
				in={showPrivateMaids}
				timeout={300}
				classNames="tile"
				unmountOnExit
			>
				<PrivateMaidTile />
			</CSSTransition>
			<CSSTransition
				in={showEvents}
				timeout={300}
				classNames="tile"
				unmountOnExit
			>
				<EventsTile />
			</CSSTransition>
			<CSSTransition
				in={showBuildings}
				timeout={300}
				classNames="tile"
				unmountOnExit
			>
				<BuildingsTile />
			</CSSTransition>

			<CSSTransition
				in={showCouples}
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
