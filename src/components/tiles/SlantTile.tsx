import { ESlantKeys, ESlantOptions } from "../../utils/types";
import SlantGroup from "../building-blocks/SlantGroup";
import TileBox from "../building-blocks/TileBox";
import Title from "../building-blocks/Title";

//No explicit typing because TS infers the typing of this because it's repetative and doesn't change, and we don't need to force type it when TS can just infer it
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
		// Hard code this beacuse this should always be enabled
		<TileBox enabledClass="tileEnabled">
			<Title title="Slants:" />
			{slantOptionsData.map(({ stateKey, options, title }) => (
				<SlantGroup
					stateKey={stateKey}
					options={options}
					title={title}
					key={stateKey}
				/>
			))}
		</TileBox>
	);
};

export default SlantTile;
