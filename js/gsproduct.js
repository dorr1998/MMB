$(function(){
  var shop = '0';
  var area = '0';
  localStorage.setItem('shopid', shop);
  localStorage.setItem('areaid', area);

  listTitleClick();
  function listTitleClick(){
    // 分别给下拉列表标题注册点击事件
  $('.filter>ul>li>a').click(function(){
    if(!$(this).hasClass('current')){
      $(this).parent().addClass('current').siblings().removeClass('current');
      if($(this).hasClass('shop')){
        renderList('http://127.0.0.1:9090/api/getgsshop','.popsort', 'slistTpl');
        $('.popsort').toggleClass('hide').siblings('.pop-box').addClass('hide');
      }
      if($(this).hasClass('area')){
        renderList('http://127.0.0.1:9090/api/getgsshoparea', '.poparea','alistTpl');
        $('.poparea').toggleClass('hide').siblings('.pop-box').addClass('hide');
      }
      if($(this).hasClass('price')){
        $('.popprice').toggleClass('hide').siblings('.pop-box').addClass('hide');
      }
    }else{
      if($(this).hasClass('shop')){
       $('.popsort').toggleClass('hide').siblings('.pop-box').addClass('hide');
      }
      if($(this).hasClass('area')){
        $('.poparea').toggleClass('hide').siblings('.pop-box').addClass('.hide');
      }
      if($(this).hasClass('price')){
        $('.popprice').toggleClass('hide').siblings('.pop-box').addClass('.hide');
      } 
    }
    
  });
  }

  

  // 下拉列表内容注册事件
  $('.pop-box').on('click','a',function(){
    $(this).addClass('active').parent('li').siblings().find('a').removeClass('active');

    console.log($(this).parents('.pop-box').hasClass('popsort'));
    if($(this).parents('.pop-box').hasClass('popsort')){
      $('.shop').html($(this).text()+ '<i></i>');
    }
    if($(this).parents('.pop-box').hasClass('poparea')){
      $('.area').html($(this).text().split('（')[0] + '<i></i>');
    }
    $(this).parent('.pop-box').addClass('hide');
    console.log($(this).data());
    var data = $(this).data();
    for( var key in data){
      localStorage.setItem(key , data[key]);
    }
    renderContent();
    
  })


  // 渲染头部下拉列表
  function renderList(url,target,tempId){
    $.ajax({
      type: 'get',
      url: url ,
      dataType: 'json',
      success: function( info ){
        console.log( info);
        $(target).html(template(tempId, info));
      }
    })
  }


  renderContent();
  function renderContent(){
    $.ajax({
      type: 'get',
      url: 'http://127.0.0.1:9090/api/getgsproduct',
      data:{
        shopid : localStorage.getItem('shopid'),
        areaid : localStorage.getItem('areaid')
      },
      dataType: 'json',
      success: function(info){
        console.log(info);
        $('.content').html(template('contentTpl', info));
      }
    })
  }


});