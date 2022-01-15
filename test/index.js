'use strict';

var expect = require('expect');
var EventEmitter = require('events').EventEmitter;

var sparkles = require('../');

describe('sparkles()', function() {

  it('should get the default emitter if namespace is not specified', function(done) {
    var ee = sparkles();
    expect(ee).toBeInstanceOf(EventEmitter);

    expect(sparkles()).toBe(ee);
    done();
  });

  it('should get an emitter for a specified namespace', function(done) {
    var ee = sparkles('ns1');
    expect(ee).toBeInstanceOf(EventEmitter);

    expect(sparkles()).not.toBe(ee);
    expect(sparkles('ns1')).toBe(ee);
    expect(sparkles('ns2')).not.toBe(ee);
    done();
  });

  it('should remove and re-create emitter in the store', function(done) {
    var ee0 = sparkles();
    var ee1 = sparkles('ns1');

    ee0.remove();
    expect(sparkles()).not.toBe(ee0);
    expect(sparkles('ns1')).toBe(ee1);

    ee1.remove();
    expect(sparkles('ns1')).not.toBe(ee1);
    done();
  });
});
