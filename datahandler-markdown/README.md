# Data Handler - markdown
##Introduction
Use Markdown to HTML converter on ZK Component - [Label](http://books.zkoss.org/wiki/ZK_Component_Reference/Essential_Components/Label).

##How to use
In ***pom.xml***
```xml
<dependency>
    <groupId>org.zkoss</groupId>
    <artifactId>datahandler-markdown</artifactId>
    <version>1.0.0</version>
</dependency>
```

In ***.zul***
```xml
<zk xmlns:ca="client/attribute">
    ...
    <label ca:data-markdown="true" multiline="true" />
    ...
</zk>
```

##Implements
In ***zk.xml***
```xml
<client-config>
	<data-handler>
		<name>markdown</name> <!-- data-markdown -->
		<depends>~./js/lib/showdown.min.js</depends> <!-- showdown Library -->
		<script src="~./js/data-markdown.js" /> <!-- Data Handler Script -->
	</data-handler>
</client-config>
```
In ***data-markdown.js***

```javascript
function (wgt, dataValue) {
	var converter = new showdown.Converter();
	//Initial markdown conversion
	wgt.$n().innerHTML = converter.makeHtml(wgt.getValue());
	//Do markdown conversion after value of the wgt has been set
	wgt.setOverride("setValue", function(value) {
		this.$setValue(value);
		this.$n().innerHTML = converter.makeHtml(value);
	});
}
```

##License
* datahandler-markdown - [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0)
* [Showdown](https://github.com/showdownjs/showdown) - see [Github](https://github.com/showdownjs/showdown/blob/master/license.txt)
