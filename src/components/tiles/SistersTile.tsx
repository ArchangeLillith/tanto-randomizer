import Dropdown from "../building-blocks/Dropdown";
import TileBox from "../building-blocks/TileBox";
import Title from "../building-blocks/Title";

const SistersTile = () => {
	return (
		<TileBox>
			<Title title="Keep the sisters together!" />
			<Dropdown
				label="If a sister is chosen, force include how many more sisters?"
			/>
		</TileBox>
	);
};

export default SistersTile;
