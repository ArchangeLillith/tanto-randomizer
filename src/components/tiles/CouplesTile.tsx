import Checkbox from "../building-blocks/Checkbox";
import TileBox from "../building-blocks/TileBox";
import Title from "../building-blocks/Title";

const CouplesTile = () => {
	return (
		<TileBox
			children={
				<>
					<Title title="Couples" />
					<Checkbox
						parent="couples"
						item="Exclude all cards that affect or require Building cards"
						tooltip="(Friends, Trial, Drama cards, Meetup Spot cards, Chapel, and Social Bonus)"
					/>
				</>
			}
		/>
	);
};

export default CouplesTile;
