define(function (require) {

  var defineComponent = require('flight').component;
  require('sweet-alert');

  return defineComponent(confirmation);

  function confirmation() {
    this.attributes({
      needsConfirmationEvent: 'uiNeedsConfirmation',
      approvedEvent: 'uiApprovedConfirmation'
    });

    this.showConfirmation = function (e, data) {
      var self = this;

      swal(
        {
          title: data.title || _i18nMessages['confirmation.title'],
          text: data.text || _i18nMessages['confirmation.body'],
          type: data.type || "warning",
          allowOutsideClick: true,
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: data.confirmButtonText || _i18nMessages['confirmation.approve'],
          cancelButtonText: data.cancelButtonText || _i18nMessages['confirmation.reject']
        },
        function () {
          self.trigger(data.target, data.approvedEvent || self.attr.approvedEvent);
        }
      );
    };

    this.after('initialize', function () {
      this.on(document, this.attr.needsConfirmationEvent, this.showConfirmation);
    });
  };
});
