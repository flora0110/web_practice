var add = document.querySelector('.add');
var list = document.querySelector('.list');
var data = JSON.parse(localStorage.getItem('listData'))|| [];
//監聽事件
add.addEventListener('click', addData);
list.addEventListener('click',toggleDone);

//更新
updateList(data)
var now_edit=0;
var chan_index=0;
function addData(e){
    alert(now_edit);
     e.preventDefault();//停止事件
     if(now_edit==0){
         var txt = document.querySelector('.note').value;
         var todo ={
             content: txt
         };
         data.push(todo);
         $(function(){
             $('.note').val("");
         });
         updateList(data);
         localStorage.setItem('listData',JSON.stringify(data));
     }
     else{
         var txt = document.querySelector('.note').value;
         var todo ={
             content: txt
         };
         data.splice(chan_index,1,todo);//更改
         localStorage.setItem('listData',JSON.stringify(data));
         $(function(){
             $('.note').val("");
         });
         updateList(data);  //我們在更新整個畫面的列表。*/
         $(function(){
             $('#bnt1').val("送出");
             now_edit=0;
         });
     }
}
function toggleDone(e){
    e.preventDefault();
    if( e.target.tagName !== 'A'){return};//非超連結
    var index = e.target.dataset.index;//抓取這個點擊按鈕的dataset
    var kind= e.target.dataset.kind;//抓取這個點擊按鈕的
    if(kind==0){//刪除
        data.splice(index,1);//在資料中把這個事件刪除
        localStorage.setItem('listData',JSON.stringify(data));
        updateList(data);  //我們在更新整個畫面的列表。
    }
    else{
        $(function(){
            $('#bnt1').val("編輯");
            now_edit=1;
            chan_index = index;
        });
    }
}
function updateList(items){
    str = '' ;
    var len = items.length;
    for(var i=0;i<len;i++){
        str += '<li><span>'+ items[i].content+'</span><a href="#" data-kind=0 data-index='+i+'>刪除</a>'+' <a href="#" data-kind=1 data-index='+i+'>編輯</a></li>';
        //用a跳轉到相同畫面來刷新
    }
    list.innerHTML = str;
}
