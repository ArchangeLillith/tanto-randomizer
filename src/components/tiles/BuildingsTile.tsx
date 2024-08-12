import Checkbox from "../building-blocks/Checkbox";
import TileBox from "../building-blocks/TileBox";
import Title from "../building-blocks/Title";

const BuildingsTile = () => {
	return (
		<TileBox
			children={
				<>
					<Title title="Buildings" />
					<Checkbox
						parent="buildings"
						item="Exclude all cards that affect or require Building cards"
						tooltip="Select this option if using Expanding the House, Oktoberfest, and/or Winter Romance without Building cards"
					/>
				</>
			}
		/>
	);
};

export default BuildingsTile;
