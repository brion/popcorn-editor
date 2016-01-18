define([],
function() {
  var listeners = {};

  window.addEventListener('message', function (e) {
  	// QUICK HACK: removing this since wikimedia will want to host editor
  	// on separate domain for security separation.
  	//
    //if (e.origin !== window.location.origin)
    //  return;

    for (key in listeners) {
      if (e.data.type === key) {
        listeners[key].forEach(function (handler) {
          handler(e.data.data);
        });
      }
    }
  });

  return {
    save: function (data) {
      var message = {
        data: data,
        type: 'save'
      };
      // posts message to outside of the iframe
      parent.postMessage(message, '*'/*window.location.origin*/);
    },
    loaded: function() {
      var message = {
        type: 'loaded'
      };
      // posts message to outside of the iframe
      parent.postMessage(message, '*'/*window.location.origin*/);
    },
    listen: function (eventName, handler) {
      if (listeners[eventName] === undefined) {
        listeners[eventName] = [handler];
      } else {
        listeners[eventName].push(handler);
      }
    }
  }
});

