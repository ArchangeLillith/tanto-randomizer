import { useContext } from "react";
import { StateContext } from "../../utils/stateHandler";


const LegendBox: React.FC = () => {
	const { state, dispatch } = useContext(StateContext);

	const toggleListView = () => {
		dispatch({ type: "TOGGLE_LIST_VIEW" });
	};

	const svgIcons = {
		base_set: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 512 512"
				className="legend-heart-icon"
			>
				<path
					fill="pink"
					d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
				/>
			</svg>
		),
		oktoberfest: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 512 512"
				className="legend-heart-icon"
			>
				<path
					fill="rgb(238, 173, 127)"
					d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
				/>
			</svg>
		),
		expanding_the_house: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 512 512"
				className="legend-heart-icon"
			>
				<path
					fill="rgb(249, 232, 153)"
					d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
				/>
			</svg>
		),
		romantic_vacation: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 512 512"
				className="legend-heart-icon"
			>
				<path
					fill="rgb(194, 232, 246)"
					d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
				/>
			</svg>
		),
		winter_romance: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 512 512"
				className="legend-heart-icon"
			>
				<path
					fill="rgb(138, 166, 236)"
					d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
				/>
			</svg>
		),
	};

	return (
		<div className="left-fixed-box">
			<h3>Legend:</h3>
			<div className="legend-set-box">
				{svgIcons.base_set}
				<div className="legend-set-title">Base Set</div>
			</div>
			<div className="legend-set-box">
				{svgIcons.oktoberfest}
				<div className="legend-set-title">Oktoberfest</div>
			</div>
			<div className="legend-set-box">
				{svgIcons.expanding_the_house}
				<div className="legend-set-title">Expanding the House</div>
			</div>
			<div className="legend-set-box">
				{svgIcons.romantic_vacation}
				<div className="legend-set-title">Romantic Vacation</div>
			</div>
			<div className="legend-set-box">
				{svgIcons.winter_romance}
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
