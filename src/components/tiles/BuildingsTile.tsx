import { EBooleans } from "../../utils/types";
import Checkbox from "../building-blocks/Checkbox";
import TileBox from "../building-blocks/TileBox";
import Title from "../building-blocks/Title";

const BuildingsTile: React.FC<{ enabledClass: string }> = ({
	enabledClass,
}) => {
	return (
		<TileBox enabledClass={enabledClass}>
			<Title title="Buildings" />
			<Checkbox
				parent="buildings"
				id={EBooleans.includeBuildings}
				item="Include all cards that affect or require Building cards"
				tooltip="Select this option if using Expanding the House, Oktoberfest, and/or Winter Romance without Building cards"
			/>
		</TileBox>
	);
};

export default BuildingsTile;
