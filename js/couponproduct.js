$(function(){
  var couponTitle = localStorage.getItem('couponTitle');
  var couponId = +getSearch('couponid');
  console.log(couponTitle);
  $('#header h1').html(couponTitle + '优惠券');
  renderCoupon();
  function renderCoupon(){
    $.ajax({
      type: 'get',
      url:'http://127.0.0.1:9090/api/getcouponproduct',
      data: {
        couponid: couponId
      },
      dataType: 'json',
      success: function(info){
        console.log(info);
        $('.coupon-list').html(template('couponTpl',info));
        maxId = info.result.length-1;
      }
    })
  }
  var maxId;
  var id = 0 ;
  var src;
  $('.coupon-list').on( 'click', 'a',function(  ){
    $('#modal').show();
    id = $(this).prop('id');
    src = $(this).find('img').prop('src');
    $('#modal img').prop('src',src);
    console.log( id, src);
    return false;
  });
  document.querySelector('#modal>.pic').addEventListener('click',function(e){
    e.cancelBubble = true;  
  });

  
  // 点击模态框隐藏
  $('#modal').on('click',function(){
    $(this).hide();  
  });
  // 点击上一个切换图片
  $('.prev').click(function(){
    id--;
    if(id < 0){
      return;
    }
    var src = $('.coupon-list>li>a').eq(id).find('img').prop('src');
    $('#modal>.pic>img').attr('src', src);
    console.log(id,src);
  });
  // 点击下一个切换图片
  $('.next').click(function(){
    id++;
    if(id > maxId){
      return;
    }
    var src = $('.coupon-list>li>a').eq(id).find('img').prop('src');
    console.log($('.coupon-list>li>a').eq(id).find('img'));
    console.log( id, src);
    $('#modal>.pic>img').attr('src', src);
  });

  // 点击当前图片调到响应的位置
  $('#modal>.pic>img').click(function(){
    var top = $('.coupon-list>li>a').eq(id).find('img').parents('li')[0].offsetTop;
    // $(window).scrollTop(top);
    $('html,body').animate({scrollTop: top},500);
    $('#modal').hide();
  })
});