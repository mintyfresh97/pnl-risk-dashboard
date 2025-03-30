import streamlit as st
import streamlit.components.v1 as components

# Render the custom React component
st.title("PnL & Risk Dashboard")

components.declare_component(
    "my_component",
    path="frontend/my_component"
)

components.html(
    """
    <div id="root"></div>
    <script src="./frontend/my_component/my_component.js"></script>
    """,
    height=100,
)
