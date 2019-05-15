$(function(){
  $.ajax({
    type: 'get',
    url: 'http://127.0.0.1:9090/api/getcoupon',
    dataType: 'json',
    success: function( info ){
      console.log(info);
      $('#coupon').html(template('couponTpl', info));
    }
  });

  $('#coupon').on('click', 'a', function(){
    console.log($(this).parent().data('coupontitle'));
    var coupontitle = $(this).parent().data('coupontitle');
    localStorage.setItem('couponTitle',coupontitle);
  });
});