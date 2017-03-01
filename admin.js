'use strict'

define("admin/plugins/custom-fileexts", ['settings'], function(settings){
  var ACP = {};
  ACP.init = function(){
    function update(){
      updatePlaceholders();
      updateRemoveButtons();
    }
    function updateRemoveButtons(){
      var remButtons = $("div[data-parent=_input] > button.remove");
      remButtons.each(function(index){
        this.disabled = index === 0 || (index === 1 && remButtons.length <= 2);
      });
    }
    function updatePlaceholders(){
      $("input[data-parent=__input]:not(:first-child)").each(function(index){
        this.placeholder = "Extension";
      });
      $("input[data-parent=__input]:first-child").each(function(index){
        this.placeholder = "Mime Type";
      });
    }
    var form = $('#custom-fileexts-settings');
    settings.sync('custom-fileexts', form, update);
    $(document).on('click', 'button.add, button.remove', update);
		$('#save').on('click', function(event) {
      event.preventDefault();
      settings.persist('custom-fileexts', form, function(){
        socket.emit('admin.settings.syncMimeTypes');
      });
    });
  }
  return ACP;
});
