$(function(){


  // 菜单部分渲染
  $.get('http://127.0.0.1:9090/api/getindexmenu',function(data){
    console.log(data);
    var html ='';
    var result = data.result;
    result.forEach(function( v , i){
      html += `<div class="menu-item `+ (i >= 8?'hide' : '') +`">
                <a href="`+v.titlehref+`">
                  `+v.img+`
                  <p>`+ v.name +`</p>
                </a>
              </div>`
    });
    $('#menu').html(html);
  });

  // 点击更多功能显示下方菜单
  $('#menu').on('click', '.menu-item:nth-child(8)',function(){
    console.log('haha');
    $('#menu .menu-item:nth-last-child(-n+4)').toggleClass('hide');
  });

  $.get('http://127.0.0.1:9090/api/getmoneyctrl',function(data){
    console.log(data);
    $('.recommenContent .content').html(template('moneyTpl', data));
  });





});