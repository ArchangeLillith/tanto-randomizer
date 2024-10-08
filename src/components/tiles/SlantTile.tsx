import { ESlantKeys, ESlantOptions } from "../../utils/types";
import SlantGroup from "../building-blocks/SlantGroup";
import Title from "../building-blocks/Title";

const slantOptionsData = [
	{
		stateKey: ESlantKeys.cardDrawSlant,
		options: [
			{ value: ESlantOptions.SlantHigh, label: "High Draw" },
			{ value: ESlantOptions.SlantLow, label: "Low Draw" },
			{ value: ESlantOptions.NoSlant, label: "No Preference" },
		],
		title: "Card Draw",
	},
	{
		stateKey: ESlantKeys.loveCostSlant,
		options: [
			{ value: ESlantOptions.SlantHigh, label: "High Love Cost" },
			{ value: ESlantOptions.SlantLow, label: "Low Love Cost" },
			{ value: ESlantOptions.NoSlant, label: "No Preference" },
		],
		title: "Love Cost",
	},
	{
		stateKey: ESlantKeys.loveGiveSlant,
		options: [
			{ value: ESlantOptions.SlantHigh, label: "High Love Give" },
			{ value: ESlantOptions.SlantLow, label: "Low Love Give" },
			{ value: ESlantOptions.NoSlant, label: "No Preference" },
		],
		title: "Love Give",
	},
	{
		stateKey: ESlantKeys.servingsSlant,
		options: [
			{ value: ESlantOptions.SlantHigh, label: "High Servings" },
			{ value: ESlantOptions.SlantLow, label: "Low Servings" },
			{ value: ESlantOptions.NoSlant, label: "No Preference" },
		],
		title: "Servings",
	},
	{
		stateKey: ESlantKeys.employEffectsSlant,
		options: [
			{ value: ESlantOptions.SlantHigh, label: "High Employ Effects" },
			{ value: ESlantOptions.SlantLow, label: "Low Employ Effects" },
			{ value: ESlantOptions.NoSlant, label: "No Preference" },
		],
		title: "Employ Effects",
	},
	{
		stateKey: ESlantKeys.victoryPointSlant,
		options: [
			{ value: ESlantOptions.SlantHigh, label: "High Victory Points" },
			{ value: ESlantOptions.SlantLow, label: "Low Victory Points" },
			{ value: ESlantOptions.NoSlant, label: "No Preference" },
		],
		title: "Victory Points",
	},
];

const SlantTile = () => {
	return (
		<div className="tile-box slant-wrapper">
			<Title title="Slants:" />
			<div className="slant-box">
				{slantOptionsData.map(({ stateKey, options, title }) => (
					<SlantGroup
						stateKey={stateKey}
						options={options}
						title={title}
						key={stateKey}
					/>
				))}
			</div>
		</div>
	);
};

export default SlantTile;
