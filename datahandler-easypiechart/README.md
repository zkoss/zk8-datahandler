# Data Handler - easypiechart

##Introduction
Draw an easy pie chart on ZK Component -  [Div](http://books.zkoss.org/wiki/ZK_Component_Reference/Containers/Div).

##How to use
In ***pom.xml***
```xml
<dependency>
    <groupId>org.zkoss</groupId>
    <artifactId>datahandler-dhtmlxscheduler</artifactId>
    <version>1.0.0</version>
</dependency>
```

In ***.zul***
```xml
<zk xmlns:ca="client/attribute">
    ...
    <div ca:data-easypiechart="true" ca:data-size="46" ca:data-percent="73">73%</div>
    ...
</zk>
```
You can change the value of attribute (**ca:data-size**) to specify the size of easypiechart, and change the value of attribute (**ca:data-percent**) to specify the percentage of easypiechart.

This sample supports changing the percentage from server (only MVVM).

In ***VM.java***:

```java
@NotifyCommand(value = "easypiechart$clientUpdate", onChange = "_vm_.percent")
@ToClientCommand({"easypiechart$clientUpdate"})
public class EasyPieChartVM {
    private Integer percent;
    //getter..

    @Command
    @NotifyChange("percent")
    public void update() {
        //change percent.
    }
}

```
The annotations of class would build the connection between server and client.

**@ToClientCommand**: Trigger the aftercommand in client.  
**@NotifyCommand**: Trigger a command in viewmodel whenever the given expression changes at the server.

See more in [Client side binding API](http://books.zkoss.org/zk-mvvm-book/8.0/data_binding/client_binding_api.html).

##Implements
In ***zk.xml***
```xml
<client-config>
	<data-handler>
		<name>easypiechart</name> <!-- data-easypiechart -->
		<depends>~./js/lib/jquery.easy-pie-chart.js</depends> <!-- easy-pie-chart Library -->
        <links href="~./css/data-easypiechart.css" rel="stylesheet" /> <!-- easy-pie-chart css -->
        <script src="~./js/data-easypiechart.js" /> <!-- Data Handler Script -->
	</data-handler>
</client-config>
```
In ***data-easypiechart.js***

```javascript
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

	// Call back from server side (MVVM only). It works if the following annotations have been set:
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
```
##License
* datahandler-easypiechart - [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0)
* [Easy Pie Chart](http://rendro.github.io/easy-pie-chart/) - [MIT](https://github.com/rendro/easy-pie-chart)

