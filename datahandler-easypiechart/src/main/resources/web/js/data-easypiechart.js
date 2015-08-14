function (wgt, dataValue) {
	var configuration = dataValue.length > 0 ? $.evalJSON(dataValue) : {},
		$w = jq(wgt.$n()),
		size = $w.data('size'),
		label = $w.find('span'),
		defaultConfig = {
			onStep: function(value) {
				label.text(~~value + '%');
			},
			onStop: function(from, to) {
				label.text(~~to + '%');
			}
		};

	$.extend(configuration, defaultConfig, size ? {size: size} : {});
	$w.easyPieChart(configuration);

	var self = this;
	if (self.after) {
		self.after('$clientUpdate', function (evt) {
			if (evt != null)
				$w.data('easyPieChart').update(evt);
		});
	}
}