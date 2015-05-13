'use strict';

/*

 Default Attributes

 showFormSelector : selector for the a or button to show form for the listed entities
 showFormEvent : (event) when the selector is clicked which event should be fired
 linkSelector : (selector) for list elements for detail page
 requestLinkEvent : (event) if the link is clicked which event will be fired
 pagerSelector : (selector) pager element if present
 dataRecievedEvent : (event) which event to listen to when the data is present
 needsDataEvent: (event) which event to listen to when the data is present
 listSelector : (selector) to append template in
 template: template :)

 */

define(function (require) {
  var defineComponent = require('flight').component;

  return defineComponent(companyList);

  function companyList() {

    this.defaultAttrs({
    });

    this.requestForm = function (e) {
      e.preventDefault();
      this.trigger(document, this.attr.showFormEvent);
    }

    this.handleReceivedList = function (e, data) {
      if (data.hasOwnProperty('results')) {
        this.select('pagerSelector').addClass('hide');
        if (data.results.length > 0) {
          this.$node.removeClass('panel-danger');
          this.$node.addClass('panel-default');
          if (data.meta.toplam > 11) {
            this.select('pagerSelector').removeClass('hide');
          }

        } else {
          this.$node.removeClass('panel-default');
          this.$node.addClass('panel-danger');
        }

        var html = this.template.render(data);
        this.select('listSelector').html(html);
      }
    }

    this.requestLink = function (e, item) {
      e.preventDefault();
      var data = {};
      data.result = $(item.el).data("index");
      this.trigger(document, this.attr.requestLinkEvent, data);
    }

    this.handleHide = function () {
      this.$node.addClass('hide');
    }

    this.after('initialize', function () {
      this.template = Hogan.compile(this.attr.template);

      this.on('click', {
        showFormSelector: this.requestForm,
        linkSelector: this.requestLink,
      });

      this.on(document, this.attr.dataRecievedEvent, this.handleReceivedList);
      this.on(document, 'uiHidePanels', this.handleHide);
      this.trigger(this.attr.needsDataEvent, {
        query: {
          adet: 12,
          sayfa: 1
        }
      });
    });
  }
});
