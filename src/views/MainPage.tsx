import { useContext, useEffect, useRef, useState } from "react";
import BeerTile from "../components/tiles/BeerTile";
import BuildingsTile from "../components/tiles/BuildingsTile";
import CouplesTile from "../components/tiles/CouplesTile";
import EventsTile from "../components/tiles/EventsTile";
import PrivateMaidTile from "../components/tiles/PrivateMaidTile";
import ReminescensesTile from "../components/tiles/ReminescensesTile";
import SetTile from "../components/tiles/SetTile";
import SistersTile from "../components/tiles/SistersTile";
import { StateContext } from "../utils/stateHandler";
import { Card, ESet, FilterState } from "../utils/types";
import db from "../../db.json";
import {
	filterCards,
	// chooseChambermaidChiefs,
	createTheTown,
} from "../utils/CardFilterService";
import SlantTile from "../components/tiles/SlantTile";
import CardStructure from "../components/town-building-blocks/CardStructure";
import LegendBox from "../components/town-building-blocks/LegendBox";
import StateBox from "../components/town-building-blocks/StateBox";

const MainPage: React.FC = () => {
	console.log(
		`Welcome to my Tanto Cuore Randomizer! If you're curious how I built this, please feel free to dig through my GiHub linked at the bottom. Happy playing!`
	);
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

	// Maps the ESet enum values to the corresponding database keys
	const setMapping: { [key in ESet]: Card[] } = {
		[ESet.BaseSet]: db.base_set as Card[],
		[ESet.ExpandingTheHouse]: db.expanding_the_house as Card[],
		[ESet.WinterRomance]: db.winter_romance as Card[],
		[ESet.Oktoberfest]: db.oktoberfest as Card[],
		[ESet.RomanticVacation]: db.romantic_vacation as Card[],
	};

	//When the state changes, this useEffect triggers
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

	// useEffect to update townMaterial whenever currentSetCards changes
	useEffect(() => {
		if (isInitialized) {
			//Filtering the cards and setting the town material here
			//While we could do this in a different place, it's done here on each state change to ensure there are still 10 cards at least in the town materials. If not, it throws an error to the frontend that there aren't enough cards to make a town.
			//This, while less performant, will make it so the user sees an immediate change when a choice they've made has pulled the town material to less than 10, not enough to make a town. Then they can choose other options, knowing what limited the pool too much. Feels better from a user experiance prespective rather than doing this all on submit when the user is done selecting all the different options.
			const townMaterial: Card[] = filterCards(currentSetCards, state);
			setTownMaterial(townMaterial);
			if (
				townMaterial.length < 10 &&
				state.setList.length > 0 &&
				currentSetCards.length > 0
			) {
				alert("Less than 10");
			}
		}
	}, [currentSetCards, state, isInitialized]);

	const handleTownCreation = () => {
		//Refactor implement this
		// const cheifs = chooseChambermaidChiefs(townMaterial);
		const final = createTheTown(townMaterial, state);
		//Sets the final array to what was returned from creating the town
		setFinalTown([...final]);
	};

	const maidUrlList: string[] = [
		"/images/genericMaids/maid1.jpg",
		"/images/genericMaids/maid2.jpg",
		"/images/genericMaids/maid3.jpg",
		"/images/genericMaids/maid4.jpg",
		"/images/genericMaids/maid5.jpg",
		"/images/genericMaids/maid6.jpg",
		"/images/genericMaids/maid7.jpg",
		"/images/genericMaids/maid8.jpg",
		"/images/genericMaids/maid9.jpg",
		"/images/genericMaids/maid10.jpg",
		"/images/genericMaids/maid11.jpg",
		"/images/genericMaids/maid12.jpg",
		"/images/genericMaids/maid13.jpg",
		"/images/genericMaids/maid14.jpg",
		"/images/genericMaids/maid15.jpg",
		"/images/genericMaids/maid16.jpg",
		"/images/genericMaids/maid17.jpg",
		"/images/genericMaids/maid18.jpg",
		"/images/genericMaids/maid19.jpg",
		"/images/genericMaids/maid20.jpg",
		"/images/genericMaids/maid21.jpg",
		"/images/genericMaids/maid22.jpg",
		"/images/genericMaids/maid23.jpg",
		"/images/genericMaids/maid24.jpg",
		"/images/genericMaids/maid25.jpg",
		"/images/genericMaids/maid26.jpg",
		"/images/genericMaids/maid27.jpg",
		"/images/genericMaids/maid28.jpg",
		"/images/genericMaids/maid29.jpg",
		"/images/genericMaids/maid30.jpg",
		"/images/genericMaids/maid31.jpg",
		"/images/genericMaids/maid32.jpg",
	];

	const maidUrlListCopy = maidUrlList;
	const genericMaidList: string[] = [];
	function getRandomMaid() {
		for (let i = 0; i < 10; i++) {
			const index = Math.floor(Math.random() * maidUrlListCopy.length);
			genericMaidList.push(maidUrlList[index]);
			maidUrlListCopy.splice(index, 1);
		}
	}
	getRandomMaid();
	return (
		<div className="choices-view-container">
			{finalTown.length < 10 && (
				<>
					<SetTile />
					<div className="tile-wrapper">
						<div
							className={
								state.setList.includes(ESet.BaseSet) ? "disabledFilter" : ""
							}
						></div>
						<SistersTile />
					</div>

					<PrivateMaidTile
						enabledClass={
							state.setList.includes(ESet.BaseSet) ||
							state.setList.includes(ESet.ExpandingTheHouse)
								? "tileEnabled"
								: "tileDisabled"
						}
					/>
					<EventsTile
						enabledClass={
							state.setList.includes(ESet.BaseSet) ||
							state.setList.includes(ESet.Oktoberfest) ||
							state.setList.includes(ESet.WinterRomance)
								? "tileEnabled"
								: "tileDisabled"
						}
					/>
					<BuildingsTile
						enabledClass={
							state.setList.includes(ESet.ExpandingTheHouse) ||
							state.setList.includes(ESet.Oktoberfest) ||
							state.setList.includes(ESet.WinterRomance)
								? "tileEnabled"
								: "tileDisabled"
						}
					/>
					<ReminescensesTile
						enabledClass={
							state.setList.includes(ESet.RomanticVacation)
								? "tileEnabled"
								: "tileDisabled"
						}
					/>
					<BeerTile
						enabledClass={
							state.setList.includes(ESet.RomanticVacation)
								? "tileEnabled"
								: "tileDisabled"
						}
					/>
					<CouplesTile
						enabledClass={
							state.setList.includes(ESet.WinterRomance)
								? "tileEnabled"
								: "tileDisabled"
						}
					/>
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
				</>
			)}
			{finalTown.length === 10 && (
				<>
					<LegendBox />
					<StateBox state={state} />
					<div className="town-grid">
						{finalTown.map((card, index) => (
							<CardStructure
								key={card.id + card.set}
								card={card}
								genericMaidUrl={genericMaidList[index]}
							/>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default MainPage;
