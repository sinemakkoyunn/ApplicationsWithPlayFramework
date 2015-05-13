'use strict';

define(
  [
    'require',
    'component_mixin/with_i18n',
    'datepicker.tr'
  ],

  function (require, withI18N) {
    var defineComponent = require('flight').component;

    // define the component
    return defineComponent(dateHourPicker, withI18N);

    function dateHourPicker() {
      this.defaultAttrs({
        template: '\
        <div class="row">\
          <div class="col-xs-6">\
            <input name="{{dateName}}" type="text" class="js-date form-control" placeholder="{{datePlaceholder}}">\
          </div>\
          <div class="col-xs-6">\
            <div class="input-group">\
              <select name="{{hourName}}" class="js-hour form-control">\
              {{#hours}}\
                <option value="{{.}}">{{.}}</option>\
              {{/hours}}\
              </select>\
              <span class="input-group-addon">:00</span>\
            </div>\
          </div>\
        </div>\
        ',
        dateSelector: '.js-date',
        hourSelector: '.js-hour',
        datepickerOpts: {
          autoclose: true,
          todayHighlight: true
        },
        dateChangedEvent: 'uiDateChanged',
        hourChangedEvent: 'uiHourChanged'
      });

      this.range = function (start, end) {
        var items = [];
        for (var i = start; i <= end; i++) {
          items.push(i);
        }
        return items;
      };

      this.handleDateChanged = function (ev, data) {
        this.date = this.select('dateSelector').val();
        this.trigger(document, this.attr.dateChangedEvent, {
          date: this.date,
          hour: this.hour
        })
      };

      this.handleHourChanged = function (ev, data) {
        this.hour = this.select('hourSelector').val();
        this.trigger(document, this.attr.dateChangedEvent, {
          date: this.date,
          hour: this.hour
        });
      };

      this.after('initialize', function () {
        this.attr.datepickerOpts.format = this.messageForKey('date.format');
        this.attr.datepickerOpts.lang = this.messageForKey('lang');

        this.template = Hogan.compile(this.attr.template);
        var html = this.template.render(this.i18n({
          hours: this.range(0, 23),
          datePlaceholder: this.messageForKey(this.attr.datePlaceholder),
          dateName: this.attr.dateName,
          hourName: this.attr.hourName
        }));
        this.$node.html(html);

        this.date = '';
        this.hour = '0';

        this.select('dateSelector').datepicker(this.attr.datepickerOpts);
        this.on('change', {
          dateSelector: this.handleDateChanged,
          hourSelector: this.handleHourChanged
        });
      });
    }
  }
);
