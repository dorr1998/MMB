$(function(){


  
  var pageid = +getSearch('pageid');
  console.log(pageid);
  render();
  function render(){
    $.ajax({
      type: 'get',
      url: 'http://127.0.0.1:9090/api/getproductlist',
      data: { 
        categoryid: categoryid,
        pageid: pageid
      },
      dataType: 'json',
      success: function(info){
        $('#product').html(template('productTpl', info));
        localStorage.setItem('category',getSearch('category'));
        totalPage  = Math.ceil(info.totalCount / info.pagesize);
        var arrUrl = location.href.split('/');
        var url = arrUrl[arrUrl.length-1];
        $('.w33>a').attr('href',url);
        $('.w33>a').attr('totalPage',totalPage);
        var htmlStr = '';
        for( var i = 0 ; i< totalPage; i++){
          htmlStr += '<option '+ (i === pageid-1? 'selected':'') +' value='+(i + 1)+'>' + ( i+1 ) + '/'+ totalPage+'</option>';
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
    if(pageid < 1){
      pageid = 1;
      return false;
    }
    if(pageid > totalPage){
      pageid = totalPage;
      return false;
    }
    $('option').eq(pageid-1).prop('selected',true).siblings().prop('selected',false);
    
    render();
    return false;
  });
  $('select').on('change', function(){
    pageid = $('option:selected').val();
    render();
  });
  

});