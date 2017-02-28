<div class="row">
	<div class="col-sm-12">
		Add a list of custom file-extensions you want your nodebb not to rename into .bin or .undefined<br>
		Example: <pre><code>application/custom-format cf custform</code></pre> will rename every file-extension sent as application/custom-format into file.cf
		Please note: You can add as many extensions as you like to a single mime type, but at least one is required!
	</div>
</div>
<form role="form" id="custom-fileexts-settings">
	<div class="row">
		<div data-key="input" data-split="<br>" data-attributes='{"data-type":"array","data-attributes":{"type":"textarea"}}' data-new='["", ""]'>
		</div>
	</div>
</form>

<button id="save" class="floating-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
	<i class="material-icons">save</i>
</button>
