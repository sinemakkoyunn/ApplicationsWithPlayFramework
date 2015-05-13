"use strict";

define(function(require) {
  var flight = require('flight');
  var withHandlebars = require('component_mixin/with_handlebars');

  function withPager() {
    flight.compose.mixin(this, [withHandlebars]);

    this.attributes({
      receivedDataEvent: null,
      needsDataEvent: null,
      refreshEvents: [],
      sayfaSelector: '.js-sayfa',
      adetSelector: '.js-adet',
      searchSelector: '.js-search',
      firstSelector: '.js-first',
      backwardSelector: '.js-backward',
      forwardSelector: '.js-forward',
      lastSelector: '.js-last',
      sayfa: 1,
      adet: 12,
      toplam: 0,
      template:
        '<form class="js-form form-inline pull-left" role="form">\
            <div class="form-group">\
                <select class="js-adet form-control" id="adet">\
                    <option value="12" selected>12</option>\
                    <option value="24">24</option>\
                    <option value="36">36</option>\
                    <option value="72">72</option>\
                </select>\
            </div>\
            <div class="btn-group">\
                <button type="button" class="js-first btn btn-primary">\
                    <i class="fa fa-fast-backward fa-fw"></i>\
                </button>\
                <button type="button" class="js-backward btn btn-primary">\
                    <i class="fa fa-backward fa-fw"></i>\
                </button>\
                <button type="button" class="js-sayfa btn btn-default disabled">1</button>\
                <button type="button" class="js-forward btn btn-primary">\
                  <i class="fa fa-forward fa-fw"></i>\
                </button>\
                <button type="button" class="js-last btn btn-primary">\
                  <i class="fa fa-fast-forward fa-fw"></i>\
                </button>\
                <button type="button" class="js-search btn btn-primary">\
                    <i class="fa fa-refresh fa-fw"></i>\
                </button>\
            </div>\
        </form>\
        '
    });

    this.setSayfa = function(sayfa) {
      if(sayfa < 1 || sayfa > this.last)
        return false;

      this.sayfa = sayfa;

      this.select('sayfaSelector').text(this.sayfa);

      if(this.sayfa == 1) {
        this.select('firstSelector').addClass('disabled');
        this.select('backwardSelector').addClass('disabled');
      } else {
        this.select('firstSelector').removeClass('disabled');
        this.select('backwardSelector').removeClass('disabled');
      }

      if(this.sayfa == this.last) {
        this.select('lastSelector').addClass('disabled');
        this.select('forwardSelector').addClass('disabled');
      } else {
        this.select('lastSelector').removeClass('disabled');
        this.select('forwardSelector').removeClass('disabled');
      }

      return true;
    }

    this.setAdet = function(adet) {
      if(adet < 1)
        return false;

      this.adet = adet;
      this.select('adetSelector').val(adet);
      this.setSayfa(1);

      return true;
    }

    this.setLast = function(last) {
      this.last = last;

      if(this.sayfa == this.last || this.last == 0) {
        this.select('lastSelector').addClass('disabled');
        this.select('forwardSelector').addClass('disabled');
      } else {
        this.select('lastSelector').removeClass('disabled');
        this.select('forwardSelector').removeClass('disabled');
      }
    }

    this.setToplam = function(toplam) {
      this.toplam = toplam;

      var last = Math.floor((this.toplam - 1) / this.adet) + 1;
      this.setLast(last);
    }

    this.buildQuery = function() {
      return {
        count: this.adet,
        page: this.sayfa
      };
    };

    this.search = function() {
      this.trigger(this.attr.needsDataEvent, {
        query: this.buildQuery()
      });
    };

    this.handleAdetChange = function(e) {
      e.preventDefault();

      var adet = this.select('adetSelector').val();
      this.setAdet(adet);
      this.search();
    }

    this.handleSearch = function(e) {
      e.preventDefault();
      this.search();
    }

    this.handleFirst = function(e) {
      e.preventDefault();

      this.setSayfa(1);
      this.search();
    }

    this.handleBackward = function(e) {
      e.preventDefault();

      if(!this.setSayfa(this.sayfa - 1)) {
        return;
      }

      this.search();
    }

    this.handleForward = function(e) {
      e.preventDefault();

      if(!this.setSayfa(this.sayfa + 1)) {
        return;
      }
      this.search();
    }

    this.handleLast = function(e) {
      e.preventDefault();

      this.setSayfa(this.last);

      this.search();
    }

    this.handleDataReceived = function(e, data) {
      this.setToplam(data.meta.toplam);
      this.setSayfa(data.meta.sayfa);
    }

    this.render = function(data) {
      var html = this.template(data);
      this.$node.html(html);
    }

    this.after('initialize', function() {
      var self = this;

      this.template = this.compile(this.attr.template);
      this.render({});

      this.setAdet(this.attr.adet);
      this.setSayfa(this.attr.sayfa);

      this.select('firstSelector').addClass('disabled');
      this.select('backwardSelector').addClass('disabled');
      this.select('lastSelector').addClass('disabled');
      this.select('forwardSelector').addClass('disabled');

      this.on('click', {
        searchSelector: this.handleSearch,
        firstSelector: this.handleFirst,
        backwardSelector: this.handleBackward,
        forwardSelector: this.handleForward,
        lastSelector: this.handleLast
      });

      this.on('change', {
        adetSelector: this.handleAdetChange
      });

      this.on(document, this.attr.receivedDataEvent, this.handleDataReceived);

      this.attr.refreshEvents.forEach(function(event) {
        self.on(document, event, self.search);
      })
    });
  }

  return withPager;
});
