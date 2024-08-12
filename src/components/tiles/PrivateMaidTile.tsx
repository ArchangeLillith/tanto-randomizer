import Checkbox from "../building-blocks/Checkbox";
import TileBox from "../building-blocks/TileBox";
import Title from "../building-blocks/Title";

const PrivateMaidTile = () => {
	return (
		<TileBox
			children={
				<>
					<Title title="Private Maids" />
					<Checkbox
						parent="privateMaids"
						item="Exclude all cards that affect or require Private Maid cards"
						tooltip="Select this option if using Tanto Cuore and/or Expanding the House without Private Maids"
					/>
				</>
			}
		/>
	);
};

export default PrivateMaidTile;
