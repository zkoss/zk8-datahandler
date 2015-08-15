# Data Handler - introjs

##Introduction
Use step-by-step introduction on ZK page.

##How to use
In ***pom.xml***
```xml
<dependency>
    <groupId>org.zkoss</groupId>
    <artifactId>datahandler-introjs</artifactId>
    <version>1.0.0</version>
</dependency>
```

In ***.zul***
```xml
<zk xmlns:ca="client/attribute" xmlns:w="http://www.zkoss.org/2005/zk/client">
    ...
    <button class="btn btn-default" label="Start!" w:onClick="introJs().start();" />
    <div class="container" ca:data-introjs="false">
        <div class="top-buffer" ca:data-step="1" ca:data-intro="Ok, wasn't that fun?">
            ...
        </div>
        <div class="top-buffer" ca:data-step="2" ca:data-intro="Funny :D" ca:data-position="top">
            ...
        </div>
        <div class="top-buffer" ca:data-step="3" ca:data-intro="Really? Thanks!" ca:data-position="bottom">
            ...
        </div>
        <div class="top-buffer" ca:data-step="4" ca:data-intro="Wow! That's great!">
            ...
        </div>
    </div>
    ...
</zk>
```
You can change the value of attribute (**ca:data-introjs**) to specify whether to start introduction automatically or not, and use **ZK Client-side Event Handling** to start the introduction.

Then set these two attribute **ca:data-step** and **ca:data-intro** to specify the order and introductions.

##Implements
In ***zk.xml*** :
```xml
<client-config>
	<data-handler>
		<name>introjs</name> <!-- data-introjs -->
		<depends>~./js/lib/intro.js</depends> <!-- introjs Library -->
        <links href="~./css/introjs.css" rel="stylesheet" /> <!-- introjs css -->
        <script src="~./js/data-introjs.js" /> <!-- Data Handler Script -->
	</data-handler>
</client-config>
```
In ***data-introjs.js*** :

```javascript
function (wgt, dataValue) {
	//Start introjs immediately or not
	if (dataValue == 'true')
		introJs(wgt.$n()).start();
}
```
##License
* datahandler-introjs - [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0)
* [Intro.js](http://usablica.github.io/intro.js/) - see [Github](https://github.com/usablica/intro.js)

