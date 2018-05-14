'use strict';

var expect = require('expect');

var sparkles = require('../');

function noop() {}

describe('sparkles()', function() {

  var ee;

  beforeEach(function(done) {
    ee = sparkles();
    done();
  });

  afterEach(function(done) {
    ee.remove();
    done();
  });

  it('will attach the sparkles store namespace to global', function(done) {
    expect(global['store@sparkles']).toExist();
    done();
  });

  it('will attach an event emitter to the sparkles store default namespace', function(done) {
    expect(global['store@sparkles']).toIncludeKey('default');
    done();
  });

  it('removes the event emitter from the store when remove is called', function(done) {
    ee.on('test', noop);
    ee.remove();
    expect(global['store@sparkles']).toNotIncludeKey('default');
    done();
  });
});
