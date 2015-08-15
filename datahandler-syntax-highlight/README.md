# Data Handler - syntax-highlight
##Introduction
Do syntax highlighting on ZK Component - [Label](http://books.zkoss.org/wiki/ZK_Component_Reference/Essential_Components/Label).

##How to use
In ***pom.xml***
```xml
<dependency>
    <groupId>org.zkoss</groupId>
    <artifactId>datahandler-syntax-highlight</artifactId>
    <version>1.0.0</version>
</dependency>
```

In ***.zul***
```xml
<zk xmlns:ca="client/attribute">
    ...
    <label ca:data-syntax-highlight="true" multiline="true" pre="true" />
    ...
</zk>
```
Set the attribute "*pre*" *true* to reserve spaces.

##Implements
In ***zk.xml***
```xml
<client-config>
	<data-handler>
		<name>syntax-highlight</name> <!-- data-syntax-highlight -->
		<depends>~./js/lib/highlight.min.js</depends> <!-- highlight.js Library -->
        <links href="~./css/default.min.css" rel="stylesheet" /> <!-- highlight.js css -->
		<script src="~./js/data-syntax-highlight.js" />  <!-- Data Handler Script -->
	</data-handler>
</client-config>
```
In ***data-syntax-highlight.js***

```javascript
function (wgt, dataValue) {
	//Reserve breakline
	hljs.configure({useBR: true});
	//Init highlightjs
	hljs.highlightBlock(wgt.$n());
	//Do highlighting after the wgt value has been set
	wgt.setOverride("setValue", function(value) {
		this.$setValue(value);
		hljs.highlightBlock(wgtDOM);
	});
}
```

##License
* datahandler-syntax-highlight - [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0)
* [highlight.js](https://highlightjs.org/) - [BSD](https://github.com/isagalaev/highlight.js)