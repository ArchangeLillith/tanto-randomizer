import { useContext } from "react";
import { StateContext } from "../../utils/stateHandler";
import { ESlantKeys, ESlantOptions } from "../../utils/types";

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
		<div className="slant-tile">
			<div className="slant-title-wrapper">
				<div>{title}</div>
			</div>
			<div>
				{options.map(({ value, label }) => (
					<div key={value} className="inner-slant-box">
						<input
							type="radio"
							name={stateKey}
							className="radio-check-input"
							value={value}
							checked={selectedValue === value}
							onChange={handleChange}
							//If something breaks, it could be this? Shouldn't have anything dependant on it but you never know
							id={`${stateKey}-${value}`}
						/>
						<label htmlFor={stateKey} className="radio-check-label text-12">
							{label}
						</label>
					</div>
				))}
			</div>
		</div>
	);
};

export default SlantGroup;
