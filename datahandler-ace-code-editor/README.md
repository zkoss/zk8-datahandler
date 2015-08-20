# Data Handler - ace-code-editor
##Introduction
Use Ace code editor on ZK Component - [Textbox](http://books.zkoss.org/wiki/ZK_Component_Reference/Input/Textbox).

##How to use
In ***pom.xml***
```xml
<dependency>
    <groupId>org.zkoss</groupId>
    <artifactId>datahandler-ace-code-editor</artifactId>
    <version>1.0.0</version>
</dependency>
```

In ***.zul***
```xml
<zk xmlns:ca="client/attribute">
    ...
    <textbox id="ace" ca:data-ace-code-editor="{theme:'ace/theme/twilight', mode:'ace/mode/javascript'}" multiline="true"/>
    ...
</zk>
```
You can change the value of attribute (**ca:data-ace-code-editor**) to specify the settings *(theme & mode)*.

Notice that you can customize the style by overriding the class name - ***.data-ace*** .

##Implements
In ***zk.xml***
```xml
<client-config>
	<data-handler>
		<name>ace-code-editor</name> <!-- data-ace-code-editor -->
		<link href="~./css/data-ace-code-editor.css" rel="stylesheet" /> <!-- custom css -->
		<script src="~./js/lib/ace.js" /> <!-- ace.js Library -->
		<script src="~./js/data-ace-code-editor.js" /> <!-- Data Handler Script -->
	</data-handler>
</client-config>
```
In ***data-ace-code-editor.js***

```javascript
function (wgt, dataValue) {
	//Create a Div to init Ace
	var wgtDOM = wgt.$n(),
		editor_id = 'zk-ace-code-editor',
		div = document.createElement('div'),
		old = document.getElementById(editor_id);
	if (old) old.remove();
	jq(wgtDOM).hide();
	div.setAttribute('id', editor_id);
	div.setAttribute('class', 'data-ace');
	jq(div).insertAfter(wgtDOM);
	var editor = ace.edit(editor_id);

	//settings
	var settings = dataValue.length > 0 ? $.evalJSON(dataValue) : {};
	if (settings.theme)
		editor.setTheme(settings.theme);
	if (settings.mode)
		editor.getSession().setMode(settings.mode);

	//Set the default value
	editor.getSession().setValue(wgt.getValue());
	//Synchronize the value
	editor.getSession().on('change', function(){
		wgt.setValue(editor.getSession().getValue());
		wgt.fireOnChange();
	});
}
```
In ***data-ace.css***

```css
.data-ace {
	margin: 0;
	position: relative;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	width: 500px; /* default width */
    height: 400px; /* default height */
}
```


##License
* datahandler-ace-code-editor - [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0)
* [Ace](http://ace.c9.io/) - [BSD](https://github.com/ajaxorg/ace)