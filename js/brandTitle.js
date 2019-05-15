$(function(){

// 渲染列表
$.ajax({
  type: 'get',
  url: 'http://127.0.0.1:9090/api/getbrandtitle',
  dataType: 'json',
  success:function(info){
    console.log(info);
    var result  = info.result;
    var htmlStr = `<ul>`;
    result.forEach(function( v , i){
      htmlStr += `<li>
        <a href="brand.html?brandtitleid=`+v.brandTitleId+`" data-title-id="`+v.brandTitleId+`">`+ v.brandTitle +`</a>
      </li>`
    });              
    htmlStr += `</ul>`;
    $('#brand').html(htmlStr);
  }
})



});