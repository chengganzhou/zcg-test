var arr=[];
$list=$('.list');
//获取数据
if(localStorage.getItem('goods')){
    arr=JSON.parse(localStorage.getItem('goods'));
    $.ajax({
        url:'../data/goods.json',
        type:'get',
        dataType:'json',
        success:function(json){
            $.each(arr,function(index,item){
                $.each(json,function(i,dom){
                    if(item.code==dom.code){
                        var strDom=` <li>
                                        <input type="checkbox">
                                        <img src="../${dom.imgurl}" alt="">
                                        <h3>${dom.title}</h3>
                                        <p>${dom.price}</p>
                                        <i>-</i><span>${item.num}</span><em>+</em>
                                        <b>￥122</b>
                                        <div code=${item.code}>删除</div>
                                    </li>`;
                        $list.append($(strDom))
                        $($('.list b')[index]).text('￥'+dom.price.substr(1)*item.num);

                    }
                })
            })
        }
    })
}else{
    $list.html('还没有数据');
}
var arr1=[];
//点击添加
$('.list').on('click',"em",function(index,item){
    arr1=JSON.parse(localStorage.getItem('goods'));
    var code=$(this).siblings('div').attr("code");
    var num=$(this).siblings('span').text();
    num++;
    $(this).siblings('span').text(num);
    var total='￥'+num*($(this).siblings('p').text().substr(1));
    $(this).siblings('b').text(total);
    $.each(arr1,function(index,item){
        if(item.code==code){
            item.num=num;
        }
    })
    localStorage.setItem('goods',JSON.stringify(arr1));
})
//点击减少
$('.list').on('click',"i",function(index,item){
    arr1=JSON.parse(localStorage.getItem('goods'));
    var code=$(this).siblings('div').attr("code");
    var num=$(this).siblings('span').text();
    num--;
    if(num<1){
        num=1;
        alert('该宝贝不能减少了');
        return;
    }
    $(this).siblings('span').text(num);
    var total='￥'+num*($(this).siblings('p').text().substr(1));
    $(this).siblings('b').text(total);
    $(this).siblings('span').text(num);
    $.each(arr1,function(index,item){
        if(item.code==code){
            item.num=num;
        }
    })
    localStorage.setItem('goods',JSON.stringify(arr1));
})
//点击删除
$list.on("click","li div",function(){
    arr1=JSON.parse(localStorage.getItem('goods'));
    var code=$(this).attr('code');
    $.each(arr1,function(index,item){
        if(item.code==code){
            console.log(item.code)
            arr1.splice(index,1);
            return false;
        }
    })
    if(arr1.length<=0){
        localStorage.removeItem('goods');
        $list.html('还没有数据');
    }else{
        localStorage.setItem('goods',JSON.stringify(arr1));
    }
    $(this).parent().remove();
    alert("删除数据成功");
})