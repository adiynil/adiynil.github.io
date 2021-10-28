$(function() {
  const secondary = $('#secondary');
  const button = $('.site-branding').find('.secondary-toggle')[0];
  // Enable menu toggle for small screens.
  (function() {
    if (!secondary || !button) {
      return;
    }
    button.addEventListener('click', function() {
      secondary.toggleClass('toggled-on');
      secondary.trigger('resize');
      $(this).toggleClass('toggled-on');
      if ($(this, secondary).hasClass('toggled-on')) {
        $(this).attr('aria-expanded', 'true');
        secondary.attr('aria-expanded', 'true');
      } else {
        $(this).attr('aria-expanded', 'false');
        secondary.attr('aria-expanded', 'false');
      }
    });
  })();
  const backTop = $('#back-top')[0];
  (() => {
    if (!backTop) return;
    const scrollTopSmooth = function(position) {
      if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(cb) {
          return setTimeout(cb, 10);
        };
      }
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      var step = function() {
        var distance = position - scrollTop;
        scrollTop = scrollTop + distance / 5;
        if (Math.abs(distance) < 1) {
          window.scrollTo(0, position);
        } else {
          window.scrollTo(0, scrollTop);
          requestAnimationFrame(step);
        }
      };
      step();
    }
    backTop.addEventListener('click', () => {
      scrollTopSmooth(0);
    })
  })();
})