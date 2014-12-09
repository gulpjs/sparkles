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

  var ee;
  var sparkles;

  before(function(done){
    ee = global.__sparklesEventEmitter = new EventEmitter();
    ee.custom = 'ee';

    sparkles = require('../')();
    done();
  });

  it('should use an EE from sparkles namespace if it already exists', function(done){
    expect(sparkles.custom).to.equal('ee');
    sparkles.removeAllListeners();
    expect(global.__sparklesEventEmitter).to.not.exist();
    done();
  });
});
