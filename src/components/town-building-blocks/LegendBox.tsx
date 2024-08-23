import { useContext } from "react";
import { StateContext } from "../../utils/stateHandler";
import svgIcons from "../../utils/svgIcons";

const LegendBox: React.FC = () => {
	const { state, dispatch } = useContext(StateContext);

	const toggleListView = () => {
		dispatch({ type: "TOGGLE_LIST_VIEW" });
	};

	return (
		<div className="left-fixed-box">
			<h3>Legend:</h3>
			<div className="legend-set-box">
				{svgIcons.svgHeartIcons.base_set}
				<div className="legend-set-title">Base Set</div>
			</div>
			<div className="legend-set-box">
				{svgIcons.svgHeartIcons.oktoberfest}
				<div className="legend-set-title">Oktoberfest</div>
			</div>
			<div className="legend-set-box">
				{svgIcons.svgHeartIcons.expanding_the_house}
				<div className="legend-set-title">Expanding the House</div>
			</div>
			<div className="legend-set-box">
				{svgIcons.svgHeartIcons.romantic_vacation}
				<div className="legend-set-title">Romantic Vacation</div>
			</div>
			<div className="legend-set-box">
				{svgIcons.svgHeartIcons.winter_romance}
				<div className="legend-set-title">Winter Romance</div>
			</div>
			<br />
			<div className="button-container">
				<button
					className="button-75 list-view-button"
					role="button"
					onClick={toggleListView}
				>
					<span className="text">
						{state.listView ? "Picture View!" : "List view!"}
					</span>
				</button>
			</div>
		</div>
	);
};

export default LegendBox;
