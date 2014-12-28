'use strict';

var EventEmitter = require('events').EventEmitter;

var defaultNamespace = '__sparklesEventEmitter';

function getEmitter(namespace){

  namespace = namespace || defaultNamespace;

  var ee;

  if(global[namespace]){
    ee = global[namespace];
  } else {
    ee = new EventEmitter();

    ee.setMaxListeners(0);
  }

  function attach(type, listener){
    // node will never fire the newListener on itself,
    // so only check for remove/detach combo
    if(type === 'removeListener' && listener === detach){
      return;
    }

    if(!global[namespace]){
      global[namespace] = ee;
    }
  }

  function detach(){
    var events = Object.keys(ee._events);
    var removeListeners = ee.listeners('removeListener');
    var newListeners = ee.listeners('newListener');

    // exit if we have events other than
    // `removeListener` and `newListener`
    if(events.length > 2){
      return;
    }

    // exit if someone attached another
    // listener to `removeListener`
    if(removeListeners.length > 1){
      return;
    }

    // exit if someone attached another
    // listener to `newListener`
    if(newListeners.length > 1){
      return;
    }

    delete global[namespace];
  }

  function rewire(){
    var removeListeners = ee.listeners('removeListener');
    var newListeners = ee.listeners('newListener');

    // if we know our `removeListener` isn't
    // attached, we add it
    if(!removeListeners.length){
      ee.on('removeListener', detach);
    }

    // if we know our `newListener` isn't
    // attached, we add it
    if(!newListeners.length){
      ee.on('newListener', attach);
    }
  }

  rewire();

  return ee;
}

module.exports = getEmitter;
