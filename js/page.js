var page = {
  properties : {},
  setup_gamepage : function(){
    var title = document.createElement('h3');
    title.id = 'title';
    title.innerHTML = page.properties.title;
    document.body.appendChild(title);
    document.getElementsByTagName('title')[0].innerHTML = page.properties.title;
  }
}
