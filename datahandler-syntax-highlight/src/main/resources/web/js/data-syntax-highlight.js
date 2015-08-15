function (wgt, dataValue) {
	//Reserve breakline
	hljs.configure({useBR: true});
	//Init highlightjs
	hljs.highlightBlock(wgt.$n());
	//Do highlighting after the wgt value has been set
	wgt.setOverride("setValue", function(value) {
		this.$setValue(value);
		hljs.highlightBlock(wgtDOM);
	});
}