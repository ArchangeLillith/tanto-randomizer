import RadioGroup from "../building-blocks/RadioGroup";
import TileBox from "../building-blocks/TileBox";
import Title from "../building-blocks/Title";

const optionsArray: string[] = [
	"Ensure at least one bar maid in results to allow beer cards to be utilized",
	"Exclude all cards that affect or require Beer cards",
];

const BeerTile = () => {
	return (
		<TileBox
			children={
				<>
					<Title title="Beer" />
					<RadioGroup
						parent="beer"
						optionsArray={optionsArray}
						toolTip="Select this option if using Oktoberfest without the beer mechanic (Beer cards and the Beer Fest building)"
					/>
				</>
			}
		/>
	);
};

export default BeerTile;
