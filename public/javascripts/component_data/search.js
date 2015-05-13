'use strict';

define(function (require) {

  var defineComponent = require('flight').component;

  return defineComponent(Search);

  function Search() {

    this.defaultAttrs({
    });

    this.handleSearch = function(ev, data) {
      var self = this;

      self.query = $.extend(self.query, data.query);

      self.trigger('dataWaitingForAsynchronousResponse');

      if(this.ajax)
        this.ajax.abort();

      this.ajax = $.ajax({
        url: self.attr.url,
        method: 'GET',
        dataType: 'json',
        data: self.query
      }).done(function(data) {
        self.trigger(self.attr.receivedDataEvent, data);
      }).fail(function(jqXHR, textStatus, errorThrown) {
        if(errorThrown !== 'abort') {
          if(jqXHR.status === 404) {
            self.trigger(self.attr.receivedDataEvent, {
              ilk: 0,
              son: 0,
              toplam: 0
            });
          } else {
            self.trigger('errorOccured', {
              text: jqXHR.responseText
            });
          }
        }
      }).always(function() {
        self.trigger('dataReceivedAsynchronousResponse');
      });
    }

    this.after('initialize', function () {
      console.log('Search initialized');
      this.query = {};
      this.on(this.attr.needsDataEvent, this.handleSearch);
    });
  };
});
