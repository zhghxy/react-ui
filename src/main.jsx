import React from "react";
import ReactDOM from "react-dom";
import "./main.scss";
import {Swipe,SwipeItem} from "./swipe.jsx";

ReactDOM.render(
    <Swipe speed={1000} auto={5000} showIndicators={true}>
        <SwipeItem src={require("./photo/1.jpg")} />
        <SwipeItem src={require("./photo/2.jpg")} />
        <SwipeItem src={require("./photo/3.jpg")} />
    </Swipe>,
    document.getElementById("app")
)
