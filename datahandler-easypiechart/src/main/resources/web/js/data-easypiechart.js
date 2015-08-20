function (wgt, dataValue) {
	//Init easypiechart
	var configuration = dataValue.length > 0 ? $.evalJSON(dataValue) : {},
		$w = jq(wgt.$n()),
		size = $w.data('size'),
		label = $w.find('span'),
		defaultConfig = { //Change the text by step (Animation)
			onStep: function(value) {
				label.text(~~value + '%');
			},
			onStop: function(from, to) {
				label.text(~~to + '%');
			}
		};

	$.extend(configuration, defaultConfig, size ? {size: size} : {});
	$w.easyPieChart(configuration);

	// Call back from server side.
	// in MVC: use methods.
	// 		Clients.sendClientCommand(component, "easypiechart$clientUpdate", data);
	// in MVVM: It works if the following annotations have been set.
	// @ToClientCommand({"easypiechart$clientUpdate"})
	// And use the following annotation to tranfer the data.
	// @NotifyCommand(value = "easypiechart$clientUpdate", onChange = "_vm_.percent").
	// Notice that the aftercommand name would be expanded by adding the prefix "easypiechart" automatically.
	var self = this;
	if (self.after) {
		self.after('$clientUpdate', function (evt) {
			if (evt != null)
				$w.data('easyPieChart').update(evt);
		});
	}
}