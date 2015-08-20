# Data Handler - kendo-combobox
##Introduction
Use kendo UI ComboBox on ZK Component -  [Selectbox](http://books.zkoss.org/wiki/ZK_Component_Reference/Essential_Components/Selectbox).

##How to use
In ***pom.xml*** :
```xml
<dependency>
    <groupId>org.zkoss</groupId>
    <artifactId>datahandler-kendo-combobox</artifactId>
    <version>1.0.0</version>
</dependency>
```

In ***.zul*** :
```xml
<zk xmlns:ca="client/attribute">
    ...
    <zscript><![CDATA[
        import org.zkoss.zul.ListModelList;
        String[] userNamesA = { "Apple", "Banana", "Orange"};
        ListModelList modelA = new ListModelList(userNamesA);
    ]]></zk:zscript>
    <selectbox id="kc" model="${modelA}" ca:data-kendo-combobox="true">
        <template name="modelA">Name is ${each}</template>
    </selectbox>
    ...
</zk>
```

##Implements
In ***zk.xml***
```xml
<client-config>
	<data-handler>
		<name>kendo-combobox</name> <!-- data-kendo-combobox -->
		<script src="~./js/lib/kendo.ui.core.min.js" /> <!-- kendo Libray -->
		<script src="~./js/lib/kendo.combobox.min.js" /> <!-- kendo Libray -->
        <link href="~./css/kendo.common-material.min.css" rel="stylesheet" /> <!-- kendo css -->
        <link href="~./css/kendo.material.min.css" rel="stylesheet" /> <!-- kendo css -->
		<script src="~./js/data-kendo-combobox.js" /> <!-- Data Handler Script -->
	</data-handler>
</client-config>
```
In ***data-kendo-combobox.js***

```javascript
function(wgt, dataValue) {
	//Init kendo UI combobox
	var $w = jq(wgt.$n());
	$w.kendoComboBox();

	//Deal with invalidate()
	$w.hide();
}
```

##License
* datahandler-kendo-combobox - [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0)
* [Kendo UI Core](http://www.telerik.com/download/kendo-ui-core) - [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0)

