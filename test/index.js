"use strict";

var assert = require("node:assert");
var { afterEach, beforeEach, describe, it } = require("node:test");
var { EventEmitter } = require("node:events");

var sparkles = require("../");

describe("sparkles()", function () {
  describe("behavior on global", function () {
    var ee;
    var storeSymbol = Symbol.for("sparkles:store");
    var namespaceSymbol = Symbol.for("sparkles:namespace");

    beforeEach(function () {
      ee = sparkles();
    });

    afterEach(function () {
      ee.remove();
    });

    it("will attach the sparkles store namespace to global", function () {
      assert.ok(global[storeSymbol]);
    });

    it("will attach an event emitter to the sparkles store default namespace", function () {
      assert.ok(global[storeSymbol][namespaceSymbol] instanceof EventEmitter);
    });

    it("removes the event emitter from the store when remove is called", function () {
      ee.on("test", function () {});
      ee.remove();
      assert.notStrictEqual(global[storeSymbol][namespaceSymbol], undefined);
    });

    it("does not show up when enumerating the global object", function () {
assert.strictEqual(Object.keys(global).includes(storeSymbol), false);
    });
  });

  it("should get the default emitter if namespace is not specified", function () {
    var ee = sparkles();
    assert.ok(ee instanceof EventEmitter);
    assert.strictEqual(sparkles(), ee);
  });

  it("should get an emitter for a specified namespace", function () {
    var ee = sparkles("ns1");
    assert.ok(ee instanceof EventEmitter);

    assert.notStrictEqual(sparkles(), ee);

    assert.strictEqual(sparkles("ns1"), ee);
    assert.notStrictEqual(sparkles("ns2"), ee);
  });

  it("should remove and re-create emitter in the store", function () {
    var ee0 = sparkles();
    var ee1 = sparkles("ns1");

    ee0.remove();
    assert.notStrictEqual(sparkles(), ee0);
    assert.strictEqual(sparkles("ns1"), ee1);

    ee1.remove();
    assert.notStrictEqual(sparkles("ns1"), ee1);
  });

  describe("sparkles.exists()", function () {
    it("checks if a namespace has been defined", function () {
      assert.ok(!sparkles.exists("test"));
      var ee = sparkles("test");
      assert.ok(sparkles.exists("test"));
      ee.remove();
      assert.ok(!sparkles.exists("test"));
    });
  });

  describe("namespace", function () {
    var storeSymbol = Symbol.for("sparkles:store");
    var namespaceSymbol = Symbol.for("sparkles:namespace");

    beforeEach(function () {
      global[storeSymbol] = {};
    });

    afterEach(function () {
      delete global[storeSymbol];
    });

    it("should use an EE from sparkles namespace if it already exists", function () {
      var ee = (global[storeSymbol][namespaceSymbol] = new EventEmitter());
      ee.custom = "ee";

      var sparkles = require("../")();

      assert.strictEqual(sparkles.custom, "ee");
    });

    it("should allow custom namespaces", function () {
      var ee = (global[storeSymbol].customNamespace = new EventEmitter());
      ee.custom = true;

      var sparkles = require("../")("customNamespace");

      assert.ok(sparkles.custom);
    });
  });
});
