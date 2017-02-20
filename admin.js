'use strict'

define("admin/plugins/custom-fileexts", ['settings'], function(settings){
  var ACP = {};
  ACP.init = function(){
    var form = $('#custom-fileexts-settings');
    settings.sync('custom-fileexts', form);
		$('#save').on('click', function(event) {
      event.preventDefault();
      settings.persist('custom-fileexts', form, function(){
        socket.emit('admin.settings.syncMimeTypes');
      });
    });
  }
  return ACP;
});
