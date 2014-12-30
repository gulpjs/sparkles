'use strict';

var lab = exports.lab = require('lab').script();
var describe = lab.describe;
var it = lab.it;
var before = lab.before;
var beforeEach = lab.beforeEach;
var after = lab.after;
var afterEach = lab.afterEach;
var expect = require('code').expect;

function noop(){}

function noop2(){}

describe('sparkles', function(){

  var sparkles;

  beforeEach(function(done){
    sparkles = require('../')();
    done();
  });

  afterEach(function(done){
    sparkles.remove();
    done();
  });

  it('will attach the sparkles store namespace to global', function(done){
    expect(global['store@sparkles']).to.exist();
    done();
  });

  it('will attach an event emitter to the sparkles store default namespace', function(done){
    expect(global['store@sparkles']).to.include('default');
    done();
  });

  it('removes the event emitter from the store when remove is called', function(done){
    sparkles.on('test', noop);
    sparkles.remove();
    expect(global['store@sparkles']).to.not.include('default');
    done();
  });
});
