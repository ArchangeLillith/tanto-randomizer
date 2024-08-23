import { useContext, useEffect, useRef } from "react";
import TileBox from "../building-blocks/TileBox";
import Title from "../building-blocks/Title";
import { Card, ESet, setDisplayNames, setMapping } from "../../utils/types";
import { StateContext } from "../../utils/stateHandler";

const BannedMaidsTile = () => {
	const { state, dispatch } = useContext(StateContext);
	const allMaids = useRef<Card[]>([]);
	const previousSelection = useRef<string[]>([]);
	useEffect(() => {
		allMaids.current = state.setList.reduce(
			(accumulator: Card[], setName: ESet) => {
				return accumulator.concat(setMapping[setName] || []);
			},
			[]
		);
	}, [state.setList]);

	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedMaids = Array.from(
			event.target.selectedOptions,
			(option) => option.value
		);
		const newlySelected = selectedMaids.filter(
			(maid) => !previousSelection.current.includes(maid)
		);
		const newlyDeselected = previousSelection.current.filter(
			(maid) => !selectedMaids.includes(maid)
		);

		previousSelection.current = selectedMaids;

		newlyDeselected.forEach((maid) => {
			dispatch({
				type: "BAN_MAIDS",
				payload: maid,
			});
		});

		newlySelected.forEach((maid) => {
			dispatch({
				type: "BAN_MAIDS",
				payload: maid,
			});
		});
	};
	return (
		<>
			{allMaids.current.length === 0 ? (
				<></>
			) : (
				<TileBox>
					<Title title="Banned Maids" />
					<div className="banned-maids-tile">
						<p>Would you like to ban any of the maids?</p>
						<select multiple={true} onChange={handleChange}>
							{allMaids.current.map((card: Card) => (
								<option id={card.name} value={card.name} key={card.name}>
									{setDisplayNames[card.set]} - {card.name}, {card.cardTitle}
								</option>
							))}
						</select>
					</div>
				</TileBox>
			)}
		</>
	);
};

export default BannedMaidsTile;
