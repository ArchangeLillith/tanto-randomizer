import { useContext } from "react";
import { StateContext } from "../../utils/stateHandler";
import { ESlantKeys, ESlantOptions, FilterState } from "../../utils/types";
import Title from "./Title";

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
				key: stateKey as keyof FilterState,
				value: event.target.value as ESlantOptions,
			},
		});
	};

	//Grab the value that's in state so we can accurately mark the radio group on load
	const selectedValue = state[stateKey as keyof FilterState] as ESlantOptions;
  
	return (
		<>
			<Title title={title} />
			<div>
				{options.map((option) => (
					<div key={option.value}>
						<input
							type="radio"
							name={stateKey}
							value={option.value}
							checked={selectedValue === option.value}
							onChange={handleChange}
							id={stateKey}
						/>
						<label htmlFor={stateKey}>{option.label}</label>
					</div>
				))}
			</div>
		</>
	);
};

export default SlantGroup;
