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

  before(function(done){
    sparkles = require('../')();
    done();
  });

  it('will attach an event emitter to global upon the first `on` call', function(done){
    expect(global.__sparklesEventEmitter).to.not.exist();
    sparkles.on('test', noop);
    expect(global.__sparklesEventEmitter).to.exist();
    expect(global.__sparklesEventEmitter.on).to.be.a.function();
    done();
  });

  it('removes the event emitter from global if no more listeners exist it', function(done){
    expect(global.__sparklesEventEmitter).to.exist();
    sparkles.removeListener('test', noop);
    expect(global.__sparklesEventEmitter).to.not.exist();
    done();
  });

  it('even works with removeAllListeners', function(done){
    expect(global.__sparklesEventEmitter).to.not.exist();
    sparkles.on('test1', noop);
    sparkles.on('test2', noop2);
    expect(global.__sparklesEventEmitter).to.exist();
    sparkles.removeAllListeners();
    expect(global.__sparklesEventEmitter).to.not.exist();
    done();
  });

  it('gracefully handles newListeners being added', function(done){
    expect(global.__sparklesEventEmitter).to.not.exist();
    sparkles.on('newListener', noop);
    expect(global.__sparklesEventEmitter).to.exist();
    sparkles.removeAllListeners('newListener');
    expect(global.__sparklesEventEmitter).to.not.exist();
    done();
  });

  it('gracefully handles removeListeners being added', function(done){
    expect(global.__sparklesEventEmitter).to.not.exist();
    sparkles.on('removeListener', noop);
    sparkles.on('removeListener', noop2);
    expect(global.__sparklesEventEmitter).to.exist();
    sparkles.removeListener('removeListener', noop);
    expect(global.__sparklesEventEmitter).to.exist();
    done();
  });

  it('recovers from removeAllListeners on removeListener', function(done){
    sparkles.removeAllListeners('removeListener');
    process.nextTick(function(){
      expect(sparkles.listeners('removeListener')).to.have.length(1);
      done();
    });
  });
});
