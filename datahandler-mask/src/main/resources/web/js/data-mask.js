function (wgt, dataValue) {
	jq(wgt.$n()).mask(dataValue);
	// unformat after onChange event.
	wgt.listen({onChange: function (event) {
		event.data.value = jq(this.$n()).cleanVal();
	}});
}