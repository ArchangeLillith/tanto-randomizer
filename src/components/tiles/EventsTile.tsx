import { EBooleans } from "../../utils/types";
import Checkbox from "../building-blocks/Checkbox";
import TileBox from "../building-blocks/TileBox";
import Title from "../building-blocks/Title";

const EventsTile: React.FC<{ enabledClass: string }> = ({ enabledClass }) => {
	return (
		<TileBox enabledClass={enabledClass}>
					<Title title="Events" />
					<Checkbox
						id={EBooleans.includeEvents}
						parent="events"
						item="Include all cards that affect or require Event cards"
						tooltip="Select this option if using Tanto Cuore, Oktoberfest, and/or Winter Romance without Event cards NOTE: Winter Romance 'Drama' cards are treated as Event cards."
					/>
		</TileBox>
	);
};

export default EventsTile;
