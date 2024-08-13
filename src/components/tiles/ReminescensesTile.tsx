import { EReminescenses } from "../../utils/types";
import RadioGroup from "../building-blocks/RadioGroup";
import TileBox from "../building-blocks/TileBox";
import Title from "../building-blocks/Title";

const ReminescensesTile = () => {
	const options = [
		{
			value: EReminescenses.All,
			label: "Include all reminescense cards",
		},
		{
			value: EReminescenses.Purchasable,
			label:
				"Ensure a cost spread that permits all Reminiscence cards to be purchased",
		},
		{
			value: EReminescenses.Exclude,
			label: "Exclude all cards that affect or require Reminiscence cards",
		},
	];
	return (
		<TileBox
			children={
				<>
					<Title title="Reminiscenses" />
					<RadioGroup
						options={options}
						stateKey={"reminescenseOptions"} // Key from the `booleans` object as a string
						toolTip="Include reminescenses?"
					/>
				</>
			}
		/>
	);
};

export default ReminescensesTile;
