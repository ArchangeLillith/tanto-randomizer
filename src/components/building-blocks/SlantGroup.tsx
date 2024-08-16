import { useContext } from "react";
import { StateContext } from "../../utils/stateHandler";
import { ESlantKeys, ESlantOptions } from "../../utils/types";
import Title from "./Title";

//Pulled into an interface because options prop is a long type
interface SlantGroupProps {
	stateKey: ESlantKeys;
	options: { value: ESlantOptions; label: string }[];
	title: string;
}

const SlantGroup: React.FC<SlantGroupProps> = ({
	stateKey,
	options,
	title,
}) => {
	const { state, dispatch } = useContext(StateContext);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch({
			type: "SET_SLANT_OPTION",
			payload: {
				key: stateKey,
				value: event.target.value as ESlantOptions,
			},
		});
	};

	//Grab the value that's in state so we can accurately mark the radio group on load
	const selectedValue = state[stateKey] as ESlantOptions;

	return (
		<>
			<Title title={title} />
			<div>
				{options.map(({ value, label }) => (
					<div key={value}>
						<input
							type="radio"
							name={stateKey}
							value={value}
							checked={selectedValue === value}
							onChange={handleChange}
							//If something breaks, it could be this? Shouldn't have anything dependant on it but you never know
							id={`${stateKey}-${value}`}
						/>
						<label htmlFor={stateKey}>{label}</label>
					</div>
				))}
			</div>
		</>
	);
};

export default SlantGroup;
