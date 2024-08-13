import { createContext, useReducer } from "react";
import {
	Action,
	FilterState,
	StateProviderProps,
	EReminescenses,
	EBeerOptions,
} from "./types";

const initialState: FilterState = {
	setList: [],
	bannedCards: [],
	sisterInclusion: 0,
	attackCards: "no preference",
	beerOptions: EBeerOptions.NoPreference,
	reminescenseOptions: EReminescenses.All,
	booleans: {
		includePrivateMaids: true,
		includeEvents: true,
		includeBuildings: true,
		includeCouples: true,
		highVictoryPoints: false,
		lowVictoryPoints: false,
		highLoveCost: false,
		lowLoveCost: false,
		highLoveGive: false,
		lowLoveGive: false,
		highServings: false,
		lowServings: false,
		highDraw: false,
		lowDraw: false,
		highEmployEffects: false,
		lowEmployEffects: false,
	},
};

function reducer(state: FilterState, action: Action): FilterState {
	switch (action.type) {
		case "TOGGLE_BOOLEAN": {
			const booleanKey = action.payload;
			return {
				...state,
				booleans: {
					...state.booleans,
					[booleanKey]: !state.booleans[booleanKey], // Toggle the specific boolean value
				},
			};
		}
		case "HANDLE_SET_LIST": {
			const set = action.payload;
			return {
				...state,
				setList: state.setList.includes(set)
					? state.setList.filter((item) => item !== set)
					: [...state.setList, set],
			};
		}
		case "SET_SELECTED_OPTION":
			return {
				...state,
				[action.payload.key]: action.payload.value,
			};
		case "SET_SISTER_INCLUSION":
			return {
				...state,
				sisterInclusion: action.payload,
			};
		default:
			return state;
	}
}

export const StateContext = createContext<{
	state: FilterState;
	dispatch: React.Dispatch<Action>;
}>({
	state: initialState,
	dispatch: () => undefined,
});

export const StateProvider: React.FC<StateProviderProps> = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<StateContext.Provider value={{ state, dispatch }}>
			{children}
		</StateContext.Provider>
	);
};
