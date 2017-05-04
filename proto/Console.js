function Console(props){
  
  this.comment_count = 0;
  
  this.createConsole = function (){
    var conwin = document.getElementById('console-window');
    var contit = document.createElement('div');
    contit.id = 'console-title';
    contit.innerHTML = "Console:";
    conwin.appendChild(contit);
    var win = document.createElement('div');
    conwin.appendChild(win);
    win.id = 'window';
    win.style.height = props.h/4 + 'px';
    var con = document.createElement('div');
    document.getElementById('window').appendChild(con);
    con.id = 'console';
    //create console 'clear output' button
    var btn = document.createElement('button');
    btn.id = 'console-clear-output-button';
    document.body.appendChild(btn);
    btn.innerHTML = 'clear output';
    btn.addEventListener('click', this.clearConsoleOutput);
  }
  
  this.comment = function (msg){
    var comment = document.createElement('div');
    comment.id = 'comment_'+this.comment_count;
    document.getElementById('console').appendChild(comment);
    comment.innerHTML = msg;
    comment.classList.add('comment');
    this.comment_count++;
  }
  
  this.clearConsoleOutput = function (){
    for(var i = 0; i < comment_count; i++){
      document.getElementById('console').removeChild(document.getElementById('comment_'+i));
    }
    comment_count = 0;
  }
  
  this.createConsole();
  
}
