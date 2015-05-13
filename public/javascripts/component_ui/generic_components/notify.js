'use strict';

define(
  [
    'require',
    'pnotify',
    'flight'
  ],

  function (require, pnotify) {

    var defineComponent = require('flight').component;

    return defineComponent(notify);

    function notify() {
      this.defaultAttrs({
      });

      this.handleError = function (e, error) {
        var notice = new PNotify({
          title: error.title || _i18nMessages['error'],
          text: error.text,
          type: error.type || 'error',
          styling: 'fontawesome',
          animate_speed: 'fast'
        });

        notice.get().click(function () {
          notice.remove();
        });
      }

      this.handleSuccess = function (e, success) {
        var notice = new PNotify({
          title: success.title || _i18nMessages['success'],
          text: success.text,
          type: success.type || 'success',
          styling: 'fontawesome',
          animate_speed: 'fast'
        });

        notice.get().click(function () {
          notice.remove();
        });
      }

      this.handleNotice = function (e, notice) {
        var notice = new PNotify({
          title: notice.title || _i18nMessages['notice'],
          text: notice.text,
          type: notice.type || 'notice',
          styling: 'fontawesome',
          animate_speed: 'fast'
        });

        notice.get().click(function () {
          notice.remove();
        });
      }

      this.after('initialize', function () {
        this.on('errorOccured', this.handleError);
        this.on('successOccured', this.handleSuccess);
        this.on('noticeOccured', this.handleNotice);

        var self = this;

        if(window.__errors != null) {
          window.__errors.forEach(function(item) {
            self.trigger('errorOccured', {
              text : item
            })
          });
        }
        if(window.__successes != null) {
          window.__successes.forEach(function(item) {
            self.trigger('successOccured', {
              text : item
            })
          });
        }
      });
    }
  });
