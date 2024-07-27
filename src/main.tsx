import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/routes";
import "@/styles/index.css";
import { AuthProvider } from "./utils/contexts/token";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
