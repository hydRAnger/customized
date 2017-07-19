$(function() {
  $('.banner').show().unslider({
    infinite: true,
    autoplay: true,
    arrows: false,
    dots: true
  }).on('unslider.change', function(e, i, slide) {
    const title = $(slide).children('li > a').attr('title');
    $('#banner-title').text(title);
  });

});