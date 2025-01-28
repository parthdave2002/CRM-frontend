import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "react-tooltip/dist/react-tooltip.css";
import 'ag-grid-community/styles//ag-grid.css';
import 'ag-grid-community/styles//ag-theme-alpine.css';
// import 'react-toastify/dist/ReactToastify.css';
import "./index.css";
import theme from "./flowbite-theme";
import { Flowbite } from "flowbite-react";
import { Provider } from "react-redux";
import { configureStore } from "./Store";
import App from "./App";
import Autologout from "./components/autologout";

const container = document.getElementById("root");
<script src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" ></script>
if (!container) {
  throw new Error("React root element doesn't exist!");
}

const root = createRoot(container);

root.render(
 
    <Flowbite theme={{ theme }}>
      <Provider store={configureStore({})}>
        <Autologout>
        <App />
        </Autologout>
      </Provider>
    </Flowbite>
  
);