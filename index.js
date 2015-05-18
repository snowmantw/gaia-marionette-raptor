/**
 * gaia-marionette-raptor runner is a helper to run Marionette while do
 * Raptor test. With this, to test a mocked user behavior only needs to
 * write the Marionette code, and leave the Raptor runner, retry and other
 * settings behind.
 *
 * Usage: (in the test file)
 *
 *    var runner = require('gaia-marionette-raptor')
 *    marionette(function() {
 *      test(function(done) {
 *        runner.capture(function(detach) {
 *          ...do whatever as the current way.
 *          detach();
 *          done();
 *        });
 *      });
 *    });
 */

'use strict';
(function() {
  var raptor = require('gaia-raptor');
  var Runner = function() {
    this._raptorOptions = {
      runs: 1,
      phase: 'marionette'
    };
  };
  Runner.prototype.capture = function(test, endMark) {
    this._raptorOptions.marks = {
      'end': endMark
    };
    raptor(this._raptorOptions, function(instance) {
      instance.on('run', function(detach) {
        test(detach);
      });
    });
  };
  Runner.prototype.retry = function() {};
  module.exports = new Runner();
})();

