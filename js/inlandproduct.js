$(function(){
  var productid = +getSearch('productid');
  console.log(productid);
  getproductInfo();
  function getproductInfo(){
    $.ajax({
      type: 'get',
      url: 'http://127.0.0.1:9090/api/getdiscountproduct',
      data: {
        productid: productid
      },
      dataType: 'json',
      success: function(info){
        console.log(info);
        // 绑定产品展示数据
        $('#mmain .mproductshow').html(template('productShowTpl' , info));
        $('.mpinglun').html(info.result[0].productComment);
      }
    });
  }

  
  
});