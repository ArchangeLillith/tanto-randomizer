import { useContext } from "react";
import { StateContext } from "../../utils/stateHandler";
import { EReminescenseOptions, FilterState } from "../../utils/types";

//Intentionally pulled out because options is a long
interface RadioGroupProps {
	options: { value: string; label: string }[];
	stateKey: keyof FilterState;
	toolTip?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
	stateKey,
	toolTip,
	options,
}) => {
	const { state, dispatch } = useContext(StateContext);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch({
			type: "SET_SELECTED_OPTION",
			payload: {
				key: stateKey,
				value: event.target.value,
			},
		});
	};

	const currentValue = state[stateKey] as EReminescenseOptions;

	return (
		<>
			<div>
				{options.map(({ value, label }) => (
					<div key={value}>
						<input
							type="radio"
							className="radio-check-input"
							name={stateKey}
							value={value}
							onChange={handleChange}
							checked={currentValue === value}
						/>
						<label className="radio-check-label">{label}</label>
					</div>
				))}
			</div>
			{toolTip && <p className="tooltipText">{toolTip}</p>}
		</>
	);
};

export default RadioGroup;
