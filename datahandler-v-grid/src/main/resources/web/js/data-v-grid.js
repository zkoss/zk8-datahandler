function (wgt, dataValue) {
	//Creat vaadin grid
	var grid = document.createElement('v-grid');
	grid._lightChildren = null;
	var dom = wgt.$n();
	var firstChild = jq(dom).find('table')[0];
	dom.removeChild(firstChild);
	grid.appendChild(firstChild);
	dom.appendChild(grid);

	var settings = dataValue.length > 0 ? $.evalJSON(dataValue) : {},
		self = this;

	//Do setting after v-grid import ready
	HTMLImports.whenReady(function() {
		// Set the selection mode
		if (settings.mode == 'multi')
			grid.selection.mode = 'multi';

		// Events to server.
		// If using composer (MVC), it would trigger the Event Listeners.
		// If using view model (MVVM), it would trigger the Commands which have been indicated by the following annotation:
		// @ToServerCommand({"v-grid$syncServerSelection"})
		// Notice that the command name would be expanded by adding the prefix "v-grid" automatically.
		if (self.command) {
			grid.addEventListener("select", function() {
				var selected = grid.selection.selected(),
					deselected = grid.selection.deselected();
				if (selected.length != 0 || deselected.length != 0)
	    			self.command("$syncServerSelection", {selected: selected, deselected: deselected});
	        });
		}

		// Call back from server side.
		// in MVC: use methods.
		// 		Clients.sendClientCommand(component, "v-grid$syncClientSelection", data);
		// in MVVM: It works if the following annotations have been set:
		// @ToClientCommand({"v-grid$syncClientSelection"})
		// And use the following annotations to tranfer the data:
		// @NotifyCommand(value = "v-grid$syncClientSelection", onChange = "_vm_.selections")
		// Notice that the aftercommand name would be expanded by adding the prefix "v-grid" automatically.
		if (self.after) {
			self.after('$syncClientSelection', function (evt) {
				if (evt != null) {
					for (var i = 0; i < evt.length; i++) {
						grid.selection.select(evt[i]);
					}
				}
			});
	    }
	});	
}