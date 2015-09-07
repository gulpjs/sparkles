'use strict';

var lab = exports.lab = require('lab').script();
var describe = lab.describe;
var it = lab.it;
var beforeEach = lab.beforeEach;
var afterEach = lab.afterEach;
var expect = require('code').expect;

var sparkles = require('../');

function noop(){}

describe('sparkles()', function(){

  var ee;

  beforeEach(function(done){
    ee = sparkles();
    done();
  });

  afterEach(function(done){
    ee.remove();
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
    ee.on('test', noop);
    ee.remove();
    expect(global['store@sparkles']).to.not.include('default');
    done();
  });
});
