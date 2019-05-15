$(function(){
  renderTabnav();
  var titleid;
  function renderTabnav(){
    titleid = +getSearch('titleid');  // 字符串转数字
    $.ajax({
      type: 'get',
      url: 'http://127.0.0.1:9090/api/getbaicaijiatitle',
      dataType: 'json',
      success: function(info){
        info.titleid = titleid || 0;
        $('#tabnav>ul').html(template('navTpl', info));
       setWidth();
        var boxWidth = $('#tabnav').width();
        myscroll = new IScroll("#tabnav", {
          scrollX: true,
          scrollY: false
        });
      }
    });
  }
  function setWidth(){
    var width = 0;
    $('#tabnav>ul>li').each(function( i , v){
      width += v.offsetWidth;
    });
    $('#tabnav>ul').css('width',width);
  }
  $(window).resize(function(){
    setWidth();
  });
  
 
  
  
  // 给tab导航中的a注册点击事件
  $('#tabnav').on('click', 'a', function(){
    $(this).toggleClass('active');
    $(this).parents('li').siblings().children('a').removeClass('active');
    titleid = $(this).data('id');
    myscroll.scrollToElement(this);
    renderProduct(titleid);
    return false;
  });
  renderProduct(titleid);

  function renderProduct(titleid){
    $.ajax({
      type: 'get',
      url:'http://127.0.0.1:9090/api/getbaicaijiaproduct',
      data: {
        titleid : +titleid || 0
      },
      dataType: 'json',
      success: function(info){
        console.log(info);
        $('.bc-list>ul').html(template('productTpl', info));
        
      }
    });
  }

  
});