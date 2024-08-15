import { ReactNode } from "react";

//State shape
export interface FilterState {
	setList: ESet[];
	bannedCards: string[];
	sisterInclusion: number;
	attackCards: string;
	beerOptions: EBeerOptions;
	reminescenseOptions: EReminescenses;
	booleans: booleanOptions;
}

//Pulling out the boolean options
type booleanOptions = {
	includePrivateMaids: boolean;
	includeEvents: boolean;
	includeBuildings: boolean;
	includeCouples: boolean;
	highVictoryPoints: boolean;
	lowVictoryPoints: boolean;
	highLoveCost: boolean;
	lowLoveCost: boolean;
	highLoveGive: boolean;
	lowLoveGive: boolean;
	highServings: boolean;
	lowServings: boolean;
	highDraw: boolean;
	lowDraw: boolean;
	highEmployEffects: boolean;
	lowEmployEffects: boolean;
};

//The set enum
export enum ESet {
	BaseSet = "base_set",
	ExpandingTheHouse = "expanding_the_house",
	RomanticVacation = "romantic_vacation",
	Oktoberfest = "oktoberfest",
	WinterRomance = "winter_romance",
}

//The booleans enum
export enum EBooleans {
	baseSet = "baseSet",
	includePrivateMaids = "includePrivateMaids",
	includeEvents = "includeEvents",
	includeBuildings = "includeBuildings",
	includeReminecsenses = "includeReminecsenses",
	forceBeer = "forceBeer",
	includeCouples = "includeCouples",
	highVictoryPoints = "highVictoryPoints",
	lowVictoryPoints = "lowVictoryPoints",
	highLoveCost = "highLoveCost",
	lowLoveCost = "lowLoveCost",
	highLoveGive = "highLoveGive",
	lowLoveGive = "lowLoveGive",
	highServings = "highServings",
	lowServings = "lowServings",
	highDraw = "highDraw",
	lowDraw = "lowDraw",
	highEmployEffects = "highEmployEffects",
	lowEmployEffects = "lowEmployEffects",
}

//The reminesenses enum
export enum EReminescenses {
	All = "all",
	Purchasable = "allPurchasable",
	Exclude = "exclude",
}

export enum EBeerOptions {
	NoPreference = "noPreference",
	Force = "forceBeer",
	Exclude = "excludeBeer",
}
//Showing state that we have children to pass in and that they're reactnodes
export interface StateProviderProps {
	children: ReactNode;
}

//The handler for the state actions. Without adding it here, we can't use a new action.
export type Action =
	| { type: "TOGGLE_BOOLEAN"; payload: keyof FilterState["booleans"] }
	| { type: "HANDLE_SET_LIST"; payload: ESet }
	| { type: "SET_SISTER_INCLUSION"; payload: number }
	| {
			type: "SET_SELECTED_OPTION";
			payload: { key: keyof FilterState; value: string };
	  };
// Add more action types for other booleans as needed

//When card coems back from data bse, we type cast to this to ensure that the thingies are speled correctly
export interface Card {
	name: string;
	cardTitle: string;
	pictureUrl?: string;
	promo: boolean;
	employEffect: boolean;
	chiefMaid: boolean;
	beerMaid: boolean;
	eventRequired: boolean;
	couplesRequired: boolean;
	reminescenceRequired: boolean;
	chamberMaid: boolean;
	crescentSister: boolean;
	stackingVP: boolean;
	victoryPoints: number;
	negativeVP: boolean;
	purchasePrice: number;
	cardDraw: number;
	employs: number;
	servings: number;
	love: number;
	cardID: number;
	set: ESet;
	id?: number;
}
