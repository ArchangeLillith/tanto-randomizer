import { EBooleans } from "../../utils/types";
import Checkbox from "../building-blocks/Checkbox";
import TileBox from "../building-blocks/TileBox";
import Title from "../building-blocks/Title";

const EventsTile = () => {
	return (
		<TileBox
			children={
				<>
					<Title title="Events" />
					<Checkbox
						id={EBooleans.includeEvents}
						parent="events"
						item="Exclude all cards that affect or require Event cards"
						tooltip="Select this option if using Tanto Cuore, Oktoberfest, and/or Winter Romance without Event cards NOTE: Winter Romance 'Drama' cards are treated as Event cards."
					/>
				</>
			}
		/>
	);
};

export default EventsTile;
