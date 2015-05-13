'use strict';

define(
  [
    'require',
    'typeahead',
    'flight'
  ],

  function (require) {

    var defineComponent = require('flight').component;

    return defineComponent(typeaheadComponent);

    function typeaheadComponent() {
      this.defaultAttrs({
        typeaheadSelector: '.js-typeahead',
        url: '#',
        fieldName: 'field',
        displayKey: 'name',
        typeaheadName: 'typeahead',
        replyEvent: 'recievedTypeaheadData'
      });

      this.enableTypeahead = function () {
        var engine = new Bloodhound({
          remote: {
            url: this.attr.url,
            filter: function (parsedResponse) {
              return parsedResponse.results;
            }
          },
          datumTokenizer: Bloodhound.tokenizers.obj.whitespace(this.attr.displayKey),
          queryTokenizer: Bloodhound.tokenizers.whitespace
        });

        engine.initialize();

        var self = this;

        this.select('typeaheadSelector').typeahead(null, {
          name: self.attr.typeaheadName,
          displayKey: self.attr.displayKey, // if not set, will default to 'value',
          source: engine.ttAdapter()
        }).on('typeahead:selected', function (ev, data) {
          self.trigger(self.attr.replyEvent, data);
          $('[name="' + self.attr.fieldName + '"]').val(data.id);
        });
      }

      this.after('initialize', function () {
        this.enableTypeahead();
      });
    }
  });

