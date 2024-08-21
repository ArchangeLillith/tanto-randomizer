import { Card, EBeerOptions, ESlantOptions, FilterState } from "./types";

export const filterCards = (cardArray: Card[], filter: FilterState): Card[] => {
	const cardsToCut: Card[] = [];
	cardArray.forEach((card) => {
		const cardToCut = filterByCardProperty(card, filter);
		if (cardToCut) cardsToCut.push(cardToCut);
	});
	cardsToCut.forEach((cardToCut) => {
		cardArray = cardArray.filter((card) => card.name !== cardToCut.name);
	});
	return cardArray;
};
//Refactor this is the chambermaid chief selection, perhaps this should move to CreatTheTown
// export function chooseChambermaidChiefs(cardArray: Card[]) {
// 	const maidChiefs: Card[] = [];
// 	for (let i = 0; i < cardArray.length; i++) {
// 		if (cardArray[i].chiefMaid === true) {
// 			maidChiefs.push(cardArray[i]);
// 		}

// 		if (maidChiefs.length === 2) {
// 			return maidChiefs;
// 		}
// 	}

// 	//do this with a for loop?? or a do while
// 	const randomizedChiefs: Card[] = [];
// 	const firstMaidIndex = Math.floor(Math.random() * maidChiefs.length);
// 	randomizedChiefs.push(maidChiefs[firstMaidIndex]);
// 	maidChiefs.splice(firstMaidIndex, 1);

// 	const secondMaidIndex = Math.floor(Math.random() * maidChiefs.length);
// 	randomizedChiefs.push(maidChiefs[secondMaidIndex]);
// 	console.log(`Random cheifs`, randomizedChiefs);
// 	return randomizedChiefs;
// }

function filterByCardProperty(
	card: Card,
	filterObject: FilterState
): Card | undefined {
	//NOTE ON STRUCTURE: While I could have easilly combined the slant and booleans in this logic, I decided not to for ease of reading and debugging. It doesn't mean much that they're in seperate places like this other than ease of readability at the cost of a handful more lines of code

	if (card.chiefMaid) return card;

	const {
		bannedCards,
		booleans,
		beerOptions,
		victoryPointSlant,
		cardDrawSlant,
		loveCostSlant,
		loveGiveSlant,
		servingsSlant,
	} = filterObject;

	if (bannedCards.includes(card.name)) return card;

	//Filters based on booleans
	const booleanFilters = [
		{ condition: card.eventRequired && !booleans.includeEvents, card },
		{ condition: card.couplesRequired && !booleans.includeCouples, card },
		{ condition: card.beerMaid && beerOptions === EBeerOptions.Exclude, card },
	];

	//Handle the boolean filters
	for (const { condition, card } of booleanFilters) {
		if (condition) return card;
	}

	//Filters based on slants
	const slantFilters = [
		{
			condition:
				victoryPointSlant === ESlantOptions.SlantHigh &&
				card.victoryPoints <= 2,
			card,
		},
		{
			condition:
				victoryPointSlant === ESlantOptions.SlantLow && card.victoryPoints > 2,
			card,
		},
		{
			condition:
				cardDrawSlant === ESlantOptions.SlantHigh && card.cardDraw <= 1,
			card,
		},
		{
			condition: cardDrawSlant === ESlantOptions.SlantLow && card.cardDraw > 2,
			card,
		},
		{
			condition:
				loveCostSlant === ESlantOptions.SlantHigh && card.purchasePrice <= 3,
			card,
		},
		{
			condition:
				loveCostSlant === ESlantOptions.SlantLow && card.purchasePrice > 3,
			card,
		},
		{
			condition: loveGiveSlant === ESlantOptions.SlantHigh && card.love <= 2,
			card,
		},
		{
			condition: loveGiveSlant === ESlantOptions.SlantLow && card.love > 2,
			card,
		},
		{
			condition:
				servingsSlant === ESlantOptions.SlantHigh && card.servings <= 2,
			card,
		},
		{
			condition: servingsSlant === ESlantOptions.SlantLow && card.servings > 2,
			card,
		},
	];

	//Handling the slants
	for (const { condition, card } of slantFilters) {
		if (condition) return card;
	}

	//This means every check was passed and the card should stay
	return undefined;
}
