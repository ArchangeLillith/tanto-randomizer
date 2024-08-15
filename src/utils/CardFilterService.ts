import { Card, EBeerOptions, FilterState } from "./types";

export function chooseChambermaidChiefs(cardArray: Card[]) {
	const maidChiefs: Card[] = [];
	for (let i = 0; i < cardArray.length; i++) {
		if (cardArray[i].chiefMaid === true) {
			maidChiefs.push(cardArray[i]);
		}

		if (maidChiefs.length === 2) {
			return maidChiefs;
		}
	}

	//do this with a for loop?? or a do while
	const randomizedChiefs: Card[] = [];
	const firstMaidIndex = Math.floor(Math.random() * maidChiefs.length);
	randomizedChiefs.push(maidChiefs[firstMaidIndex]);
	maidChiefs.splice(firstMaidIndex, 1);

	const secondMaidIndex = Math.floor(Math.random() * maidChiefs.length);
	randomizedChiefs.push(maidChiefs[secondMaidIndex]);
	console.log(`Random cheifs`, randomizedChiefs);
	return randomizedChiefs;
}

export function createTheTown(cardArray: Card[]) {
	console.log(`Card array passed into createTheTown:`, cardArray);
	const finishedTown: Card[] = [];
	while (finishedTown.length < 10) {
		const index = Math.floor(Math.random() * cardArray.length);
		finishedTown.push(cardArray[index]);
		cardArray.splice(index, 1);
	}
	return finishedTown;
}

export const filterCards = (cardArray: Card[], filter: FilterState): Card[] => {
	const fullArray: Card[] = cardArray;
	fullArray.forEach((card) => console.log(card.beerMaid));
	console.log(`FYLL array`, fullArray);
	const beerMaid = fullArray.find((card) => card.beerMaid === true);
	console.log(`BEER`, beerMaid);

	const cardsToCut: Card[] = [];
	//Passes in the card to the filter method and expects a card or undefined as a return. If a card is returned, it gets added to the cards to cut array and then removed subsequently
	for (let i = 0; i < cardArray.length; i++) {
		const cardToCut = filterByCardProperty(cardArray[i], filter);
		if (cardToCut) cardsToCut.push(cardToCut);
	}
	for (let i = 0; i < cardsToCut.length; i++) {
		const deleteThisCardName = cardsToCut[i].name;
		cardArray = cardArray.filter((card) => card.name !== deleteThisCardName);
	}
	//Here we handle the beermaid force after the other filters have been passed through because this is a stricter filter. If this is selected, it overrides the slants below.
	if (filter.beerOptions === EBeerOptions.Force) {
		//Is there one card with beerMaid === true?
		const hasBeerMaid = cardArray.some((card) => card.beerMaid === true);
		console.log(`HAS BEER?`, hasBeerMaid);
		//If not, we need to splice a random card and add a beer maid
		if (!hasBeerMaid) {
			//Get rid of a random one
			cardArray.splice(getRandomNumber(), 1);
			//Add a beer maid
			if (beerMaid) cardArray.push(beerMaid);
		}
	}
	// console.log(`Card array when filtered:`, cardArray);
	console.log(`Length of cardArray after:`, cardArray.length);
	return cardArray;
};

export function filterByCardProperty(
	card: Card,
	filterObject: FilterState
): Card | undefined {
	//kick out the chief maids
	if (card.chiefMaid === true) {
		return card;
	}
	//Banned cards will go here and return if filter.bannedCards.includes(card.name)

	//event filter
	if (
		card.eventRequired === true &&
		filterObject.booleans.includeEvents === false
	) {
		return card;
	}
	if (
		card.couplesRequired === true &&
		filterObject.booleans.includeCouples === false
	) {
		return card;
	}
	//Beer filter
	//If beer is off and the maid requires beer
	if (
		card.beerMaid === true &&
		filterObject.beerOptions === EBeerOptions.Exclude
	) {
		return card;
	}
	//Slant options start:
	if (
		card.victoryPoints <= 2 &&
		filterObject.booleans.highVictoryPoints === true
	) {
		return card;
	}
	if (
		card.victoryPoints > 2 &&
		filterObject.booleans.lowVictoryPoints === true
	) {
		return card;
	}
	if (card.purchasePrice <= 2 && filterObject.booleans.highLoveCost === true) {
		return card;
	}
	if (card.purchasePrice > 2 && filterObject.booleans.lowLoveCost === true) {
		return card;
	}
	if (card.love <= 2 && filterObject.booleans.highLoveGive === true) {
		return card;
	}
	if (card.love > 2 && filterObject.booleans.lowLoveGive === true) {
		return card;
	}
	if (card.servings < 2 && filterObject.booleans.highServings === true) {
		return card;
	}
	if (card.servings >= 2 && filterObject.booleans.lowServings === true) {
		return card;
	}
	if (card.cardDraw <= 2 && filterObject.booleans.highDraw === true) {
		return card;
	}
	if (card.cardDraw > 2 && filterObject.booleans.lowDraw === true) {
		return card;
	}
	return undefined;
}

function getRandomNumber(): number {
	return Math.floor(Math.random() * 11);
}
