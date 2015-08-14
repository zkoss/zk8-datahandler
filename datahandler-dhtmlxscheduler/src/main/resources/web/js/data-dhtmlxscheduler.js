function (wgt, dataValue) {
	var dataObj = dataValue.length > 0 ? $.evalJSON(dataValue) : {};
	//init
	var initial_date = dataObj.initial_date,
		initial_view = dataObj.initial_view;
	scheduler.init(wgt.$n(), initial_date ? initial_date : new Date(), initial_view ? initial_view : "week");

	//data
	var data = dataObj.data;
	if (data)
		scheduler.parse(data, "json");

	//event
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

	//server_side (MVVM)
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

