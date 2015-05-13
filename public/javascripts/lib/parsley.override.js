  window.ParsleyConfig = {
    classHandler: function(elem) {
      return elem.$element.closest('.form-group');
    },
    errorsWrapper: '<span class="help-block"></span>',
    errorTemplate: '<span></span>',
    successClass: 'has-success',
    errorClass: 'has-error'
   };