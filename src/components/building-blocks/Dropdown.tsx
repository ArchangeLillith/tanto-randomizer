interface DropdownProps {
	label: string;
	toolTip?: string;
}

const Dropdown = (props: DropdownProps) => {
	return (
		<>
			<p>{props.label}</p>
			<select className="custom-select">
				<option>0</option>
				<option>1</option>
				<option>2</option>
			</select>
			{props.toolTip && <p>{props.toolTip}</p>}
		</>
	);
};

export default Dropdown;
