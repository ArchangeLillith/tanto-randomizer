import { ESet } from "../../utils/types";
import Checkbox from "../building-blocks/Checkbox";
import TileBox from "../building-blocks/TileBox";
import Title from "../building-blocks/Title";

const sets = [
	{ item: "Base Set", id: ESet.BaseSet },
	{ item: "Expanding The House", id: ESet.ExpandingTheHouse },
	{ item: "Romantic Vacation", id: ESet.RomanticVacation },
	{ item: "Oktoberfest", id: ESet.Oktoberfest },
	{ item: "Winter Romance", id: ESet.WinterRomance },
];

const SetTile = () => {
	return (
		// Hard code this enabled as it shouldn't change but we still want it to use the tile component
		<TileBox enabledClass="tileEnabled">
			<Title title="Sets" />
			{sets.map(({ item, id }) => (
				<Checkbox parent="sets" item={item} id={id} />
			))}
		</TileBox>
	);
};

export default SetTile;
