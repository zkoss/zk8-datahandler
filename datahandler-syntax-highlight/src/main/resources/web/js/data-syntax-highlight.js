function (wgt, dataValue) {
	//Reserve breakline
	hljs.configure({useBR: true});
	//Init highlightjs
	var w = wgt.$n();
	hljs.highlightBlock(w);
	//Do highlighting after the wgt value has been set
	wgt.setOverride("setValue", function(value) {
		this.$setValue(value);
		hljs.highlightBlock(w);
	});
}