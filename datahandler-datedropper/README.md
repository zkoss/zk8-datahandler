# Data Handler - datedropper
##Introduction
DATEDROPPER IS A JQUERY PLUGIN THAT PROVIDES A QUICK AND EASY WAY TO MANAGE DATES FOR INPUT FIELDS. Use on ZK Component -  [Textbox](http://books.zkoss.org/wiki/ZK_Component_Reference/Input/Textbox).

##How to use
In ***pom.xml***
```xml
<dependency>
    <groupId>org.zkoss</groupId>
    <artifactId>datahandler-datedropper</artifactId>
    <version>1.0.0</version>
</dependency>
```

In ***.zul***
```xml
<zk xmlns:ca="client/attribute">
    ...
    <textbox ca:data-datedropper='{ format:"d-m-Y",color:"#5CB1BB" }'></textbox>
    ...
</zk>
```
You can change the value of attribute (**ca:data-datedropper**) to specify the settings *(see [Datedropper API - option](http://felicegattuso.com/projects/datedropper/))*.

##Implements
In ***zk.xml***
```xml
<client-config>
	<data-handler>
        <name>datedropper</name> <!-- data-datepicker -->
        <link href="~./css/datedropper.css" rel="stylesheet" /> <!-- DateDropper theme css -->
         <script src="~./js/datedropper.js" />  <!-- DateDropper Script -->
        <script src="~./js/data-datedropper.js" />  <!-- Data Handler Script -->
    </data-handler>
</client-config>
```
In ***data-datedropper.js***

```javascript
function(wgt, dataValue) {
    options = dataValue.length > 0 ? $.evalJSON(dataValue) : {};
    jq(wgt.$n()).dateDropper(options);
}
```
##License
* datahandler-datedropper - [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0)
* [Datedropper](http://felicegattuso.com/projects/datedropper/) - [MIT](http://opensource.org/licenses/mit-license.html)