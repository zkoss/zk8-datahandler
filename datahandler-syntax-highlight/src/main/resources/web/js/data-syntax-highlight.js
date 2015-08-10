function (wgt, dataValue) {
	var wgtDOM = wgt.$n()
	wgtDOM.className = 'data-syntax-highlight';
	hljs.configure({useBR: true});
	hljs.highlightBlock(wgtDOM);
	wgt.setOverride("setValue", function(value) {
		this.$setValue(value);
		hljs.highlightBlock(wgtDOM);
	});
}