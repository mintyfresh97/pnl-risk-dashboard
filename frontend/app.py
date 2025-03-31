import streamlit as st
import streamlit.components.v1 as components

# Set page config
st.set_page_config(page_title="PnL & Risk Dashboard", layout="wide")

# Title
st.markdown("<h1 style='color:white;'>PnL & Risk Dashboard</h1>", unsafe_allow_html=True)

# Load the custom component
my_component = components.declare_component(
    name="my_component",
    path="frontend/my_component/build"  # Make sure this path is correct relative to app.py
)

# Call the component and receive data if sent back
response = my_component()

# Optional: Show the returned data
if response:
    st.write("Component says:")
    st.json(response)
