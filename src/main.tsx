import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import { StateProvider } from "./utils/stateHandler.tsx";

// Render the app
const rootElement = document.getElementById("root");
if (rootElement) {
	createRoot(rootElement).render(
		<StrictMode>
			<StateProvider>
				<App />
			</StateProvider>
		</StrictMode>
	);
}
