import { useContext } from "react";
import { StateContext } from "../../utils/stateHandler";
import { EBooleans, ESet, FilterState } from "../../utils/types";

const Checkbox: React.FC<{
	parent: string;
	item: string;
	id: ESet | EBooleans;
	tooltip?: string;
}> = ({ parent, item, id, tooltip }) => {
	const { state, dispatch } = useContext(StateContext);
	// Determine if the checkbox should be checked
	const isChecked = (id: ESet | EBooleans): boolean => {
		if (parent === "sets") {
			return state.setList.includes(id as ESet); // Assumes setList contains ESet values
		} else {
			// Check if id is a valid boolean key
			if (typeof id === "string" && id in state.booleans) {
				return state.booleans[id as keyof FilterState["booleans"]];
			}
			return false;
		}
	};

	const handleCheckClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		const id = event.target.id as ESet | EBooleans;
		if (parent === "sets") {
			dispatch({ type: "HANDLE_SET_LIST", payload: id as ESet });
		} else {
			dispatch({
				type: "TOGGLE_BOOLEAN",
				payload: id as keyof FilterState["booleans"],
			});
		}
	};

	return (
		<div className="custom-control custom-checkbox">
			<input
				type="checkbox"
				className="custom-control-input"
				id={`${id}`}
				checked={isChecked(id)}
				onChange={handleCheckClick}
			/>
			<label className="custom-control-label-check" htmlFor={`${id}`}>
				{item}
			</label>
			{tooltip && <p className="tooltipText">{tooltip}</p>}
		</div>
	);
};

export default Checkbox;
