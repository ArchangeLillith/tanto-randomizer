import { useContext } from "react";
import { StateContext } from "../../utils/stateHandler";

const Dropdown: React.FC<{
	label: string;

	toolTip?: string;
}> = ({ label, toolTip }) => {
	const { dispatch } = useContext(StateContext);

	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch({
			type: "SET_SISTER_INCLUSION",
			payload: Number(e.target.value),
		});
	};

	return (
		<>
			<p>{label}</p>
			<select className="custom-select" onChange={handleSelectChange}>
				<option id="0">0</option>
				<option id="1">1</option>
				<option id="2">2</option>
			</select>
			{toolTip && <p>{toolTip}</p>}
		</>
	);
};

export default Dropdown;
