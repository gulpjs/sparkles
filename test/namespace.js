'use strict';

var expect = require('expect');

var EventEmitter = require('events').EventEmitter;

describe('namespaces', function () {
  var storeSymbol = Symbol.for('sparkles:store');
  var namespaceSymbol = Symbol.for('sparkles:namespace');

  beforeEach(function (done) {
    global[storeSymbol] = {};
    done();
  });

  afterEach(function (done) {
    delete global[storeSymbol];
    done();
  });

  it('should use an EE from sparkles namespace if it already exists', function (done) {
    var ee = (global[storeSymbol][namespaceSymbol] = new EventEmitter());
    ee.custom = 'ee';

    var sparkles = require('../')();

    expect(sparkles.custom).toEqual('ee');
    done();
  });

  it('should allow custom namespaces', function (done) {
    var ee = (global[storeSymbol].customNamespace = new EventEmitter());
    ee.custom = true;

    var sparkles = require('../')('customNamespace');

    expect(sparkles.custom).toEqual(true);
    done();
  });
});
