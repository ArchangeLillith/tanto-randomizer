import Dropdown from "../building-blocks/Dropdown";
import TileBox from "../building-blocks/TileBox";
import Title from "../building-blocks/Title";

const SistersTile = () => {
	return (
		<TileBox>
			<Title title="Keep the sisters together!" />
			<Dropdown
				label="If a sister is chosen, force include how many more sisters?"
				// Add back when promo is added and refactor the sisters functionality when filtersing to worry about the names as that could cause issues
				// toolTip="NOTE: Includes Compy sisters if 'Promo' set is chosen"
			/>
		</TileBox>
	);
};

export default SistersTile;
