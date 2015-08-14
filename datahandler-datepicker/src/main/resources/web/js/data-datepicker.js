function (wgt, dataValue) {
	var $w = jq(wgt.$n()),
		options = dataValue.length > 0 ? $.evalJSON(dataValue) : {},
		initOptions = {
			onSelect: function (date) {
				wgt.updateChange_();
			}
		};
	$.extend(initOptions, options != null ? options : {});
	$w.datepicker(initOptions);
}
