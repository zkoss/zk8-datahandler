function (wgt, dataValue) {
	var converter = new showdown.Converter();
	wgt.$n().innerHTML = converter.makeHtml(wgt.getValue());
	wgt.setOverride("setValue", function(value) {
		this.$setValue(value);
		this.$n().innerHTML = converter.makeHtml(value);
	});
}