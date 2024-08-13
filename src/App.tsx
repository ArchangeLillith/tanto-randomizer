import React, { useContext } from "react";
import ChoicesView from "./views/ChoicesView";
import { StateContext } from "./utils/stateHandler";
//For testing purposes we can toggle off the styling to make it plain mardown
// import "./app.css";

const App: React.FC = () => {
	const { state } = useContext(StateContext);

	return (
		<>
			<ChoicesView />
			<div style={{ position: "absolute", right: "10%", top: 0 }}>
				<h1>Current State:</h1>
				<pre>{JSON.stringify(state, null, 2)}</pre>
			</div>
		</>
	);
};

export default App;
