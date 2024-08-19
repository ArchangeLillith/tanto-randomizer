import { EBooleans } from "../../utils/types";
import Checkbox from "../building-blocks/Checkbox";
import TileBox from "../building-blocks/TileBox";
import Title from "../building-blocks/Title";

const PrivateMaidTile = () => {
	return (
		<TileBox>
			<Title title="Private Maids" />
			<Checkbox
				id={EBooleans.includePrivateMaids}
				parent="privateMaids"
				item="Exclude all cards that affect or require Private Maid cards"
				tooltip="Select this option if using Tanto Cuore and/or Expanding the House without Private Maids"
			/>
		</TileBox>
	);
};

export default PrivateMaidTile;
