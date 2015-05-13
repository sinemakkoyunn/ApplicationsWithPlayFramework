"use strict";

define(function (require) {

  var defineComponent = require('flight').component;
  var withPager = require('component_mixin/with_pager');

  // define the component
  return defineComponent(Pager, withPager);

  function Pager() {
  }
});
