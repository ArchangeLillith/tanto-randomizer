import db from "../../db.json";

//State shape
export interface FilterState {
	setList: ESet[];
	bannedCards: string[];
	sisterInclusion: number;
	attackOptions: EAttackOptions;
	beerOptions: EBeerOptions;
	reminescenseOptions: EReminescenseOptions;
	booleans: stateBooleans;
	victoryPointSlant: ESlantOptions;
	cardDrawSlant: ESlantOptions;
	loveCostSlant: ESlantOptions;
	loveGiveSlant: ESlantOptions;
	servingsSlant: ESlantOptions;
	employEffectsSlant: ESlantOptions;
}
//Pulling out the boolean options
type stateBooleans = {
	includePrivateMaids: boolean;
	includeEvents: boolean;
	includeBuildings: boolean;
	includeCouples: boolean;
};

export enum ESet {
	BaseSet = "base_set",
	ExpandingTheHouse = "expanding_the_house",
	RomanticVacation = "romantic_vacation",
	Oktoberfest = "oktoberfest",
	WinterRomance = "winter_romance",
}
export enum EBooleans {
	includePrivateMaids = "includePrivateMaids",
	includeEvents = "includeEvents",
	includeBuildings = "includeBuildings",
	includeReminecsenses = "includeReminecsenses",
	includeCouples = "includeCouples",
}
export enum EReminescenseOptions {
	All = "all",
	Purchasable = "allPurchasable",
	Exclude = "exclude",
}
export enum ESlantOptions {
	NoSlant = "noSlant",
	SlantHigh = "slantHigh",
	SlantLow = "slantLow",
}
export enum EBeerOptions {
	NoPreference = "noPreference",
	Force = "forceBeer",
	Exclude = "excludeBeer",
}
export enum EAttackOptions {
	NoPreference = "noPreference",
	NoAttack = "noAttack",
	AllAttack = "allAttack",
}

//The key for slants that match state
export enum ESlantKeys {
	victoryPointSlant = "victoryPointSlant",
	cardDrawSlant = "cardDrawSlant",
	loveCostSlant = "loveCostSlant",
	loveGiveSlant = "loveGiveSlant",
	servingsSlant = "servingsSlant",
	employEffectsSlant = "employEffectsSlant",
}

//When card comes back from database, we type cast to this to ensure that the keys are spelled correctly
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

/**
 * A mapping between sets and the names to be displayed to the user
 */
export const setNameMapping: Record<ESet, string> = {
	[ESet.BaseSet]: "Base Set",
	[ESet.ExpandingTheHouse]: "Expanding the House",
	[ESet.Oktoberfest]: "Oktoberfest",
	[ESet.RomanticVacation]: "Romantic Vacation",
	[ESet.WinterRomance]: "Winter Romance",
};
/**
 * A mapping between slants and the names to be displayed to the user
 */
export const slantNameMapping: Record<ESlantOptions, string> = {
	[ESlantOptions.NoSlant]: "No preference",
	[ESlantOptions.SlantHigh]: "Slant high",
	[ESlantOptions.SlantLow]: "Slant low",
};

// Maps the ESet enum values to the corresponding database keys
export const setMapping: { [key in ESet]: Card[] } = {
	[ESet.BaseSet]: db.base_set as Card[],
	[ESet.ExpandingTheHouse]: db.expanding_the_house as Card[],
	[ESet.WinterRomance]: db.winter_romance as Card[],
	[ESet.Oktoberfest]: db.oktoberfest as Card[],
	[ESet.RomanticVacation]: db.romantic_vacation as Card[],
};

// Mapping of internal set values to display names
export const setDisplayNames: Record<string, string> = {
	base_set: "Base Set",
	expanding_the_house: "Expanding the House",
	romantic_vacation: "Romantic Vacation",
	oktoberfest: "Oktoberfest",
	winter_romance: "Winter Romance",
};
