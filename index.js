import { EventEmitter } from "events";


var sparklesNamespace = Symbol.for("sparkles:store");
var defaultNamespace = Symbol.for("sparkles:namespace");

function getStore() {
  var store = global[sparklesNamespace];

  if (!store) {
    store = global[sparklesNamespace] = {};
  }

  return store;
}

export default function getEmitter(namespace) {
  var store = getStore();

  namespace = namespace || defaultNamespace;

  var ee = store[namespace];

  if (!ee) {
    ee = store[namespace] = new EventEmitter();
    ee.setMaxListeners(0);
    ee.remove = function remove() {
      ee.removeAllListeners();
      delete store[namespace];
    };
  }

  return ee;
}

export function exists(namespace) {
  var store = getStore();

  return !!store[namespace];
}
