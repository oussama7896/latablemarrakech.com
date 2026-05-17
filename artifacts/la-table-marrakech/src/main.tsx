import { createRoot } from "react-dom/client";
import App from "./App";
import { initWhatsAppTracking } from "./lib/analytics";
import "./index.css";

initWhatsAppTracking();
createRoot(document.getElementById("root")!).render(<App />);
