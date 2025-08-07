import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./global.scss";

createRoot(document.getElementById("root")!).render(
  <App />
);
