$car=$('.header span');
$list=$('.list');
//加载数据
$.ajax({
    url:'../data/goods.json',
    type:'get',
    dataType:'json',
    success:function(json){
        $.each(json,function(index,item){
            var liDom=`<li>
                        <img src="../${item.imgurl}" alt="">
                        <p>${item.price}</p>
                        <h3>${item.title}</h3>
                        <span code=${item.code}>加入购物车</span>
                    </li>`
            $list.append($(liDom));
        })
    }
})
$list.on('click','span',function(){
    var code=$(this).attr('code');
    var arr=[];
    var flag=true;
    if(localStorage.getItem('goods')){
        arr=JSON.parse(localStorage.getItem('goods'));
        $.each(arr,function(index,item){
            if(item.code==code){
                item.num++;
                flag=false;
                return;
            }
        })
    }
    if(flag){
        arr.push({"code":code,"num":1});
    }
    localStorage.setItem("goods",JSON.stringify(arr));
    console.log(arr);
    alert('添加成功');
})
