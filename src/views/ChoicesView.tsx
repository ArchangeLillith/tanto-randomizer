
import BeerTile from "../components/tiles/BeerTile";
import BuildingsTile from "../components/tiles/BuildingsTile";
import CouplesTile from "../components/tiles/CouplesTile";
import EventsTile from "../components/tiles/EventsTile";
import PrivateMaidTile from "../components/tiles/PrivateMaidTile";
import ReminescensesTile from "../components/tiles/ReminescensesTile";
import SetTile from "../components/tiles/SetTile";
import SistersTile from "../components/tiles/SistersTile";

const ChoicesView: React.FC = () => {
	

	return (
		<div className="choices-view-container">
			<SetTile />
			<SistersTile />
			<PrivateMaidTile />
			<EventsTile />
			<BuildingsTile />
			<ReminescensesTile />
			<BeerTile />
			<CouplesTile />

		</div>
	);
};

export default ChoicesView;
