function (wgt, dataValue) {
	jq(wgt.$n()).datepicker({
		onSelect: function (date) {
			wgt.updateChange_();
		}
	});
}