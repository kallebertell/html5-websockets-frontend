/* jshint devel:true */

var duckService = (function(state) {
    var socket = new WebSocket('ws://localhost:8080/', 'echo-protocol');
    var id = -1;

    socket.onopen = function(event) {
        console.log('Server connection open.');
    };

    socket.onmessage = function(msg) {
        console.log(msg);

        var message = JSON.parse(msg.data);

        if ('identifier' === message.type) {
            id = message.data;
        }

        if ('message' === message.type) {
          var opponentState = message.data;

          if (opponentState) {
            state.updateState(JSON.parse(opponentState));
          }
        }

    }

    socket.onclose = function() {
        console.log('Server connection closed.');
        socket = undefined;
    }

    socket.onerror = function() {
        console.log('Server connection failure.');
        socket = undefined;
    }

    /**

     {
        name: 'Judge Dredd',
        lastEvent: 'DUCK_HIT',          // DUCK_HIT or DUCK_MISSED
        shotsFired: 12,
        ducksHit: 4
     }

     */
    return {
      send: function(message) {
        if (socket != null) {
            socket.send(JSON.stringify(message));
        }
      }
    };

})(state);
