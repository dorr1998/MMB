$(function(){
  getdiscountPro();
  function getdiscountPro(){
    $.ajax({
      type: 'get',
      url: 'http://127.0.0.1:9090/api/getinlanddiscount',
      dataType: 'json',
      success: function(info){
        console.log(info);
        $('.content').append(template('discountTpl', info));
      }
    })
  }
  $(window).scroll(function(){
    var scrollTop = $(window).scrollTop();
    var height = $('.recommenContent').height();
    var offset = height - window.innerHeight - scrollTop;
    console.log(scrollTop,height);
    console.log(window.innerHeight);
    if( offset  < 20 ){
      getdiscountPro();
    }
  });
});