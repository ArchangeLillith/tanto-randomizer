import { EReminescenseOptions } from "../../utils/types";
import RadioGroup from "../building-blocks/RadioGroup";
import TileBox from "../building-blocks/TileBox";
import Title from "../building-blocks/Title";

const options = [
	{
		value: EReminescenseOptions.All,
		label: "Include all reminescense cards",
	},
	{
		value: EReminescenseOptions.Purchasable,
		label:
			"Ensure a cost spread that permits all Reminiscence cards to be purchased",
	},
	{
		value: EReminescenseOptions.Exclude,
		label: "Exclude all cards that affect or require Reminiscence cards",
	},
];

const ReminescensesTile = () => {
	return (
		<TileBox>
			<Title title="Reminiscenses" />
			<RadioGroup
				options={options}
				stateKey={"reminescenseOptions"}
				toolTip="NOTE: Reminiscenses purchasable is one of the hardest options to satisfy, and will take over the town"
			/>
		</TileBox>
	);
};

export default ReminescensesTile;
