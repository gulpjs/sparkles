'use strict';

var expect = require('expect');

var EventEmitter = require('events').EventEmitter;

describe('namespace', function() {

  beforeEach(function(done) {
    global['store@sparkles'] = {};
    done();
  });

  afterEach(function(done) {
    delete global['store@sparkles'];
    done();
  });

  it('should use an EE from sparkles namespace if it already exists', function(done) {
    var ee = global['store@sparkles'].default = new EventEmitter();
    ee.custom = 'ee';

    var sparkles = require('../')();

    expect(sparkles.custom).toEqual('ee');
    done();
  });

  it('should allow custom namespaces', function(done) {
    var ee = global['store@sparkles'].customNamespace = new EventEmitter();
    ee.custom = true;

    var sparkles = require('../')('customNamespace');

    expect(sparkles.custom).toEqual(true);
    done();
  });
});
