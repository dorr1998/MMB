$(function(){

  $.get('http://127.0.0.1:9090/api/getcategorytitle',function(data){
    console.log(data);
    var result = data.result;
    var htmlStr = `<ul class="category-title">`;
    result.forEach(function( v , i ){
      htmlStr += `<li>
                    <a href="javascript:;" data-title-id=`+v.titleId+`>`+ v.title +`</a>
                  </li>`;

    });            
    htmlStr += `</ul>`;
    $('#category').html(htmlStr);
  });

  $('#category').on('click' , '.category-title>li>a', function(){
    if(!$(this).hasClass('current')){
      $(this).addClass('current');
      var that = this;
      var obj = this.dataset;
      var id = +obj.titleId;
      var htmlStr = `<ul class="category-content clearfix">`;
      $.ajax({
        type: 'get',
        url: 'http://127.0.0.1:9090/api/getcategory',
        data: {
          titleid: id
        },
        dataType: 'json',
        success: function(info){
          var result= info.result;
          console.log(result);
          result.forEach(function( v , i){
            htmlStr += `<li>
              <a href="productlist.html?categoryid=`+v.categoryId+`&category=`+v.category+`&pageid=1" data-category-id="`+v.categoryId+`">`+ v.category +`</a>
            </li>`
          });              
          htmlStr += `</ul>`;
          $(that).parent().append(htmlStr);
        }
      });
    }else{
      $(this).siblings('.category-content').toggleClass('hide');
    }
    
   
  });


});