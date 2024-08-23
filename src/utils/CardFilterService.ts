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

	const booleanFilters = [
		{ condition: card.eventRequired && !booleans.includeEvents, card },
		{ condition: card.couplesRequired && !booleans.includeCouples, card },
		{ condition: card.beerMaid && beerOptions === EBeerOptions.Exclude, card },
	];

	for (const { condition, card } of booleanFilters) {
		if (condition) return card;
	}

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
	
	for (const { condition, card } of slantFilters) {
		if (condition) return card;
	}
	
	return undefined;
}
