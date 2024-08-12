import Checkbox from "../building-blocks/Checkbox";
import TileBox from "../building-blocks/TileBox";
import Title from "../building-blocks/Title";

const SetTile = () => {
	return (
		<TileBox
			children={
				<>
					<Title title="Sets" />
					<Checkbox parent="sets" item="Base Set" />
					<Checkbox parent="sets" item="Expanding The House" />
					<Checkbox parent="sets" item="Romantic Vacation" />
					<Checkbox parent="sets" item="Oktoberfest" />
					<Checkbox parent="sets" item="Winter Romance" />
				</>
			}
		/>
	);
};

export default SetTile;
