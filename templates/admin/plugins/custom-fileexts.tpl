<div class="row">
  Add a list of custom Fileextensions you want your nodebb not to rename into .bin<br>
  Example: <pre><code>application/custom-format cf custform</code></pre> will rename every fileextension sent as application/custom-format into file.cf
</div>
<form role="form" id="custom-fileexts-settings">
	<div class="row">
    <div class="col-sm-12">
      <div data-key="input" data-split="<br>" data-attributes='{"data-type":"array","data-attributes":{"type":"textarea"}}' data-new='["", ""]'>
      </div>
		</div>
	</div>
</form>

<button id="save" class="floating-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
	<i class="material-icons">save</i>
</button>
