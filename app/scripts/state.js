var state = (function() {
  'use strict';

  var name = "Shooter " + Math.floor(Math.random() * 1000);
  var updateListeners = [];

  var state = {
    myName: name,

    players: {
    },

    updateState: function(playerState) {
      state.players[playerState.name] = playerState;

      updateListeners.forEach(function(listenerFn) {
        listenerFn(state);
      });
    },

    addUpdateListener: function(listenerFn) {
      updateListeners.push(listenerFn);
    }
  };

  state.players[name] = {
    name: name,
    lastEvent: 'NONE',
    ducksHit: 0,
    shotsFired: 0
  };

  state.getMyState = function() {
    return state.players[name];
  };

  return state;
})();
