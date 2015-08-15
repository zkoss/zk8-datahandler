function(wgt, dataValue) {
	//Init kendo UI combobox
	var $w = jq(wgt.$n());
	$w.kendoComboBox();

	//Deal with invalidate()
	$w.hide(); 
}
