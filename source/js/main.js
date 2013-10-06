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

function showRecaptcha(element) {
     Recaptcha.create("MyPublicKey", element, {
       theme: "red",
       callback: Recaptcha.focus_response_field});
   }
   $(document).ready(function(){
  showRecaptcha('recaptcha_div');
  
  $("#form").submit(function(ev){
      ev.preventDefault();
      if (!$(this).valid()) return;
      $.ajax({
        type: "post",
        url: "/send",
        data: $('#form').serialize(),
        dataType: "json",
        success: function(response) {
    if(response.message === "success") {
      $.ajax({
          type: "post",
          url: "/send_email",
          data: $('#form').serialize(),
          dataType: "json",
          success: function(response) {
        $('#form').html("<div id='message'></div>");
        if(response.message === "success") {
            $('#message').html("<h2>Message successfully sent.</h2>").hide().fadeIn(1500);
        } else {
            $('#message').html("<h2>Error sending the message</h2>").hide().fadeIn(1500);
        }
          },
          error: function(xhr, ajaxOptions, thrownError){
        $('#form').html("<div id='message'></div>");
        $('#message').html("<h2>Error sending the message</h2>").hide().fadeIn(1500);
          }
      });
    } else {
      showRecaptcha('recaptcha_div');
      $('#notice').html("Captcha failed!").hide().fadeIn(1500);
    }
        },
        error: function(xhr, ajaxOptions, thrownError){
      $('#form').html("<div id='message'></div>");
      $('#message').html("<h2>Error sending the message</h2>").hide().fadeIn(1500);
        }
      });
  });
});