import Dropdown from "../building-blocks/Dropdown";
import TileBox from "../building-blocks/TileBox";
import Title from "../building-blocks/Title";

const SistersTile = () => {
	return (
		<TileBox
			children={
				<>
					<Title title="Keep the sisters together!" />
					<Dropdown
						label="If a sister is chosen, force include how many more sisters?"
						toolTip="NOTE: Includes Compy sisters if 'Promo' set is chosen"
					/>
				</>
			}
		/>
	);
};

export default SistersTile;
