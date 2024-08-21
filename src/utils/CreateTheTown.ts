import { getRandomNumber } from ".";
import { Card, FilterState, EBeerOptions, EReminescenseOptions } from "./types";

const FINISHED_TOWN: Card[] = [];
const LOCKED_CARDS: Set<string> = new Set();

/**
 * Creates the 10 card town based on the filters selected and remembered in state
 * @param townMaterials - the array of cards that passed the filter function
 * @param fullSetArray - the array of cards that are ALL cards from the sets within the filter
 * @param filter - the global state object that controls the card added to the town
 * @returns finishedTown, the final ten cards
 */
export function createTheTown(
	townMaterials: Card[],
	fullSetArray: Card[],
	filter: FilterState
) {
	const beerMaid = getBeerMaid(townMaterials, fullSetArray, filter);
	const sisters = getSisters(townMaterials, fullSetArray, filter);

	while (FINISHED_TOWN.length < 10 && townMaterials.length > 0) {
		const index: number = Math.floor(Math.random() * townMaterials.length);
		const selectedCard: Card = townMaterials[index];
		//This filters the cardArray so no banned cards are accidentally selected, though none should pass through the filter function. It also looks for duplicates and throws and error if either of these situations were to happen
		if (
			!FINISHED_TOWN.some((card) => card.name === selectedCard.name) &&
			!filter.bannedCards.includes(selectedCard.name)
		) {
			FINISHED_TOWN.push(selectedCard);
			townMaterials = townMaterials.filter(
				(card) => card.name !== selectedCard.name
			);
		} else {
			console.error(
				`There was a duplicate or a banned card got through, ${selectedCard.name} was the culprit, figure it out X_X`
			);
		}
	}

	//Beer filter
	if (filter.beerOptions === EBeerOptions.Force) {
		const hasBeerMaid = FINISHED_TOWN.some((card) => card.beerMaid === true);
		if (!hasBeerMaid && beerMaid) addBeer(beerMaid);
	}

	//Sisters filter
	if (filter.sisterInclusion > 0) {
		if (
			FINISHED_TOWN.reduce(
				(count, card) => count + (card.crescentSister ? 1 : 0),
				0
			) !== 3
		) {
			addSisters(sisters, filter);
		}
	}
	if (filter.reminescenseOptions === EReminescenseOptions.Purchasable) {
		addRem(townMaterials, fullSetArray, filter);
	}

	//Maybe don't need this as I'm checking for banned cards above but this may be a good final check to have just in case a banned card was added in the filtering process, just pull it down a bit and return an error but let the card slide throug. Inform the from end something funky happened and a banned card was included for some reason (at this point, idk how that would be possible but we should at least acknowledge it to the user if in some unforseen way it does happen)
	if (filter.bannedCards.length > 0) {
		console.log(`FINISH`, FINISHED_TOWN);
		const withoutBanned = FINISHED_TOWN.filter(
			(card) => !filter.bannedCards.includes(card.name)
		);
		if (
			withoutBanned.length > 0 &&
			filter.reminescenseOptions === EReminescenseOptions.Purchasable
		) {
			console.error(
				"There are some banned card here, Reminecense options forced one to be included :("
			);
		} else if (withoutBanned.length > 0) {
			console.error(
				"There are some banned cards here, idk why, not reminecencses"
			);
		}
	}
	console.log(`FINISHED TOWN`, FINISHED_TOWN);
	return FINISHED_TOWN;
}

/**
 * Filters through the town material and grabs out a beer maid, and if none is found then searches through the fullSetArray, then returns it to be added to the final town.
 * @param townMaterials - the array of cards that passed the filter function
 * @param fullSetArray - the array of cards that are ALL cards from the sets within the filter
 * @param filter - the global state object that controls the card added to the town
 * @returns beerMaid, a card that satisfies the need for forcing beer from state
 */
function getBeerMaid(
	townMaterials: Card[],
	fullSetArray: Card[],
	filter: FilterState
) {
	let beerMaid = townMaterials.find(
		(card) => card.beerMaid === true && !filter.bannedCards.includes(card.name)
	);
	if (!beerMaid) {
		beerMaid = fullSetArray.find(
			(card) =>
				card.beerMaid === true && !filter.bannedCards.includes(card.name)
		);
	}
	return beerMaid;
}

/**
 * Filters through the town material and grabs out a however many sisters the filter calls for, and if none is found then searches through the fullSetArray, then returns the sister array to be used when creating the final town
 * @param townMaterials - the array of cards that passed the filter function
 * @param fullSetArray - the array of cards that are ALL cards from the sets within the filter
 * @param filter - the global state object that controls the card added to the town
 * @returns sisters, an array that consists of all crescent sisters
 */
function getSisters(
	townMaterials: Card[],
	fullSetArray: Card[],
	filter: FilterState
) {
	let sisters = townMaterials.filter(
		(card) =>
			card.crescentSister === true && !filter.bannedCards.includes(card.name)
	);
	if (sisters.length === 0) {
		sisters = fullSetArray.filter(
			(card) =>
				card.crescentSister === true && !filter.bannedCards.includes(card.name)
		);
	}
	console.log(`Sisters`, sisters);
	return sisters;
}

/**
 * Takes in a beer maid and adds her to the town as well as the locked cards array
 * @param beerMaid - a card that satisfies the forceBeer choice from state
 */
function addBeer(beerMaid: Card) {
	findAndRemove("beer");
	FINISHED_TOWN.push(beerMaid);
	LOCKED_CARDS.add(beerMaid.name);
}

/**
 * Calculates how many sisters are in the town already and adds more if that's called for
 * @param sisters - the sisters array, comprised of crescent sisters
 * @param filter - the global state that governs what cards are added to the town
 */
function addSisters(sisters: Card[], filter: FilterState) {
	const howManySisters: number = FINISHED_TOWN.filter(
		(card) => card.crescentSister === true
	).length;
	if (filter.sisterInclusion + 1 > howManySisters) {
		for (let i = 0; i < filter.sisterInclusion + 1; i++) {
			const randomSister = sisters.splice(
				getRandomNumber(sisters.length),
				1
			)[0];
			if (!FINISHED_TOWN.includes(randomSister)) {
				findAndRemove("sister");
				FINISHED_TOWN.push(randomSister);
				LOCKED_CARDS.add(randomSister.name);
			}
		}
	}
}

/**
 * The parent function that calls the different sub functions handling the mutation of the finishedTown array in accordance with the filter state
 * @param townMaterials - the array of cards that passed the filter function
 * @param fullSetArray - the array of cards that are ALL cards from the sets within the filter
 * @param filter - the global state object that controls the card added to the town
 */
function addRem(
	townMaterials: Card[],
	fullSetArray: Card[],
	filter: FilterState
) {
	specificPurchasePrices(townMaterials, fullSetArray, filter);
	purchasePriceFivePlus(townMaterials, fullSetArray, filter);
}

/**
 * Verifies that all the different, specific, purchase prices needed are in the town, and if not, grabs cards from the town materials to fill the town. If there are no town materials that match the purchase price needed, the function dips into the full set array and ensures the filter is met
 * @param townMaterials - the array of cards that passed the filter function
 * @param fullSetArray - the array of cards that are ALL cards from the sets within the filter
 * @param filter - the global state object that controls the card added to the town
 */
function specificPurchasePrices(
	townMaterials: Card[],
	fullSetArray: Card[],
	filter: FilterState
) {
	//NOTE: every set has a card.purchasePrice === 7
	const purchasePricesNeeded: number[] = [2, 3, 4, 5, 7];
	for (const purchasePrice of purchasePricesNeeded) {
		const cardWithPurchasePrice = FINISHED_TOWN.find(
			(card) => card.purchasePrice === purchasePrice
		);

		if (cardWithPurchasePrice) {
			LOCKED_CARDS.add(cardWithPurchasePrice.name);
		} else {
			findAndRemove("Reminesncencessses");
			let cardsOfPurchasePrice = townMaterials.filter(
				(card) =>
					card.purchasePrice === purchasePrice &&
					!filter.bannedCards.includes(card.name) &&
					!FINISHED_TOWN.some((townCard) => townCard.name !== card.name)
			);
			if (cardsOfPurchasePrice.length === 0) {
				cardsOfPurchasePrice = fullSetArray.filter(
					(card) =>
						card.purchasePrice === purchasePrice &&
						!filter.bannedCards.includes(card.name) &&
						card.chiefMaid === false
				);
			}
			if (cardsOfPurchasePrice.length === 0) {
				cardsOfPurchasePrice = fullSetArray.filter(
					(card) =>
						card.purchasePrice === purchasePrice && card.chiefMaid === false
				);
			}
			if (cardsOfPurchasePrice.length > 0) {
				const selectedCard =
					cardsOfPurchasePrice[getRandomNumber(cardsOfPurchasePrice.length)];
				FINISHED_TOWN.push(selectedCard);
				LOCKED_CARDS.add(selectedCard.name);
				console.log(`Card added:`, selectedCard);
			} else {
				console.warn(
					`No available cards with purchase price ${purchasePrice} were found in townMaterials or fullSetArray.`
				);
			}
		}
	}
}

/**
 * Filters through the town and ensures there are at least five different general maids (NOT maid chiefs) that are above 5 cost, as that's the harshest requirement
 * @param townMaterials - the array of cards that passed the filter function
 * @param fullSetArray - the array of cards that are ALL cards from the sets within the filter
 * @param filter - the global state object that controls the card added to the town
 */
function purchasePriceFivePlus(
	townMaterials: Card[],
	fullSetArray: Card[],
	filter: FilterState
) {
	//The array of cards above five in the town already
	const aboveFiveTown = FINISHED_TOWN.filter((card) => card.purchasePrice >= 5);
	//The cards that are locked that are above 5
	let addNeeded = 4 - aboveFiveTown.length;
	if (addNeeded <= 0) {
		const notLockedAboveFive = aboveFiveTown.filter(
			(card) => !LOCKED_CARDS.has(card.name)
		);
		for (let i = 0; i < Math.min(addNeeded, notLockedAboveFive.length); i++) {
			LOCKED_CARDS.add(notLockedAboveFive[i].name);
		}
		return;
	}

	const townAtFive = townMaterials.filter(
		(card) =>
			card.purchasePrice === 5 &&
			!filter.bannedCards.includes(card.name) &&
			!FINISHED_TOWN.some((townCard) => townCard.name === card.name)
	);

	const townAboveFive = townMaterials.filter(
		(card) =>
			card.purchasePrice > 5 &&
			!filter.bannedCards.includes(card.name) &&
			!FINISHED_TOWN.some((townCard) => townCard.name === card.name)
	);

	if (townAtFive.length > 0) {
		const count = Math.min(addNeeded, townAtFive.length);
		for (let i = 0; i < count; i++) {
			findAndRemove("remeadfkasdfdhkfaf");
			FINISHED_TOWN.push(townAboveFive[i]);
			LOCKED_CARDS.add(townAtFive[i].name);
		}
		addNeeded -= count;
	}
	if (addNeeded > 0 && townAboveFive.length > 0) {
		const count = Math.min(addNeeded, townAboveFive.length);
		for (let i = 0; i < count; i++) {
			findAndRemove("Renadkfasdlkf");
			FINISHED_TOWN.push(townAboveFive[i]);
			LOCKED_CARDS.add(townAboveFive[i].name);
		}
		addNeeded = -count;
	}
	if (addNeeded > 0) {
		const setAboveFive = fullSetArray.filter(
			(card) =>
				card.purchasePrice >= 5 &&
				!card.chiefMaid &&
				!FINISHED_TOWN.some((townCard) => townCard.name === card.name)
		);

		for (let i = 0; i < Math.min(addNeeded, setAboveFive.length); i++) {
			findAndRemove("Rsalsdflkasdfdsf");
			FINISHED_TOWN.push(setAboveFive[i]);
			LOCKED_CARDS.add(setAboveFive[i].name);
		}
	}
}

/**
 * Finds the first index that isn't a locked card and splices it in preperation for another card to be added by the function that called it
 * @param filterName - The filter that this is being called in to be passed into an error for better logging
 */
function findAndRemove(filterName: string) {
	let removableIndex = -1;
	for (let i = 0; i < FINISHED_TOWN.length; i++) {
		if (!LOCKED_CARDS.has(FINISHED_TOWN[i].name)) {
			removableIndex = i;
			break;
		}
	}
	if (removableIndex !== -1) {
		FINISHED_TOWN.splice(removableIndex, 1);
	} else {
		console.error(
			`There are no cards in the town that are removable, failed on the ${filterName} filter`
		);
	}
}
