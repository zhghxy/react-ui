# react-轮播
基于react的轮播组件
# 安装
npm install
# 用法
见src/main.jsx  

``` javascript
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
```

## 参数
speed:图片划过的速度(ms)  
auto:图片停留的时间(ms)  
showIndicators:是否显示indicator(true/false)  
