var page = {
  properties : {},
  setup_gamepage : function(t){
    var title = document.createElement('h3');
    title.id = 'title';
    title.innerHTML = page.properties.title;
    document.body.appendChild(title);
  }
}
