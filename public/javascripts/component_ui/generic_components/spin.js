'use strict';

define(
  [
    'require',
    'spin',
    'flight'
  ],

  function (require, Spinner) {

    var defineComponent = require('flight').component;

    return defineComponent(spin);

    function spin() {
      this.defaultAttrs({
        startMessage: 'ajaxStart',
        stopMessage: 'ajaxStop',
        opts: {
          lines: 13,
          length: 20,
          width: 9,
          radius: 23,
          corners: 1.0
        }
      });

      this.startSpin = function (e) {
        this.stopSpin();
        this.spinner.spin(this.node);
      }

      this.stopSpin = function (e) {
        this.spinner.stop();
      }

      this.after('initialize', function () {
        this.spinner = new Spinner(this.attr.opts);
        this.on(document, this.attr.startMessage, this.startSpin);
        this.on(document, this.attr.stopMessage, this.stopSpin);
      });
    }
  });

