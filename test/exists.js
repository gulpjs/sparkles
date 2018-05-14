'use strict';

var expect = require('expect');

var sparkles = require('../');

describe('sparkles.exists()', function() {

  it('checks if a namespace has been defined', function(done) {
    expect(sparkles.exists('test')).toBe(false);
    var ee = sparkles('test');
    expect(sparkles.exists('test')).toBe(true);
    ee.remove();
    expect(sparkles.exists('test')).toBe(false);
    done();
  });
});
