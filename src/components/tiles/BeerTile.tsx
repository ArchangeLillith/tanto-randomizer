import { EBeerOptions } from "../../utils/types";
import RadioGroup from "../building-blocks/RadioGroup";
import TileBox from "../building-blocks/TileBox";
import Title from "../building-blocks/Title";

const BeerTile = () => {
	return (
		<TileBox
			children={
				<>
					<Title title="Beer" />
					<RadioGroup
						stateKey={"beerOptions"}
						options={[
							{
								value: EBeerOptions.NoPreference,
								label: "No preference",
							},
							{
								value: EBeerOptions.Exclude,
								label: "Exclude all cards that affect or require Beer cards",
							},
							{
								value: EBeerOptions.Force,
								label:
									"Ensure at least one bar maid in results to allow beer cards to be utilized",
							},
						]}
					/>
				</>
			}
		/>
	);
};

export default BeerTile;
