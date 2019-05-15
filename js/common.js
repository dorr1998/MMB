// 添加媒体查询
responsive();
function responsive(){
  var design = 750;
  var base = 100;
  var pageWidth= window.innerWidth;
  if(pageWidth > 750){
    pageWidth = 750;
  }
  if(pageWidth < 320){
    pageWidth = 320;
  }
  var size = pageWidth / design * base;
  // console.log(size);
  document.documentElement.style.fontSize = size + 'px';
}
window.addEventListener('resize', responsive);

// 获取地址栏参数
function getSearch(name){
  var search = decodeURI(location.search);
  search = search.slice(1);
  var arr = search.split('&');
  var obj = {};
  arr.forEach(function(v , i){
    obj[v.split('=')[0]] = v.split('=')[1];
  });
  return obj[name];
}
var categoryid = +getSearch('categoryid');
  $('#category').html(getSearch('category'));

