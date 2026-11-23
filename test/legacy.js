import assert from "node:assert";
import { afterEach, beforeEach, describe, it } from "node:test";
import { EventEmitter } from "node:events";

import sparkles, { exists } from "../legacy.js";

describe("legacy: sparkles()", function () {
  describe("behavior on global", function () {
    var ee;
    var storeNamespace = "store@sparkles";
    var defaultNamespace = "default";

    beforeEach(function () {
      ee = sparkles();
    });

    afterEach(function () {
      ee.remove();
    });

    it("will attach the sparkles store namespace to global", function () {
      assert.ok(global[storeNamespace]);
    });

    it("will attach an event emitter to the sparkles store default namespace", function () {
      assert.ok(
        global[storeNamespace][defaultNamespace] instanceof EventEmitter,
      );
    });

    it("removes the event emitter from the store when remove is called", function () {
      ee.on("test", function () {});
      ee.remove();
      assert.strictEqual(global[storeNamespace][defaultNamespace], undefined);
    });

    it("does not show up when enumerating the global object", function () {
      assert.strictEqual(Object.keys(global).includes(storeNamespace), false);
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
});

describe("legacy: exists()", function () {
  it("checks if a namespace has been defined", function () {
    assert.strictEqual(exists("test"), false);
    var ee = sparkles("test");
    assert.strictEqual(exists("test"), true);
    ee.remove();
    assert.strictEqual(exists("test"), false);
  });
});

describe("legacy: namespace", function () {
  var storeNamespace = "store@sparkles";
  var defaultNamespace = "default";

  beforeEach(function () {
    global[storeNamespace] = {};
  });

  afterEach(function () {
    delete global[storeNamespace][defaultNamespace];
    delete global[storeNamespace].customNamespace;
  });

  it("should use an EE from sparkles namespace if it already exists", async () => {
    var ee = (global[storeNamespace][defaultNamespace] = new EventEmitter());
    ee.custom = "ee";

    var { default: sparkles } = await import("../legacy.js");
    var ee2 = sparkles();

    assert.strictEqual(ee2.custom, "ee");
  });

  it("should allow custom namespaces", async () => {
    var ee = (global[storeNamespace].customNamespace = new EventEmitter());
    ee.custom = true;

    var { default: sparkles } = await import("../legacy.js");
    var ee2 = sparkles("customNamespace");

    assert.strictEqual(ee2.custom, true);
  });
});
