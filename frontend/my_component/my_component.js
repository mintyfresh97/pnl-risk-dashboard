// frontend/my_component/my_component.js

import '../../index.css';
import React from "react";
import ReactDOM from "react-dom";

const MyComponent = ({ label }) => {
  return (
    <div className="p-4">
      <h2 className="text-blue-600 font-bold text-lg">{label}</h2>
    </div>
  );
};

export default MyComponent;

const root = document.getElementById("root");
if (root) {
  ReactDOM.render(<MyComponent label="Hello, Tailwind!" />, root);
}
