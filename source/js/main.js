$('a').click(function(){
    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 500);
    return false;
});

var $btn = $("#menu"),
    $change = $btn.children('div'),
    $menu = $("#mob-nav");

$btn.on('click', function(e) {
  e.preventDefault();
  $change.toggleClass('change');
  console.log($menu);
  $menu.toggleClass('show');
});
