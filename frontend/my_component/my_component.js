// frontend/my_component/my_component.js

import React from "react";
import ReactDOM from "react-dom";

const MyComponent = ({ label }) => {
  return (
    <div style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "10px" }}>
      <h2 style={{ color: "#4CAF50" }}>{label}</h2>
    </div>
  );
};

export default MyComponent;

const root = document.getElementById("root");
ReactDOM.render(<MyComponent label="Hello from Streamlit Component!" />, root);
