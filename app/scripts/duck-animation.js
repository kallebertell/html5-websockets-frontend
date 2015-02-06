(function() {
  'use strict';

  var duck = document.getElementById('duck');

  var nowX;
  var nowY;
  var rad = 0;
  var opa = 0;
  var height = window.innerHeight;
  var width = window.innerWidth;

  function ran(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function set(k, v) {
    return duck.setAttribute('data-' + k, v);
  }

  function get(k) {
    return Number(duck.getAttribute('data-' + k) || 0);
  }

  set('cx', 0);
  set('cy', 0);

  function move() {
    // Reset when time is at zero
    if (!get('time')) {
      set('time', ran(30, 100));
      set('deg', ran(-179, 180));
      set('vel', ran(1, 15));
      set('curve', ran(0, 1));
      set('fade', ran(0, 1));
      set('grow', ran(-2, 2));
    }

    // Get position
    nowX = get('cx');
    nowY = get('cy');
    // Calc movement
    set('dx', get('vel') * Math.cos(get('deg') * Math.PI / 180));
    set('dy', get('vel') * Math.sin(get('deg') * Math.PI / 180));
    // Calc new position
    nowX += get('dx');
    nowY += get('dy');
    if (nowX < 0) {
      nowX = width + nowX;
    } else {
      nowX = nowX % width;
    }
    if (nowY < 0) {
      nowY = height + nowY;
    } else {
      nowY = nowY % height;
    }


    // Render moved particle
    set('cx', nowX);
    set('cy', nowY);

    duck.style['-webkit-transform'] = duck.style.transform = 'translateX(' + nowX + 'px) translateY(' + nowY + 'px)';

    // Calc growth
    rad = get('r');
    if (get('grow') > 0) {
      set('r', Math.min(30, rad + .1));
    } else {
      set('r', Math.max(10, rad - .1));
    }

    // Calc curve
    if (get('curve') > 0) {
      set('deg', (get('deg') + 2) % 360);
    } else {
      set('deg', (get('deg') - 2) % 360);
    }

    // Calc opacity
    opa = get('fill-opacity');
    if (get('fade') > 0) {
      duck.style.opaciy = Math.max(.3, opa - .01);
    } else {
      duck.style.opaciy = Math.max(.3, opa + .01);
    }

    set('fill-opacity', opa);

    // Progress timer for particle
    set('time', get('time') - 1);

    // Calc damping
    if (get('vel') < 1) {
      set('time', 0);
    } else {
      set('vel', get('vel') - .05);
    }
  }

  function paint(fn) {
    fn();
    window.requestAnimationFrame(paint.bind(window, fn));
  }

  paint(move);
}());
