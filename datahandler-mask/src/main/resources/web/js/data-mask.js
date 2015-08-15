function (wgt, dataValue) {
	// Init mask plugin. Notice that dataValue should be the format, ex.00:00:00 .
	jq(wgt.$n()).mask(dataValue);
	// unformat after onChange event.
	wgt.listen({onChange: function (event) {
		event.data.value = jq(this.$n()).cleanVal();
	}});
}