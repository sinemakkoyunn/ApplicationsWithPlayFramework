require = {
  baseUrl: '/public/javascripts',
  paths: {
    'require': 'lib/require',
    'jquery': 'lib/jquery',
    'flight': 'lib/flight',
    'bootstrap': 'lib/bootstrap',
    'es5-shim': 'lib/es5-shim',
    'hogan': 'lib/hogan',
    'typeahead': 'lib/typeahead.bundle',
    'component-loader':'lib/component-loader',
    'spin': 'lib/spin.min',
    'datepicker' : 'lib/bootstrap-datepicker',
    'datepicker.tr': 'lib/bootstrap-datepicker.tr',
    'parsley': 'lib/parsley.min',
    'parsley.tr': 'lib/parsley.tr',
    'pnotify' : 'lib/pnotify.custom.min',
    'bootstrap-editable': 'lib/bootstrap-editable.min',
    'parsley-override': 'lib/parsley.override',
    'handlebars': 'lib/handlebars'
  },
  shim: {
    'bootstrap': {
      deps: [ 'jquery']
    },
    'datepicker': {
      deps: [ 'bootstrap' ]
    },
    'datepicker.tr': {
      deps: [ 'datepicker' ]
    },
    'component-loader':{
      deps: [ 'jquery' ]
    },
    'parsley': {
      deps: [ 'jquery', 'parsley-override' ]
    },
    'parsley.tr': {
      deps: [ 'parsley' ]
    },
    'pnotify': {
      deps: [ 'jquery' ]
    },
    'bootstrap-editable': {
      deps: [ 'bootstrap' ]
    },
    'flight': {
      deps: [ 'jquery', 'es5-shim', 'hogan' ],
      exports: 'flight'
    },
    'typeahead': {
      deps: [ 'jquery' ]
    }
  }
};
