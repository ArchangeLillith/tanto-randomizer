import {
	Card,
	EBeerOptions,
	ESlantOptions,
	FilterState,
	setDisplayNames,
} from "./types";

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

export function createTheTown(cardArray: Card[], filter: FilterState) {
	const beerMaid = cardArray.find((card) => card.beerMaid === true);
	const sisters = cardArray.filter((card) => card.crescentSister === true);
	let finishedTown: Card[] = [];
	while (finishedTown.length < 10 && cardArray.length > 0) {
		const index: number = Math.floor(Math.random() * cardArray.length);
		const selectedCard: Card = cardArray[index];
		//This is an overkill check to make sure that we don't have a duplicate just in case something super funky happens. It also logs into the console with an error so I can see if there's something that needs debugging
		if (!finishedTown.some((card) => card.name === selectedCard.name)) {
			finishedTown.push(cardArray.splice(index, 1)[0]);
		} else {
			console.error("There was a duplicate, got skipped figure it out X_X");
		}
	}
	if (filter.beerOptions === EBeerOptions.Force) {
		//Is there one card with beerMaid === true?
		const hasBeerMaid = finishedTown.some((card) => card.beerMaid === true);
		//If not, we need to splice a random card and add a beer maid
		if (!hasBeerMaid && beerMaid) {
			//Get rid of a random one
			finishedTown.splice(getRandomNumber(finishedTown.length), 1);
			finishedTown.push(beerMaid);
		}
	}
	if (filter.sisterInclusion > 0) {
		//Is there one card with beerMaid === true?
		const howManySisters: number = finishedTown.filter(
			(card) => card.crescentSister === true
		).length;
		//If not, we need to splice a random card and add a beer maid
		if (filter.sisterInclusion + 1 > howManySisters) {
			for (let i = 0; i < filter.sisterInclusion + 1; i++) {
				const randomSister = sisters.splice(
					getRandomNumber(sisters.length),
					1
				)[0];
				if (
					randomSister &&
					!finishedTown.some((card) => card.name === randomSister.name)
				) {
					finishedTown.splice(getRandomNumber(finishedTown.length), 1);
					finishedTown.push(randomSister);
				}
			}
		}
	}
	if (filter.bannedCards.length > 0) {
		const withoutBanned = finishedTown.filter(
			(card) =>
				!filter.bannedCards.includes(
					`${setDisplayNames[card.set]} - ${card.name}, ${card.cardTitle}`
				)
		);

		while (withoutBanned.length < 10) {
			const randomIndex = getRandomNumber(cardArray.length);
			const randomCard = cardArray.splice(randomIndex, 1)[0];
			if (!filter.bannedCards.includes(randomCard.name)) {
				withoutBanned.push(randomCard);
			}
		}
		finishedTown = withoutBanned;
	}
	return finishedTown;
}

export const filterCards = (cardArray: Card[], filter: FilterState): Card[] => {
	const cardsToCut: Card[] = [];

	//Grab beer and sister cards from the main array
	const beerMaids = cardArray.filter((card) => card.beerMaid === true);
	const sisters = cardArray.filter((card) => card.crescentSister === true);

	//filter based on state
	cardArray.forEach((card) => {
		const cardToCut = filterByCardProperty(card, filter);
		if (cardToCut) cardsToCut.push(cardToCut);
	});

	//Remove the cards that don't match the filters
	cardsToCut.forEach((cardToCut) => {
		cardArray = cardArray.filter((card) => card.name !== cardToCut.name);
	});

	//Ensure there's beer if the filter demands it
	if (
		filter.beerOptions === EBeerOptions.Force &&
		!cardArray.some((card) => card.beerMaid)
	) {
		const randomBeerMaid = beerMaids[getRandomNumber(beerMaids.length)];
		if (randomBeerMaid) cardArray.push(randomBeerMaid);
	}

	//If there's sister inclusion
	if (filter.sisterInclusion > 0) {
		cardArray = cardArray.filter((card) => !card.crescentSister);
		for (let i = 0; i < filter.sisterInclusion + 1; i++) {
			const randomSister = sisters.splice(
				getRandomNumber(sisters.length),
				1
			)[0];
			if (randomSister) cardArray.push(randomSister);
		}
	}
	return cardArray;
};

function filterByCardProperty(
	card: Card,
	filterObject: FilterState
): Card | undefined {
	//NOTE ON STRUCTURE: While I could have easilly combined the slant and booleans in this logic, I decided not to for ease of reading and debugging. It doesn't mean much that they're in seperate places like this other than ease of readability at the cost of a handful more lines of code

	//Exclude chief maids immediatley
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

	//This means every check was passed
	return undefined;
}

function getRandomNumber(max: number): number {
	return Math.floor(Math.random() * max);
}
