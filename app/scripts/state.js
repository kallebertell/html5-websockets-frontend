var state = (function() {
  'use strict';

  var name = "Shooter " + Math.floor(Math.random() * 1000);

  var state = {
    myName: name,

    players: {
    },

    updateState: function(playerState) {
      state.players[playerState.name] = playerState;

      if (state.onUpdate) {
        state.onUpdate();
      }
    }
  };

  state.players[name] = {
    name: name,
    lastEvent: 'NONE',
    ducksHit: 0,
    shotsFired: 0
  };

  return state;
})();
