# Data Handler - sticking
##Introduction
Make ZK Components sticky, the component would be always visible when the user scrolls.

##How to use
In ***pom.xml***
```xml
<dependency>
    <groupId>org.zkoss</groupId>
    <artifactId>datahandler-sticking</artifactId>
    <version>1.0.0</version>
</dependency>
```

In ***.zul***
```xml
<zk xmlns:ca="client/attribute">
    ...
    <div ca:data-sticking="true">
    ...
</zk>
```
You can change the value of attribute (**ca:data-sticking**) to specify the options.
See more on the website [sticky-kit](http://leafo.net/sticky-kit/).

##Implements
In ***zk.xml***
```xml
<client-config>
		<data-handler>
			<name>sticking</name> <!-- data-sticking -->
			<script src="~./js/lib/jquery.sticky-kit.min.js" /> <!-- sticky-kit Library -->
            <script src="~./js/data-sticking.js" /> <!-- Data Handler Script -->
		</data-handler>
	</client-config>
```
In ***data-sticking.js***

```javascript
function (wgt, dataValue) {
	//Init sticking with options
	var options = dataValue.length > 0 ? $.evalJSON(dataValue) : {};
	jq(wgt.$n()).stick_in_parent(options);
}
```

##License
* datahandler-sticking - [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0)
* [Showdown](http://leafo.net/sticky-kit/) - [WTFPL](https://github.com/leafo/sticky-kit)
