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
    expect(global.__sparklesEventEmitter).to.not.exist();
    done();
  });

  afterEach(function(done){
    sparkles.removeAllListeners();
    done();
  });

  it('will attach an event emitter to global upon the first `on` call', function(done){
    sparkles.on('test', noop);
    expect(global.__sparklesEventEmitter).to.exist();
    expect(global.__sparklesEventEmitter.on).to.be.a.function();
    done();
  });

  it('removes the event emitter from global if no more listeners exist it', function(done){
    sparkles.on('test', noop);
    expect(global.__sparklesEventEmitter).to.exist();
    sparkles.removeListener('test', noop);
    expect(global.__sparklesEventEmitter).to.not.exist();
    done();
  });

  it('even works with removeAllListeners', function(done){
    sparkles.on('test1', noop);
    sparkles.on('test2', noop2);
    expect(global.__sparklesEventEmitter).to.exist();
    sparkles.removeAllListeners();
    expect(global.__sparklesEventEmitter).to.not.exist();
    done();
  });

  it('handles removing all newListeners', function(done){
    sparkles.on('newListener', noop);
    expect(global.__sparklesEventEmitter).to.exist();
    sparkles.removeAllListeners('newListener');
    expect(global.__sparklesEventEmitter).to.not.exist();
    done();
  });

  it('gracefully handles newListeners being added and removed', function(done){
    sparkles.on('newListener', noop);
    sparkles.on('newListener', noop2);
    expect(global.__sparklesEventEmitter).to.exist();
    sparkles.removeListener('newListener', noop);
    expect(global.__sparklesEventEmitter).to.exist();
    done();
  });

  it('handles removing all removeListeners', function(done){
    sparkles.on('removeListener', noop);
    expect(global.__sparklesEventEmitter).to.exist();
    sparkles.removeAllListeners('removeListener');
    expect(global.__sparklesEventEmitter).to.not.exist();
    done();
  });

  it('gracefully handles removeListeners being added and removed', function(done){
    sparkles.on('removeListener', noop);
    sparkles.on('removeListener', noop2);
    expect(global.__sparklesEventEmitter).to.exist();
    sparkles.removeListener('removeListener', noop);
    expect(global.__sparklesEventEmitter).to.exist();
    done();
  });

  it('recovers from removeAllListeners on removeListener upon new sparkles', function(done){
    sparkles.on('test', noop);
    sparkles.removeAllListeners('removeListener');
    expect(sparkles.listeners('removeListener')).to.have.length(0);
    var sparkles2 = require('../')();
    expect(sparkles2.listeners('removeListener')).to.have.length(1);
    done();
  });

  it('does not add attach and detach more than once', function(done){
    sparkles.on('test', noop);
    expect(sparkles.listeners('removeListener')).to.have.length(1);
    var sparkles2 = require('../')();
    expect(sparkles2.listeners('removeListener')).to.have.length(1);
    done();
  });

  it('will not attach to global if the detach listener is added more than once', function(done){
    sparkles.on('removeListener', sparkles._events.removeListener);
    expect(global.__sparklesEventEmitter).to.not.exist();
    done();
  });
});
