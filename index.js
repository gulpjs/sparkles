'use strict';

var EventEmitter = require('events').EventEmitter;

var sparklesNamespace = 'store@sparkles';
var defaultNamespace = 'default';

function getEmitter(namespace){

  var store = global[sparklesNamespace];

  if(!store){
    store = global[sparklesNamespace] = {};
  }

  namespace = namespace || defaultNamespace;

  var ee = store[namespace];

  if(!ee){
    ee = store[namespace] = new EventEmitter();
    ee.setMaxListeners(0);
    ee.remove = function remove(){
      ee.removeAllListeners();
      delete store[namespace];
    };
  }

  return ee;


}

module.exports = getEmitter;
