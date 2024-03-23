'use strict';

var expect = require('expect');
var EventEmitter = require('events').EventEmitter;

var sparkles = require('../legacy.js');

describe('legacy: sparkles()', function () {
  describe('behavior on global', function () {
    var ee;
    var storeNamespace = 'store@sparkles';
    var defaultNamespace = 'default';

    beforeEach(function (done) {
      ee = sparkles();
      done();
    });

    afterEach(function (done) {
      ee.remove();
      done();
    });

    it('will attach the sparkles store namespace to global', function (done) {
      expect(global[storeNamespace]).toBeTruthy();
      done();
    });

    it('will attach an event emitter to the sparkles store default namespace', function (done) {
      expect(global[storeNamespace][defaultNamespace]).toBeInstanceOf(EventEmitter);
      done();
    });

    it('removes the event emitter from the store when remove is called', function (done) {
      ee.on('test', function () {});
      ee.remove();
      expect(global[storeNamespace][defaultNamespace]).toBeUndefined();
      done();
    });

    it('does not show up when enumerating the global object', function (done) {
      expect(Object.keys(global)).not.toContain(storeNamespace);
      done();
    });
  });

  it('should get the default emitter if namespace is not specified', function (done) {
    var ee = sparkles();
    expect(ee).toBeInstanceOf(EventEmitter);

    expect(sparkles()).toBe(ee);
    done();
  });

  it('should get an emitter for a specified namespace', function (done) {
    var ee = sparkles('ns1');
    expect(ee).toBeInstanceOf(EventEmitter);

    expect(sparkles()).not.toBe(ee);
    expect(sparkles('ns1')).toBe(ee);
    expect(sparkles('ns2')).not.toBe(ee);
    done();
  });

  it('should remove and re-create emitter in the store', function (done) {
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

describe('legacy: sparkles.exists()', function () {
  it('checks if a namespace has been defined', function (done) {
    expect(sparkles.exists('test')).toBe(false);
    var ee = sparkles('test');
    expect(sparkles.exists('test')).toBe(true);
    ee.remove();
    expect(sparkles.exists('test')).toBe(false);
    done();
  });
});

describe('legacy: namespace', function () {
  var storeNamespace = Symbol.for('sparkles:store');
  var defaultNamespace = Symbol.for('sparkles:namespace');

  beforeEach(function (done) {
    global[storeNamespace] = {};
    done();
  });

  afterEach(function (done) {
    delete global[storeNamespace];
    done();
  });

  it('should use an EE from sparkles namespace if it already exists', function (done) {
    var ee = (global[storeNamespace][defaultNamespace] = new EventEmitter());
    ee.custom = 'ee';

    var sparkles = require('../')();

    expect(sparkles.custom).toEqual('ee');
    done();
  });

  it('should allow custom namespaces', function (done) {
    var ee = (global[storeNamespace].customNamespace = new EventEmitter());
    ee.custom = true;

    var sparkles = require('../')('customNamespace');

    expect(sparkles.custom).toEqual(true);
    done();
  });
});
