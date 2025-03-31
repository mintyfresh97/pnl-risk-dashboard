import React from "react";
import { createRoot } from "react-dom/client";
import MyComponent from "../index.tsx"; // Ensure this path is correct

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(<MyComponent />);
