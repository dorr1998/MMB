$(function(){
  var pageid = 0;
  render();
  function render(){
    $.ajax({
      type: 'get',
      url: 'http://127.0.0.1:9090/api/getmoneyctrl',
      data: {
        pageid: pageid
      },
      dataType: 'json',
      success: function(info){
        $('.content').html(template('moneyTpl', info));
        totalPage  = Math.ceil(info.totalCount / info.pagesize);
        var arrUrl = location.href.split('/');
        var url = arrUrl[arrUrl.length-1];
        $('.w33>a').attr('href',url);
        $('.w33>a').attr('totalPage',totalPage);
        var htmlStr = '';
        for( var i = 0 ; i< totalPage ; i++){
          htmlStr += '<option '+ (i == pageid ? 'selected':'') +' value='+ i +'>' + ( i+1 ) + '/'+ totalPage+'</option>';
        }
        $('.w33>select').html(htmlStr);
      }
    });
  }
  


  $('.page').on('click', 'a', function(){
    if($(this).text().trim() === '上一页'){
      pageid--;
    }else{
      pageid++;
    }
    if(pageid < 0){
      pageid = 0;
      return false;
    }
    if(pageid > totalPage - 1 ){
      pageid = totalPage - 1 ;
      return false;
    }
    $('option').eq(pageid).prop('selected',true).siblings().prop('selected',false);
    render();
    return false;
  });
  $('select').on('change', function(){
    pageid = $('option:selected').val();
    console.log(pageid);
    render();
  });
});