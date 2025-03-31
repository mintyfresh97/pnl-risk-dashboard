import streamlit as st
import streamlit.components.v1 as components

# Load the custom component from the build folder
my_component = components.declare_component(
    "my_component",
    path="frontend/my_component/build"
)

# Title
st.markdown("<h1 style='color:white;'>PnL & Risk Dashboard</h1>", unsafe_allow_html=True)

# Load the component
result = my_component()

# Optionally display returned result (if any)
if result:
    st.json(result)
