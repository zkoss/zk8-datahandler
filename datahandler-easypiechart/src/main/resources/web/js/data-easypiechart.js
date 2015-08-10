function (wgt, dataValue) {
	var barColor = 'rgb(57, 131, 194)',
		trackColor = '#E2E2E2',
		scaleColor = false,
		lineCap = 'butt',
		size = jq(wgt.$n()).data('size'),
		lineWidth = zk.parseInt(46/10),
		animate = true;
	jq(wgt.$n()).easyPieChart({
		barColor: barColor,
		trackColor: trackColor,
		scaleColor: scaleColor,
		lineCap: lineCap,
		size: size,
		lineWidth: lineWidth,
		animate: 1000
	});
}