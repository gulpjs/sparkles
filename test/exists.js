'use strict';

var lab = exports.lab = require('lab').script();
var describe = lab.describe;
var it = lab.it;
var before = lab.before;
var beforeEach = lab.beforeEach;
var after = lab.after;
var afterEach = lab.afterEach;
var expect = require('code').expect;

var EventEmitter = require('events').EventEmitter;

describe('namespace', function(){

  it('should use an EE from sparkles namespace if it already exists', function(done){
    var ee = global.__sparklesEventEmitter = new EventEmitter();
    ee.custom = 'ee';

    var sparkles = require('../')();

    expect(sparkles.custom).to.equal('ee');
    sparkles.removeAllListeners();
    expect(global.__sparklesEventEmitter).to.not.exist();
    done();
  });

  it('should allow custom namespaces', function(done){
    var ee = global.__myCustomNamespace = new EventEmitter();
    ee.custom = true;

    var sparkles = require('../')('__myCustomNamespace');

    expect(sparkles.custom).to.equal(true);
    sparkles.removeAllListeners();
    expect(global.__sparklesEventEmitter).to.not.exist();
    done();
  });
});
