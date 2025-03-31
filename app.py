import streamlit as st
import streamlit.components.v1 as components

st.set_page_config(layout="wide")
st.title("PnL & Risk Dashboard")

# Declare your custom React component
my_component = components.declare_component(
    "my_component",
    path="frontend/my_component/build"
)

# Call the component (no need to pass label/default unless you use them)
my_component()
