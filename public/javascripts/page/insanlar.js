'use strict';

define(
  [
    'component_data/insanlar',
    'component_ui/insanlar/insanlar_tablo',
    'component_ui/insanlar/insanlar_form',
    'component_ui/generic_components/toolbar',
    'component_ui/generic_components/spin',
    'component_ui/generic_components/pager',
    'component_ui/generic_components/widget',
    'component_ui/generic_components/notify',
    'flight',
    'bootstrap',
    'parsley.tr'
  ],

  function (Insanlar, InsanlarTablo, InsanlarForm, Toolbar, Spin, Pager, Widget, Notify) {

    Notify.attachTo(document);

    Spin.attachTo('.js-spinner');

    Insanlar.attachTo(document);

    Widget.attachTo('.js-insanlar-widget', {
      widgetStatus: 'maximized',
      minClazz: 'col-xs-12 col-md-4',
      maxClazz: 'col-xs-12 col-md-12',
      heading: 'İnsanlar Tablosu',
      childSelectors: [
        '.js-insanlar-tablosu',
        '.js-insanlar-pager'
      ]
    });

    InsanlarTablo.attachTo('.js-insanlar-tablosu', {
      widgetStatus: 'maximized',
      needsDataEvent: 'uiNeedsInsanlarList',
      receivedDataEvent: 'dataReceivedInsanlarList',
      selectedEvent: 'uiNeedsInsanlarDetails'
    });

    Pager.attachTo('.js-insanlar-pager', {
      needsDataEvent: 'uiNeedsInsanlarList',
      receivedDataEvent: 'dataReceivedInsanlarList',
      refreshEvents: [ 'receivedYeniInsan']
    });

    Widget.attachTo('.js-yeni-insan-widget', {
      widgetStatus: 'maximized',
      minClazz: 'col-xs-12 col-md-8',
      maxClazz: 'col-xs-12 col-md-8',
      heading: 'Yeni İnsan Ekle',
      childSelectors: [
        '.js-insan-form'
      ],
      closable: true,
      closed: true
    });

    InsanlarForm.attachTo('.js-insan-form');

    Toolbar.attachTo('.js-insanlar-toolbar', {
      toolbarSelector: '.js-yeni-insan',
      newEventTarget: '.js-yeni-insan-widget',
      newEvent: 'uiNeedsWidgetShow'
    });

  }
);
