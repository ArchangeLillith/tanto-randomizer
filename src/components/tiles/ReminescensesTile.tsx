import RadioGroup from "../building-blocks/RadioGroup";
import TileBox from "../building-blocks/TileBox";
import Title from "../building-blocks/Title";

const optionsArray: string[] = [
	"No preference on Reminiscence cards",
	"Ensure a cost spread that permits all Reminiscence cards to be played",
	"Exclude all cards that affect or require Reminiscence cards",
];
const ReminescensesTile = () => {
	return (
		<TileBox
			children={
				<>
					<Title title="Reminescenses" />
					<RadioGroup parent="reminescenses" optionsArray={optionsArray} />
				</>
			}
		/>
	);
};

export default ReminescensesTile;
