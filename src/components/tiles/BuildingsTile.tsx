import { EBooleans } from "../../utils/types";
import Checkbox from "../building-blocks/Checkbox";
import TileBox from "../building-blocks/TileBox";
import Title from "../building-blocks/Title";

const BuildingsTile = () => {
	return (
		<TileBox>
			<Title title="Buildings" />
			<Checkbox
				parent="buildings"
				id={EBooleans.includeBuildings}
				item="Exclude all cards that affect or require Building cards"
				tooltip="Select this option if using Expanding the House, Oktoberfest, and/or Winter Romance without Building cards"
			/>
		</TileBox>
	);
};

export default BuildingsTile;
