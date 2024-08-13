import { useContext } from "react";
import { StateContext } from "../../utils/stateHandler";
import { FilterState } from "../../utils/types";

interface DropdownProps {
	label: string;
	stateKey: keyof FilterState;
	toolTip?: string;
}

const Dropdown = (props: DropdownProps) => {
	const { dispatch } = useContext(StateContext);

	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch({
			type: "SET_SISTER_INCLUSION",
			payload: Number(e.target.value),
		});
	};

	return (
		<>
			<p>{props.label}</p>
			<select className="custom-select" onChange={handleSelectChange}>
				<option id="0">0</option>
				<option id="1">1</option>
				<option id="2">2</option>
			</select>
			{props.toolTip && <p>{props.toolTip}</p>}
		</>
	);
};

export default Dropdown;
