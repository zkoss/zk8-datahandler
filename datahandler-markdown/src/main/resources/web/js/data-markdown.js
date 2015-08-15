function (wgt, dataValue) {
	var converter = new showdown.Converter();
	//Initial markdown conversion
	wgt.$n().innerHTML = converter.makeHtml(wgt.getValue());
	//Do markdown conversion after value of the wgt has been set
	wgt.setOverride("setValue", function(value) {
		this.$setValue(value);
		this.$n().innerHTML = converter.makeHtml(value);
	});
}