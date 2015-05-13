'use strict';

define(function (require) {

  var defineComponent = require('flight').component;

  return defineComponent(Insanlar);

  function Insanlar() {
    var self;

    this.handleFail = function (jqXHR) {
      var text;
      try {
        text = jqXHR.responseJSON.meta.messages[0];
      } catch (e) {
        text = jqXHR.responseText;
      }
      self.trigger('errorOccured', { text: text });
    };


    this.yeniInsanEkle = function (ev, data) {
      $.ajax({
        url: '/v2/insan_ekle',
        method: 'POST',
        dataType: 'json',
        data: data.params
      }).done(function (data) {
        self.trigger('receivedYeniInsan', data);
      }).fail(self.handleFail);
    };


    this.insanlariListele = function (ev, data) {
      $.ajax({
        url: '/v2/insan_listesi',
        method: 'GET',
        dataType: 'json',
        data: data.query
      }).done(function (data) {
        self.trigger('dataReceivedInsanlarList', data);
      }).fail(self.handleFail);
    };

    this.after('initialize', function () {
      self = this;
      this.on('uiNeedsYeniInsanEkle', this.yeniInsanEkle);
      this.on('uiNeedsInsanlarList', this.insanlariListele);
    });
  }
});
