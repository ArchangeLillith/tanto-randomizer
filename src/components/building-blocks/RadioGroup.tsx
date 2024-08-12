interface RadioGroupProps {
	parent: string;
	optionsArray: string[];
	toolTip?: string;
}

const RadioGroup = (props: RadioGroupProps) => {
	return (
		<>
			{props.optionsArray.map((option, index) => {
				return (
					<div key={`radio-div-${index}-${parent}`}>
						<input
							type="radio"
							name={`radio-option-${props.parent}`}
							id={`radio-option-${props.parent}`}
							value={option}
							key={`radio-option-${index}-${parent}`}
						/>
						<label
							htmlFor={`radio-option-${props.parent}`}
							key={`radio-label-${index}-${parent}`}
						>
							{option}
						</label>
					</div>
				);
			})}
			{props.toolTip && <p className="tooltipText">{props.toolTip}</p>}
		</>
	);
};

export default RadioGroup;
