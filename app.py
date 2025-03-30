import streamlit as st
import streamlit.components.v1 as components

# Render the custom React component
st.title("PnL & Risk Dashboard")

# Declare and call your component
my_component = components.declare_component(
    "my_component",
    path="frontend/my_component"
)

# Call it and capture any return value
response = my_component(label="Hello from React!", default="No response")
st.write("Component says:", response)
