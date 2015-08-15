function (wgt, dataValue) {
	var $w = jq(wgt.$n()),
		options = dataValue.length > 0 ? $.evalJSON(dataValue) : {},
		initOptions = { // Update value after selection
			onSelect: function (date) {
				wgt.updateChange_();
			}
		};
	$.extend(initOptions, options != null ? options : {});
	//init datepicker
	$w.datepicker(initOptions);
}
