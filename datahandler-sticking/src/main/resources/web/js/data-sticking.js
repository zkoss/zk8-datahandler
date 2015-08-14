function (wgt, dataValue) {
	var options = dataValue.length > 0 ? $.evalJSON(dataValue) : {};
	jq(wgt.$n()).stick_in_parent(options);
}