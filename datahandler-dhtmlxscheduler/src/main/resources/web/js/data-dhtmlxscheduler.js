function (wgt, dataValue) {
	var dataObj = dataValue.length > 0 ? $.evalJSON(dataValue) : {};
	//Init scheduler
	var initial_date = dataObj.initial_date,
		initial_view = dataObj.initial_view;
	scheduler.init(wgt.$n(), initial_date ? initial_date : new Date(), initial_view ? initial_view : "week");

	//Parse data
	//For example : {data:[{id: ..., start_date: ... , end_date: ..., text: ..., ... }, ... ]}
	var data = dataObj.data;
	if (data)
		scheduler.parse(data, "json");

	//Events to server.
	// If using composer (MVC), it would trigger the Event Listeners.
	// If using view model (MVVM), it would trigger the Commands which have been indicated by the following annotations:
	// @ToServerCommand({"dhtmlxscheduler$addServerEvent", "dhtmlxscheduler$deleteServerEvent", "dhtmlxscheduler$changeServerEvent"})
	// Notice that the command name would be expanded by adding the prefix "dhtmlxscheduler" automatically.
	var self = this;
	if (self.command) {
		var formatFunc = scheduler.date.date_to_str("%Y-%m-%d %H:%i");

		//onEventAdded
		scheduler.attachEvent("onEventAdded", function(id, ev){
       		self.command("$addServerEvent", {id: id, start_date: formatFunc(ev.start_date), end_date: formatFunc(ev.end_date), subject: ev.subject, text: ev.text});
        });
        //onEventDeleted
		scheduler.attachEvent("onEventDeleted", function(id, ev){
       		self.command("$deleteServerEvent", {id: id});
        });
        //onEventChanged
        scheduler.attachEvent("onEventChanged", function(id, ev){
			self.command("$changeServerEvent", {id: id, start_date: formatFunc(ev.start_date), end_date: formatFunc(ev.end_date), subject: ev.subject, text: ev.text});
        });
	}

	// Call back from server side.
	// in MVC: use methods.
	// 		Clients.sendClientCommand(component, "dhtmlxscheduler$addClientEvent", data);
	//		Clients.sendClientCommand(component, "dhtmlxscheduler$deleteClientEvent", data);
	// in MVVM: It works if the following annotations have been set:
	// @ToClientCommand({"dhtmlxscheduler$addClientEvent", "dhtmlxscheduler$deleteClientEvent"})
	// And use the following annotations to tranfer the data.
	//@NotifyCommands({
	//    @NotifyCommand(value = "dhtmlxscheduler$addClientEvent", onChange = "_vm_.addEventList"),
	//    @NotifyCommand(value = "dhtmlxscheduler$deleteClientEvent", onChange = "_vm_.removeEventList")
	//})
	// Notice that the aftercommand name would be expanded by adding the prefix "dhtmlxscheduler" automatically.
	if (self.after) {
		//addEvent
		self.after('$addClientEvent', function (evt) {
			if (evt != null) {
				for (var i = 0 ; i < evt.length; i++) {
					scheduler.addEvent({
						start_date: new Date(evt[i].start_date),
						end_date:   new Date(evt[i].end_date),
						text:   evt[i].text,
						subject: evt[i].subject, //userdata
					});
				}
			}
		});
		//deleteEvent
		self.after('$deleteClientEvent', function (evt) {
			if (evt != null) {
				for (var i = 0 ; i < evt.length; i++) {
					scheduler.deleteEvent(evt[i]);
				}
			}
		});
    }
}