$(function(){

  var brandtitleid = getSearch('brandtitleid');
  var firstProductid ;
  var productImg;
  renderBrand();
  function renderBrand(){
    $.ajax({
      type: 'get',
      url: 'http://127.0.0.1:9090/api/getbrand',
      data: {
        brandtitleid:brandtitleid
      },
      dataType: 'json',
      success: function( info ){
        console.log(info);
        $('.brand-list').html(template('brandlistTpl', info));
      }
    });
  }
  renderProductlist();
  function renderProductlist(){
    $.ajax({
      type: 'get',
      url: 'http://127.0.0.1:9090/api/getbrandproductlist',
      data: {
        brandtitleid: brandtitleid,
        pagesize: 4
      },
      dataType: 'json',
      success: function( info ){
        console.log(info);
        firstProductid = info.result[0].productId;
        productImg = info.result[0].productImg;
        productName = info.result[0].productName;
        $('#product').html(template('productTpl',info));
        renderComm();
        
      }
    })
  }

  
  function renderComm(){
    $.ajax({
      type:'get',
      url: 'http://127.0.0.1:9090/api/getproductcom',
      data:{
        productid:firstProductid
      },
      dataType: 'json',
      success: function( info ){
       console.log(info);
       info.productImg = productImg;
       info.productName = productName;
       $('.product-comm').html(template('productcommTpl', info));
      }
    });
  }

});