'use strict';

var lab = exports.lab = require('lab').script();
var describe = lab.describe;
var it = lab.it;
var expect = require('code').expect;

var sparkles = require('../');

describe('sparkles.exists()', function(){

  it('checks if a namespace has been defined', function(done){
    expect(sparkles.exists('test')).to.be.false();
    var ee = sparkles('test');
    expect(sparkles.exists('test')).to.be.true();
    ee.remove();
    expect(sparkles.exists('test')).to.be.false();
    done();
  });
});
