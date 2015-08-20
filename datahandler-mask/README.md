# Data Handler - mask

##Introduction
Make masks on ZK Component - [Textbox](http://books.zkoss.org/wiki/ZK_Component_Reference/Input/Textbox).

##How to use
In ***pom.xml***
```xml
<dependency>
    <groupId>org.zkoss</groupId>
    <artifactId>datahandler-mask</artifactId>
    <version>1.0.0</version>
</dependency>
```

In ***.zul***
```xml
<zk xmlns:ca="client/attribute">
    ...
    <textbox ca:data-mask="00:00:00"/>
    ...
</zk>
```
You can change the value of attribute (**ca:data-mask**) to specify the format.

##Implements
In ***zk.xml***
```xml
<client-config>
	<data-handler>
		<name>mask</name> <
		!-- data-mask -->
		<script src="~./js/lib/jquery.mask.min.js" /> <!-- jQuery Mask Plugin Library -->
		<script src="~./js/data-mask.js" /> <!-- Data Handler Script -->
	</data-handler>
</client-config>
```
In ***data-mask.js***

```javascript
function (wgt, dataValue) {
    // Init mask plugin. Notice that dataValue should be the format, ex.00:00:00.
	jq(wgt.$n()).mask(dataValue);
	// unformat after onChange event.
	wgt.listen({onChange: function (event) {
		event.data.value = jq(this.$n()).cleanVal();
	}});
}
```

##License
* datahandler-mask - [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0)
* [jQuery Mask Plugin](http://igorescobar.github.io/jQuery-Mask-Plugin/) - [MIT](https://github.com/igorescobar/jQuery-Mask-Plugin)
