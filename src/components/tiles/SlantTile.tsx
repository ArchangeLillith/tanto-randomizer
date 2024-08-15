import { ESlantKeys, ESlantOptions } from "../../utils/types";
import SlantGroup from "../building-blocks/SlantGroup";
import TileBox from "../building-blocks/TileBox";
import Title from "../building-blocks/Title";

const SlantTile = () => {
	//Could move to types util, but it's only used here
	type SlantOptions = {
		stateKey: ESlantKeys;
		options: { value: ESlantOptions; label: string }[];
	};

	const cardDrawOptions: SlantOptions = {
		stateKey: ESlantKeys.cardDrawSlant,
		options: [
			{ value: ESlantOptions.SlantHigh, label: "High Draw" },
			{ value: ESlantOptions.SlantLow, label: "Low Draw" },
			{ value: ESlantOptions.NoSlant, label: "No Preference" },
		],
	};

	const loveCostOptions: SlantOptions = {
		stateKey: ESlantKeys.loveCostSlant,
		options: [
			{ value: ESlantOptions.SlantHigh, label: "High Love Cost" },
			{ value: ESlantOptions.SlantLow, label: "Low Love Cost" },
			{ value: ESlantOptions.NoSlant, label: "No Preference" },
		],
	};

	const loveGiveOptions: SlantOptions = {
		stateKey: ESlantKeys.loveGiveSlant,
		options: [
			{ value: ESlantOptions.SlantHigh, label: "High Love Give" },
			{ value: ESlantOptions.SlantLow, label: "Low Love Give" },
			{ value: ESlantOptions.NoSlant, label: "No Preference" },
		],
	};

	const servingsOptions: SlantOptions = {
		stateKey: ESlantKeys.servingsSlant,
		options: [
			{ value: ESlantOptions.SlantHigh, label: "High Servings" },
			{ value: ESlantOptions.SlantLow, label: "Low Servings" },
			{ value: ESlantOptions.NoSlant, label: "No Preference" },
		],
	};
	const employEffectsOptions: SlantOptions = {
		stateKey: ESlantKeys.employEffectsSlant,
		options: [
			{ value: ESlantOptions.SlantHigh, label: "High Employ Effects" },
			{ value: ESlantOptions.SlantLow, label: "Low Employ Effects" },
			{ value: ESlantOptions.NoSlant, label: "No Preference" },
		],
	};
	const victoryPointSlant: SlantOptions = {
		stateKey: ESlantKeys.victoryPointSlant,

		options: [
			{ value: ESlantOptions.SlantHigh, label: "High Victory Points" },
			{ value: ESlantOptions.SlantLow, label: "Low Victory Points" },
			{ value: ESlantOptions.NoSlant, label: "No Preference" },
		],
	};

	return (
		<TileBox
			children={
				<>
					<Title title="Slants:" />
					<SlantGroup
						stateKey={cardDrawOptions.stateKey}
						options={cardDrawOptions.options}
						title="Card Draw"
					/>
					<SlantGroup
						stateKey={loveCostOptions.stateKey}
						options={loveCostOptions.options}
						title="Love Cost"
					/>
					<SlantGroup
						stateKey={loveGiveOptions.stateKey}
						options={loveGiveOptions.options}
						title="Love Give"
					/>
					<SlantGroup
						stateKey={servingsOptions.stateKey}
						options={servingsOptions.options}
						title="Servings"
					/>
					<SlantGroup
						stateKey={employEffectsOptions.stateKey}
						options={employEffectsOptions.options}
						title="Employ Effects"
					/>
					<SlantGroup
						stateKey={victoryPointSlant.stateKey}
						options={victoryPointSlant.options}
						title="Victory Points"
					/>
				</>
			}
		/>
	);
};

export default SlantTile;

