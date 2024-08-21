import {
	ESlantOptions,
	FilterState,
	setNameMapping,
	slantNameMapping,
} from "../../utils/types";

const StateBox = ({ state }: { state: FilterState }) => {
	const renderSlantInfo = (label: string, slant: ESlantOptions) =>
		slant !== ESlantOptions.NoSlant && (
			<p>{`${label}: ${slantNameMapping[slant]}`}</p>
		);

	const renderBooleansInfo = () => {
		const exclusions = [];
		if (!state.booleans.includeBuildings) exclusions.push("Buildings");
		if (!state.booleans.includeCouples) exclusions.push("Couples");
		if (!state.booleans.includeEvents) exclusions.push("Events");
		if (!state.booleans.includePrivateMaids) exclusions.push("Private Maids");

		return exclusions.length > 0 ? (
			<p>
				{exclusions.join(", ")}
				{exclusions.length > 1 ? ", " : " "}and maids that require them,
				excluded
			</p>
		) : null;
	};

	return (
		<div className="right-fixed-box">
			<div className="state-box">
				<h2 className="legend-set-title align-center">Filters</h2>
				<div className="set-box">
					<h3>Sets Chosen: </h3>
					{state.setList.map((set) => (
						<div key={setNameMapping[set]}>{setNameMapping[set]}</div>
					))}
				</div>
				{state.sisterInclusion !== 0 && (
					<div>Sisters included: {state.sisterInclusion} </div>
				)}
				{renderSlantInfo("Victory Point Slant", state.victoryPointSlant)}
				{renderSlantInfo("Card Draw Slant", state.cardDrawSlant)}
				{renderSlantInfo("Love Cost Slant", state.loveCostSlant)}
				{renderSlantInfo("Love Give Slant", state.loveGiveSlant)}
				{renderSlantInfo("Servings Slant", state.servingsSlant)}
				{renderSlantInfo("Employ Effects Slant", state.employEffectsSlant)}
				{renderBooleansInfo()}
				{state.bannedCards.length > 0 && (
					<div className="banned-cards-wrapper">
						<div>Banned Cards:</div>
						{state.bannedCards?.map((cardName) => (
							<div className="banned-card" key={cardName}>
								{cardName}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default StateBox;
