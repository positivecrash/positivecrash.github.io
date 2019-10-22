function Tabs() {
  var bindAll = function() {
    var menuElements = document.querySelectorAll('[data-tab]');
    console.log(menuElements.length);
    for(var i = 0; i < menuElements.length ; i++) {
      menuElements[i].addEventListener('click', change, false);
    }
  }

  var clear = function() {
    var menuElements = document.querySelectorAll('[data-tab]');
    for(var i = 0; i < menuElements.length ; i++) {
      menuElements[i].classList.remove('active');
      var id = menuElements[i].getAttribute('data-tab');
      document.getElementById(id).classList.remove('active');
    }
  }

  var change = function(e) {
    clear();
    e.target.classList.add('active');
    var id = e.currentTarget.getAttribute('data-tab');
    document.getElementById(id).classList.add('active');
  }

  bindAll();
}

window.addEventListener('load', function(){
  var connectTabs = new Tabs();
}, false);