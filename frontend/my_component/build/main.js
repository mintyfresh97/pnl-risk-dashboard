import React from "react";
import { createRoot } from "react-dom/client";
import MyComponent from "../index.tsx";  // Path to your main component file

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(<MyComponent />);
