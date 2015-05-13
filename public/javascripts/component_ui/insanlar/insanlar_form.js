'use strict';

define(function(require) {
  var defineComponent = require('flight').component;

  return defineComponent(insanEkleForm);

  function insanEkleForm() {

    this.attributes({
      submitEvent: 'uiNeedsYeniInsanEkle'
    });

    this.handleSubmit = function(e) {
      e.preventDefault();
      if (this.$node.parsley().validate()) {
        var params = this.$node.serialize();
        this.trigger(document, this.attr.submitEvent, { params: params});
      }
    };

    this.after('initialize', function() {
      this.on('submit', this.handleSubmit);
    });
  }
});
