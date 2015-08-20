# Data Handler - dhtmlxscheduler

##Introduction
Use dhtmlxscheduler on ZK Component -  [Div](http://books.zkoss.org/wiki/ZK_Component_Reference/Containers/Div).

##How to use
In ***pom.xml***
```xml
<dependency>
    <groupId>org.zkoss</groupId>
    <artifactId>datahandler-dhtmlxscheduler</artifactId>
    <version>1.0.0</version>
</dependency>
```

In ***.zul*** (setting file: [js](https://github.com/DevChu/zk8-datahandler-demo/blob/master/src/main/webapp/js/dhtmlxscheduler-setting.js), [css](https://github.com/DevChu/zk8-datahandler-demo/blob/master/src/main/webapp/css/dtmlxscheduler.css))
```xml
<zk xmlns:ca="client/attribute" xmlns:n="native">
    ...
    <style src="/css/dtmlxscheduler.css" /> <!-- Customized style -->
    <script src="/js/dhtmlxscheduler-setting.js" /> <!-- Customized setting -->
    <div ca:data-dhtmlxscheduler="{initial_view: 'month'}" viewModel="@id('vm') @init('org.zkoss.VM')">
            <div class="dhx_cal_navline">
                <n:div class="dhx_cal_prev_button"></n:div>
                <n:div class="dhx_cal_next_button"></n:div>
                <n:div class="dhx_cal_today_button"></n:div>
                <n:div class="dhx_cal_date"></n:div>
                <n:div class="dhx_cal_tab" name="day_tab" style="right:204px;"></n:div>
                <n:div class="dhx_cal_tab" name="week_tab" style="right:140px;"></n:div>
                <n:div class="dhx_cal_tab" name="month_tab" style="right:76px;"></n:div>
            </div>
            <div class="dhx_cal_header">
            </div>
            <div class="dhx_cal_data">
            </div>
        </div>
    ...
</zk>
```
You can change the value of attribute (**ca:data-dhtmlxscheduler**) to specify the settings (*initial_view & initial_date*).
This sample supports several dhtmlxscheduler events. You can use MVVM or MVC way to build the communication between client and server.

In ***VM.java***: ([example](https://github.com/DevChu/zk8-datahandler-demo/blob/master/src/main/java/org/zkoss/zkdatahandlerdemo/DhtmlxSchedulerVM.java))

```java
@NotifyCommands({
    @NotifyCommand(value = "dhtmlxscheduler$addClientEvent", onChange = "_vm_.addEventList"),
    @NotifyCommand(value = "dhtmlxscheduler$deleteClientEvent", onChange = "_vm_.removeEventList")
})
@ToClientCommand({"dhtmlxscheduler$addClientEvent", "dhtmlxscheduler$deleteClientEvent"})
@ToServerCommand({"dhtmlxscheduler$addServerEvent", "dhtmlxscheduler$deleteServerEvent", "dhtmlxscheduler$changeServerEvent"})
public class DhtmlxSchedulerVM {
    private List<SchedulerEvent> addEventList; //transfer object
    private List<String> removeEventList; //transfer object

    //getter..

    @Command("dhtmlxscheduler$addServerEvent")
    public void add(@BindingParam("id") String id, @BindingParam("start_date") String start_date, @BindingParam("end_date") String end_date, @BindingParam("subject") String subject, @BindingParam("text") String text) {
        //do something after the new scheduler events have been added.
    }

    @Command("dhtmlxscheduler$deleteServerEvent")
    public void delete(@BindingParam("id") String id) {
        //do something after some scheduler events have been deleted.
    }

    @Command("dhtmlxscheduler$changeServerEvent")
    public void change(@BindingParam("id") int id, @BindingParam("start_date") String start_date, @BindingParam("end_date") String end_date, @BindingParam("subject") String subject, @BindingParam("text") String text) {
        //do something after some scheduler events have been changed.
    }

    //some commands which change the transfer object would send the data to client.
}
```
The annotations of class would build the connection between server and client.

**@ToServerCommand**: Trigger command in server by client.  
**@ToClientCommand**: Trigger the aftercommand in client.  
**@NotifyCommand**: Trigger a command in viewmodel whenever the given expression changes at the server.

See more in [Client side binding API](http://books.zkoss.org/zk-mvvm-book/8.0/data_binding/client_binding_api.html).

##Implements
In ***zk.xml***
```xml
<client-config>
	<data-handler>
		<name>dhtmlxscheduler</name> <!-- data-dhtmlxscheduler -->
		<script src="~./js/lib/dhtmlxscheduler.js" /> <!-- dhtmlxscheduler Library -->
        <link href="~./css/dhtmlxscheduler.css" rel="stylesheet" /> <!-- dhtmlxscheduler css -->
		<script src="~./js/data-dhtmlxscheduler.js" /> <!-- Data Handler Script -->
	</data-handler>
</client-config>
```
In ***data-dhtmlxscheduler.js***

```javascript
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
```
See more supported events - [dhtmlxscheduler API](http://docs.dhtmlx.com/scheduler/api__refs__scheduler.html).
##License
* datahandler-dhtmlxscheduler - [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0)
* [dhtmlxscheduler](http://igorescobar.github.io/jQuery-Mask-Plugin/) - see [dhtmlx license](http://dhtmlx.com/docs/products/licenses.shtml)

