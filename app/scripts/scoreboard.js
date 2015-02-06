var scoreboard = (function(state) {
    'use strict';

    var el = document.getElementById('scoreboard-container');

    state.addUpdateListener(renderScoreboard);

    function renderScoreboard(state) {
      if (!el) {
        console.log('Scoreboard hasn\'t been assigned to a dom element');
        return;
      }

      var playerArr = _.values(state.players);

      var html = '<ul class=scoreboard>';

      playerArr.forEach(function(playerState) {
        html += '<li>' + playerState.name + ' ' + playerState.ducksHit + '/' + playerState.shotsFired + '</li>';
      });


      html += '</ul>';

      el.innerHTML = html;
    };

    renderScoreboard(state);

})(state);
