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

  beforeEach(function(done){
    global['store@sparkles'] = {};
    done();
  });

  afterEach(function(done){
    delete global['store@sparkles'];
    done();
  });

  it('should use an EE from sparkles namespace if it already exists', function(done){
    var ee = global['store@sparkles'].default = new EventEmitter();
    ee.custom = 'ee';

    var sparkles = require('../')();

    expect(sparkles.custom).to.equal('ee');
    done();
  });

  it('should allow custom namespaces', function(done){
    var ee = global['store@sparkles'].customNamespace = new EventEmitter();
    ee.custom = true;

    var sparkles = require('../')('customNamespace');

    expect(sparkles.custom).to.equal(true);
    done();
  });
});
