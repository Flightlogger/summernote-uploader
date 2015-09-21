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
  $.summernote.addPlugin({
    name: 'upload',
    init: function() { },
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
  });
}));
