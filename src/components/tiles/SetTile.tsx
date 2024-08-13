import { ESet } from "../../utils/types";
import Checkbox from "../building-blocks/Checkbox";
import TileBox from "../building-blocks/TileBox";
import Title from "../building-blocks/Title";

const SetTile = () => {
	return (
		<TileBox
			children={
				<>
					<Title title="Sets" />
					<Checkbox parent="sets" item="Base Set" id={ESet.BaseSet} />
					<Checkbox
						parent="sets"
						item="Expanding The House"
						id={ESet.ExpandingTheHouse}
					/>
					<Checkbox
						parent="sets"
						item="Romantic Vacation"
						id={ESet.RomanticVacation}
					/>
					<Checkbox parent="sets" item="Oktoberfest" id={ESet.Oktoberfest} />
					<Checkbox
						parent="sets"
						item="Winter Romance"
						id={ESet.WinterRomance}
					/>
				</>
			}
		/>
	);
};

export default SetTile;
