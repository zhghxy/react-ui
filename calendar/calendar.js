const monthDates=[31,28,31,30,31,30,31,31,30,31,30,31];
     // box=document.getElementsByClassName("picker")[0].getElementsByTagName("table")[0].getElementsByTagName('tbody')[0];

function getMyDate(o){
    const myDate=o;
    const month=myDate.getMonth(),
          year=myDate.getFullYear(),
          date=myDate.getDate(),
          box=this.getElementsByClassName("picker")[0].getElementsByTagName('table')[0].getElementsByTagName("tbody")[0];
          console.log(myDate.toDateString());
    const f_date=new Date(year,month,1),
          f_day=f_date.getDay();
          console.log(f_date.toDateString());
    this.getElementsByClassName('picker-year')[0].getElementsByTagName("span")[0].innerHTML=year+"";
    this.getElementsByClassName('picker-month')[0].getElementsByTagName('span')[0].innerHTML=month+1+'';
    var last_month_dates=monthDates[(month+11)%12];
    var f_line=document.createElement('tr'),
        temp_line;
    for(var i=f_day%7-1;i>=0;i--){
        var temp=document.createElement('td');
        temp.innerHTML=last_month_dates-i;
        temp.className='disabled';
        f_line.appendChild(temp);
    }   
    box.appendChild(f_line);
    temp_line=f_line;
    var temp_day;
    for(var i=0;i<monthDates[month];i++){
        temp_day=(f_day+i)%7;
        if(temp_day==0)
        { 
            temp_line=document.createElement('tr');
            box.appendChild(temp_line);
        }
        var temp=document.createElement("td");
        temp.addEventListener('click',function(e){
            console.log('click');
            chooseDate(e)});
        temp.innerHTML=i+1;
        temp_line.appendChild(temp);
    }
    for(var i=1,j=temp_day;j<6;j++,i++){
        var temp=document.createElement('td');
        temp.innerHTML=i;
        temp.className='disabled';
        temp_line.appendChild(temp);
    }
}
//window.onload=getMyDate.call(document.getElementsByClassName('date-picker')[0],new Date());
function chooseDate(e){
    var date=e.target.innerHTML;
    var header=e.target.parentNode.parentNode.parentNode.previousElementSibling;
    var year=header.getElementsByClassName("picker-year")[0].getElementsByTagName("span")[0].innerHTML;
    var month=header.getElementsByClassName("picker-month")[0].getElementsByTagName("span")[0].innerHTML;
    header.parentNode.parentNode.getElementsByTagName("input")[0].value=year+'-'+month+'-'+date;
    header.parentNode.className+=' picker-hide';
}
//document.getElementsByClassName("date-picker")[0].getElementsByTagName("input")[0].onfocus=
function showTable(e){
    var myClass=e.target.nextElementSibling.className.split('picker-hide');
    e.target.nextElementSibling.className=myClass[0];
}
function previousMonth(e){
    const c_year=parseInt(e.target.nextElementSibling.getElementsByTagName("span")[0].innerHTML),
          c_month=parseInt(e.target.nextElementSibling.nextElementSibling.getElementsByTagName("span")[0].innerHTML);
          
    const p_month=(c_month+10)%12,
          p_year=(p_month===11)?c_year-1:c_year;
    clearTable(e.target.parentNode.nextElementSibling);
    console.log(c_year);
   getMyDate.call(document.getElementsByClassName('date-picker')[0],new Date(p_year,p_month,2));
}
function nextMonth(e){
    const c_year=parseInt(e.target.previousElementSibling.previousElementSibling.getElementsByTagName("span")[0].innerHTML),
          c_month=parseInt(e.target.previousElementSibling.getElementsByTagName("span")[0].innerHTML);
    const p_month=c_month%12,
          p_year=(p_month===0)?c_year+1:c_year;
    clearTable(e.target.parentNode.nextElementSibling);
    console.log(c_year);
   getMyDate.call(document.getElementsByClassName('date-picker')[0],new Date(p_year,p_month,2));
}
function clearTable(obj){
    const children=obj.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    var i=children.length-1;
    while(i>0){
        obj.getElementsByTagName('tbody')[0].removeChild(children[i]);
        i--;
    }
}

function getOffset(elem){
    var obj={
        left:elem.offsetLeft,
        top:elem.offsetTop
    }
    while(elem!=document.body){
        elem=elem.offsetParent;
        obj.left+=elem.offsetLeft;
        obj.top+=elem.offsetTop
    }
    return obj;
}
//document.getElementsByClassName("previous")[0].addEventListener('click',previousMonth);
//document.getElementsByClassName('next')[0].addEventListener('click',nextMonth);
for(let item of document.getElementsByClassName('previous')){
    console.log(item);
    item.addEventListener('click',previousMonth);
}
for(let item of document.getElementsByClassName('next')){
    item.addEventListener('click',nextMonth);
}
for(let item of document.getElementsByClassName('date-picker')){
    item.getElementsByTagName('input')[0].addEventListener('focus',showTable);
}
window.onload=function(){
    changePos();
    for(let item of document.getElementsByClassName('date-picker')){
        getMyDate.call(item,new Date());
    }
}
window.addEventListener('click',function(e){
    for(let o of document.getElementsByClassName('date-picker')){
        if(!o.contains(e.target)){
            o.getElementsByClassName("picker")[0].className+=' picker-hide';
        }
    }
})
function changePos(){
    for(let o of document.getElementsByClassName('date-picker')){
        let offset=getOffset(o);
        if(offset.top<250){
            o.getElementsByClassName('picker')[0].style.top='50px';
        }else{
            o.getElementsByClassName('picker')[0].style.top='-250px';
        }
    }
}
window.onscroll=changePos;
