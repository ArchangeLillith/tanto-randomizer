import { EReminescenseOptions } from "../../utils/types";
import RadioGroup from "../building-blocks/RadioGroup";
import TileBox from "../building-blocks/TileBox";
import Title from "../building-blocks/Title";

const ReminescensesTile = () => {
	const options: { value: EReminescenseOptions; label: string }[] = [
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
	return (
		<TileBox
			children={
				<>
					<Title title="Reminiscenses" />
					<RadioGroup
						options={options}
						stateKey={"reminescenseOptions"} //Key from state that cooresponds to this option
					/>
				</>
			}
		/>
	);
};

export default ReminescensesTile;
