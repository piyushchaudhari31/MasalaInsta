import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Reelsvideo from "./context/Reelsvideo.jsx";

createRoot(document.getElementById("root")).render(
  <Reelsvideo >
  <BrowserRouter>
    <App />
    <Toaster />
  </BrowserRouter>
  </Reelsvideo>
);
