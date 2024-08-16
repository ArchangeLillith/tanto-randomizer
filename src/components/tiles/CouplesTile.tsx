import { EBooleans } from "../../utils/types";
import Checkbox from "../building-blocks/Checkbox";
import TileBox from "../building-blocks/TileBox";
import Title from "../building-blocks/Title";

const CouplesTile: React.FC<{ enabledClass: string }> = ({ enabledClass }) => {
	return (
		<TileBox enabledClass={enabledClass}>
			<Title title="Couples" />
			<Checkbox
				parent="couples"
				id={EBooleans.includeCouples}
				item="Include all cards that affect or require Couple cards"
				tooltip="(Friends, Trial, Drama cards, Meetup Spot cards, Chapel, and Social Bonus)"
			/>
		</TileBox>
	);
};

export default CouplesTile;
