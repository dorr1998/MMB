$(function(){
  var category = localStorage.getItem('category');
  var productid = +getSearch('productid');
  getProduct();
  function getProduct(){
    $.ajax({
      type: 'get',
      url: 'http://127.0.0.1:9090/api/getproduct',
      data: {
        productid: productid
      },
      dataType: 'json',
      success: function(info){
        console.log(info);
        info.categoryName = category;
        info.navProduct = info.result[0].productName.split(' ')[0];
        // 导航数据绑定
        $('#nav').html(template('navTpl', info));
        // 商品数据绑定
        $('#main-productBuy').html(template('productBuy', info));
      }
    })
  }

  getpingjia();
  function getpingjia(){
    $.ajax({
      type: 'get',
      url: 'http://127.0.0.1:9090/api/getproductcom',
      data: {
        productid:productid
      },
      dataType: 'json',
      success: function(info){
        console.log(info);
        $('.pj-list').html(template('pjTpl',info));
      }
    })
  }

});