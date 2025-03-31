import streamlit as st
import streamlit.components.v1 as components

st.set_page_config(layout="wide")
st.title("PnL & Risk Dashboard")

# Serve the prebuilt HTML + JS directly
components.html(open("frontend/my_component/build/index.html").read(), height=800)
