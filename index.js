(function (factory) {
  if ( typeof define === 'function' && define.amd ) {
    // AMD. Register as an anonymous module.
    define(['jquery', 'summernote'], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS style for Browserify
    module.exports = factory;
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function ($) {
  $.extend($.summernote.plugins, {
    'upload': function(context) {

      var ui = $.summernote.ui;

      context.memo('button.upload', function() {
        var button = ui.button({
          cotents: '<i class="fa fa-cloud-upload',
          tooltip: 'Upload',
          click: function() {
            context.invoke('upload');
          }
        });

        var input = '<input type="file" multiple="multiple" style="display: none;">';
        var $element = button.render() + input;
        return $element;
      });

      this.events = {
        'upload': function(we, e) {
          var input = $(event.target).parents('.btn-group').find('input[type=file]');
          input.on('change', function() {
            layoutInfo.holder().trigger('summernote.upload', [this.files]);
            this.value = null;
            input.off('change');
          });
          input.click();
        }
      };
    },

    /*
       buttons: {
       upload: function() {
       var template = $.summernote.renderer.getTemplate().iconButton('fa fa-cloud-upload', {
       event : 'upload',
       title: 'Upload',
       hide: true
       });
       var input = '<input type="file" multiple="multiple" style="display: none;">';

       return template + input;
       }
       },
       events: {
       upload: function(event, editor, layoutInfo) {
       var input = $(event.target).parents('.btn-group').find('input[type=file]');
       input.on('change', function() {
       layoutInfo.holder().trigger('summernote.upload', [this.files]);
       this.value = null;
       input.off('change');
       });
       input.click();
       }
       }
       */
  });
}));
