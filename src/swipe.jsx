import React from "react";
import "./swipe.scss";

export class SwipeItem extends React.Component{

    render(){
        return <img className="swipe-item" src={this.props.src} />
    }
}
export class Indicator extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return <span onClick={this.props.handleClick} className="swipe-indicators" index={this.key}></span>
    }
}
 export class Swipe extends React.Component{
     constructor(props){
         super(props);
         this.indicator=[];
         this.indicatorChange=this.indicatorChange.bind(this);

         this.state={
             width:0,
             index:0,
             left:0,
             num:this.props.children.length,
             clear:"",
             speed:0
         }
         this.slide=this.slide.bind(this);
         this.changeClass=this.changeClass.bind(this);

     }
     changeClass(i){
         for(var j=0;j<this.indicator.length;j++)
         {
             this.indicator[j].setAttribute("class","swipe-indicators");
         }
         this.indicator[i].classList.add("point");
         console.log(this.indicator[i]);
     }
     indicatorChange(k,e){
         console.log(k);
         clearTimeout(this.state.clear);
         var width=parseInt(window.getComputedStyle(this.box,null).width);
         this.setState({
             left:k*width,
             speed:this.props.speed,
             clear:setTimeout(this.slide,this.props.auto),
             index:k
         })
         this.changeClass(k);
     }
     slide(){
         var width=parseInt(window.getComputedStyle(this.box,null).width);
        var maxLength=this.state.num*width;
        var left=this.state.left;
       var index=this.state.index;
       var num=this.state.num;
        if(left<maxLength){
            this.setState({
                left:left+width,
                speed:this.props.speed,
                index:(index+1)%num
            });
            if(this.state.left>=maxLength){
                var that=this;
                setTimeout(function(){that.setState({
                        left:0,
                        speed:0
                    })},this.props.auto/2);
            }
        }
        this.changeClass(this.state.index);
        this.setState({
            clear:setTimeout(this.slide,this.props.auto)
        })
        
     }

    componentDidMount(){
        this.setState({
            clear:setTimeout(this.slide,this.props.auto),
            width:(this.props.children.length+1)*parseInt(window.getComputedStyle(this.box,null).width)});
    }

     render(){
         return (
            <div className="swipe" ref={(o)=>this.box=o}>
                <div className="swipe-items-container" ref={(o)=>this.container=o} style={{width:this.state.width,left:-this.state.left,transition:"left "+this.state.speed+"ms"}}>
                     {this.props.children}
                     {this.props.children[0]}            
                </div>
                <div className="swipe-indicators-list" style={{display:this.props.showIndicators?"block":"none"}}>
                    {this.props.children.map((num,index)=><span key={index} onClick={this.indicatorChange.bind(this,index)} ref={(o)=>this.indicator[index]=o} ></span>)}
                </div>
            </div>
        )
    }
}