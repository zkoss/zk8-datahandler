function (wgt, dataValue) {
	var grid = document.createElement('v-grid');
	grid._lightChildren = null;
	var dom = wgt.$n();
	var firstChild = jq(dom).find('table')[0];
	dom.removeChild(firstChild);
	grid.appendChild(firstChild);
	dom.appendChild(grid);

	var settings = dataValue.length > 0 ? $.evalJSON(dataValue) : {};

	// Set the selection mode
	if (settings.mode == 'multi')
		grid.selection.mode = 'multi';

	var self = this;
	if (self.command) {
		grid.addEventListener("select", function() {
			var selected = grid.selection.selected(),
				deselected = grid.selection.deselected();
			if (selected.length != 0 || deselected.length != 0)
    			self.command("$syncServerSelection", {selected: selected, deselected: deselected});
        });
	}

	if (self.after) {
		self.after('$syncClientSelection', function (evt) {
			if (evt != null) {
				for (var i = 0; i < evt.length; i++) {
					grid.selection.select(evt[i]);
				}
			}
		});
    }
}