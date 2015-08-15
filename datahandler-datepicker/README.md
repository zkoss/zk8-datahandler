# Data Handler - datepicker
##Introduction
Use jQuery UI datepicker on ZK Component -  [Textbox](http://books.zkoss.org/wiki/ZK_Component_Reference/Input/Textbox).

##How to use
In ***pom.xml***
```xml
<dependency>
    <groupId>org.zkoss</groupId>
    <artifactId>datahandler-datepicker</artifactId>
    <version>1.0.0</version>
</dependency>
```

In ***.zul***
```xml
<zk xmlns:ca="client/attribute">
    ...
    <textbox ca:data-datepicker="{dateFormat: 'yy-mm-dd'}" cols="40"/>
    ...
</zk>
```
You can change the value of attribute (**ca:data-datepicker**) to specify the settings *(see [Datepicker Widget API - option](http://api.jqueryui.com/datepicker/))*.

##Implements
In ***zk.xml***
```xml
<client-config>
	<data-handler>
		<name>datepicker</name> <!-- data-datepicker -->
		<depends>~./js/lib/jquery-ui.min.js</depends> <!-- jQuery UI Library -->
        <links href="~./css/jquery-ui.min.css" rel="stylesheet" /> <!-- jQuery UI css -->
        <links href="~./css/jquery-ui.structure.min.css" rel="stylesheet" /> <!-- jQuery UI css -->
        <links href="~./css/jquery-ui.theme.min.css" rel="stylesheet" /> <!-- jQuery UI theme css -->
        <script src="~./js/data-datepicker.js" />  <!-- Data Handler Script -->
	</data-handler>
</client-config>
```
In ***data-datepicker.js***

```javascript
function (wgt, dataValue) {
	var $w = jq(wgt.$n()),
		options = dataValue.length > 0 ? $.evalJSON(dataValue) : {},
		initOptions = { // Update value after selection
			onSelect: function (date) {
				wgt.updateChange_();
			}
		};
	$.extend(initOptions, options != null ? options : {});
	//init datepicker
	$w.datepicker(initOptions);
}
```
##License
* datahandler-datepicker - [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0)
* [Datepicker](https://jqueryui.com/datepicker/) - [MIT](https://jquery.org/license/)