interface CheckboxProps {
	parent: string;
	item: string;
	tooltip?: string;
}

const Checkbox = (props: CheckboxProps) => {
	return (
		<div className="custom-control custom-checkbox">
			<input
				type="checkbox"
				className="custom-control-input"
				id={`${props.item}`}
			/>
			<label className="custom-control-label-check" htmlFor={`${props.item}`}>
				{props.item}
			</label>
			{props.tooltip && <p className="tooltipText">{props.tooltip}</p>}
		</div>
	);
};

export default Checkbox;
