'use strict';

var EventEmitter = require('events').EventEmitter;

var namespace = '__sparklesEventEmitter';

var ee = new EventEmitter();

ee.setMaxListeners(0);

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

  if(events.length > 2){
    return;
  }

  if(removeListeners.length !== 1){
    return;
  }

  if(newListeners.length !== 1 && events.length !== 1){
    return;
  }

  delete global[namespace];

  process.nextTick(rewire);
}

function rewire(){
  var removeListeners = ee.listeners('removeListener');
  var newListeners = ee.listeners('newListener');

  if(!removeListeners.length){
    ee.on('removeListener', detach);
  }

  if(!newListeners.length){
    ee.on('newListener', attach);
  }
}

rewire();

module.exports = ee;
