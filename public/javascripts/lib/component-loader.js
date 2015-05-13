'use strict';

/*
 * obj = {
 *  placeHolder:'selector to place the snippet',
 *  url:'snippet url',
 *  components:[
 *    {
 *      component: 'flight component', 
 *      selector: 'flight compnent selector',
 *      attr: 'attributes obj'
 *    }
 *   ] 
 * }
 * 
 */

define(function() {

  var _snippet_loader = function(obj) {
    $.ajax({
      url : obj.url,
      method : 'GET'
    }).done(function(data) {
      $(obj.placeHolder).html(data);
      //array of lib for require.js to load
      var componentArray = []; 
      //dictionary object that holds attach and attribute values
      var components = []
      
      obj.components.map(function(c) {
        componentArray.push(c.component);
        components.push(c);
      });
      
      require(componentArray, function() {
        var args = Array.prototype.slice.call(arguments)
        var i = 0; //this is ugly
        args.map(function(arg) {
          var c = components[i];
          var additionalAttributes = c['attr'] || {};
          i++;
          arg.attachTo(c.selector, additionalAttributes);
        });
      });
      
    }).fail(function(jqXHR, textStatus) {
      console.log("snippet load failed: " + obj.url);
      console.log("snippet load failed: " + textStatus);
      // throw textStatus;
    });
  }

  return function(obj) {
    // TODO:this function can be recursive
    if ($.isArray(obj)) {
      obj.map(function(o) {
        _snippet_loader(o);
      });
    } else {
      _snippet_loader(obj);
    }
  }
});
