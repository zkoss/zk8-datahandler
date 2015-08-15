function (wgt, dataValue) {
	//Start introjs immediately or not
	if (dataValue == 'true')
		introJs(wgt.$n()).start();
}