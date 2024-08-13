import { useContext } from "react";
import { StateContext } from "../../utils/stateHandler";
import { EReminescenses, FilterState } from "../../utils/types";

interface RadioGroupProps {
	options: { value: string; label: string }[];
	stateKey: keyof FilterState;
	toolTip?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
	stateKey,
	toolTip,
	options = [],
}) => {
	console.log(`OPTIOSN,`, options);
	const { state, dispatch } = useContext(StateContext);
	console.log("Current Value:", state[stateKey]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch({
			type: "SET_SELECTED_OPTION",
			payload: {
				key: stateKey,
				value: event.target.value, // Assuming you handle the conversion in reducer
			},
		});
	};
	
	//Grab the value that's in state so we can accuretly mark the radio group on load
	const currentValue = state[stateKey] as EReminescenses;

	return (
		<>
			<div>
				{options.map((option) => (
					<div key={option.value}>
						<input
							type="radio"
							name={stateKey}
							value={option.value}
							onChange={handleChange}
							checked={currentValue === option.value} // Set the checked property
						/>
						<label>{option.label}</label>
					</div>
				))}
			</div>
			{toolTip && <p className="tooltipText">{toolTip}</p>}
		</>
	);
};

export default RadioGroup;
