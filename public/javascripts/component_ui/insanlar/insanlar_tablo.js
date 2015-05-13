"use strict";
define(function (require) {

  var withTable = require('component_mixin/with_table');
  var withMinimizable = require('component_mixin/with_minimizable');
  var defineComponent = require('flight').component;

  return defineComponent(withTable, withMinimizable, insanlarTablo);

  function insanlarTablo() {
    this.attributes({
      selectedEvent: null,
      template: '<thead>\
          <tr>\
            <td colspan="4">\
              <span class="pull-left text-info">\
                Toplam <strong>{{meta.toplam}}</strong> kayıt içerisinden <strong>{{meta.ilk}} - {{meta.son}}</strong> arası gösteriliyor.\
              </span>\
            </td>\
          </tr>\
          <tr>\
            <th>Kullanıcı Adı</th>\
            <th>Tam İsim</th>\
            <th>Doğum Yeri</th>\
          </tr>\
        </thead>\
        <tfoot>\
          <tr>\
            <td colspan="4">\
              <span class="pull-left text-info">\
                Toplam <strong>{{meta.toplam}}</strong> kayıt içerisinden <strong>{{meta.ilk}} - {{meta.son}}</strong> arası gösteriliyor.\
              </span>\
            </td>\
          </tr>\
        </tfoot>\
        <tbody>\
        {{#results}}\
          <tr>\
            <td>{{kullaniciAdi}}</td>\
            <td>{{tamAd}}</td>\
            <td>{{dogumYeri}}</td>\
          </tr>\
        {{/results}}\
        </tbody>',
      minTemplate: '<thead>\
          <tr>\
            <td colspan="3">\
              <span class="pull-left text-info">\
                Toplam <strong>{{meta.toplam}}</strong> kayıt içerisinden <strong>{{meta.ilk}} - {{meta.son}}</strong> arası gösteriliyor.\
              </span>\
            </td>\
          </tr>\
          <tr>\
            <th>Kullanıcı Adı</th>\
            <th>Tam İsim</th>\
          </tr>\
        </thead>\
        <tfoot>\
          <tr>\
            <td colspan="3">\
              <span class="pull-left text-info">\
               Toplam <strong>{{meta.toplam}}</strong> kayıt içerisinden <strong>{{meta.ilk}} - {{meta.son}}</strong> arası gösteriliyor.\
              </span>\
            </td>\
          </tr>\
        </tfoot>\
        <tbody>\
        {{#results}}\
          <tr>\
            <td>{{kullaniciAdi}}</td>\
            <td>{{tamAd}}</td>\
          </tr>\
        {{/results}}\
        </tbody>'
    });
  }
});
