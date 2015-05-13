'use strict';

define(function (require) {
  var defineComponent = require('flight').component;
  var withForm = require('component_mixin/with_form');

  // define the component
  return defineComponent(genericPanelForm, withForm);

  function genericPanelForm() {

    this.defaultAttrs({
    });

    this.showForm = function (e) {

      this.$node.removeClass('hide');
    }

    this.hideForm = function (e) {
      e.preventDefault();
      this.$node.addClass('hide');
    }

    this.before('initialize', function () {
    });

    this.after('initialize', function () {
      this.on(document, this.attr.showFormEvent, this.showForm);
      this.on(document, 'uiHidePanels', this.hideForm)
      this.on('click', {
        hideFormSelector: this.hideForm
      });
    });
  }
});
