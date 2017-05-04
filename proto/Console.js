function Console(){
  
  this.comment_count = 0;
  
  this.createConsole = function (){
    var contit = document.createElement('div');
    contit.id = 'console-title';
    document.body.appendChild(contit);
    contit.innerHTML = "Console:";
    var win = document.createElement('div');
    document.body.appendChild(win);
    win.id = 'window';
    var con = document.createElement('div');
    document.getElementById('window').appendChild(con);
    con.id = 'console';
    //create console 'clear output' button
    var btn = document.createElement('button');
    btn.id = 'console-clear-output-button';
    document.body.appendChild(btn);
    btn.innerHTML = 'clear output';
    btn.addEventListener('click', clearConsoleOutput);
  }

  this.comment = function (msg){
    var comment = document.createElement('div');
    comment.id = 'comment_'+comment_count;
    document.getElementById('console').appendChild(comment);
    comment.innerHTML = msg;
    comment.classList.add('comment');
    comment_count++;
  }
  
  this.clearConsoleOutput = function (){
    for(var i = 0; i < comment_count; i++){
      document.getElementById('console').removeChild(document.getElementById('comment_'+i));
    }
    comment_count = 0;
  }
  
  this.createConsole();
  
}
