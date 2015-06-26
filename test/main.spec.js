'use strict';

var expect = require('chai').expect;
var path = require('path');
var relativeRequire = require('../lib')(path.dirname(__dirname));

describe('relative-require', function () {
  describe('initialize', function () {
    var relative = require('../lib')(path.dirname(__dirname));

    describe('with valid path parameter', function () {
      it('should expose a function', function () {
        expect(relative).to.be.a('function');
      });

      it('should require path', function () {
        expect(relative('path')).to.be.a('object');
        expect(relative('path').dirname).to.be.a('function');
      });

      it('should require chai', function () {
        expect(relative('chai')).to.be.a('object');
        expect(relative('chai').should).to.be.a('function');
      });

      it('should require ./lib', function () {
        expect(relative('./lib')).to.be.a('function');
      });
    });

    describe('without valid path parameter', function () {
      it('should throw a TypeError', function () {
        expect(relative.bind('test')).to.throw(TypeError);
      });
    });
  });

  describe('exports', function () {
    it('should expose a function', function () {
      expect(relativeRequire).to.be.a('function');
    });
  });
});