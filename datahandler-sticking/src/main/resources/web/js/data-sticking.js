function (wgt, dataValue) {
	//Init sticking with options
	var options = dataValue.length > 0 ? $.evalJSON(dataValue) : {};
	jq(wgt.$n()).stick_in_parent(options);
}