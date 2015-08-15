# Data Handler - v-grid

##Introduction
Use Vaadin data grid on ZK.

##How to use
In ***pom.xml*** :
```xml
<dependency>
    <groupId>org.zkoss</groupId>
    <artifactId>datahandler-v-grid</artifactId>
    <version>1.0.0</version>
</dependency>
```

In ***.zul*** :
```xml
<zk xmlns:ca="client/attribute" xmlns:n="native" xmlns:x="xhtml" xmlns:sh="shadow">
    ...
    <div ca:data-v-grid="{mode:'multi'}" viewModel="@id('vm') @init('org.zkoss.VM')">
            <n:table>
                <n:colgroup>
                    <n:col header-text="#" width="70"/>
                    <n:col header-text="First Name" width="150"/>
                    <n:col header-text="Last Name" width="150"/>
                    <n:col header-text="Email" flex="1"/>
                </n:colgroup>
                <x:tbody>
                    <sh:forEach items="@load(vm.users)" varStatus="status">
                        <x:tr>
                            <n:td><label value="${status.index + 1}"/></n:td>
                            <n:td><label value="@init(each.firstName)"/></n:td>
                            <n:td><label value="@init(each.lastName)"/></n:td>
                            <n:td><label value="@init(each.email)"/></n:td>
                        </x:tr>
                    </sh:forEach>
                </x:tbody>
            </n:table>
        </div>
    ...
</zk>
```
You can change the value of attribute (**ca:data-v-grid**) to specify the mode (multiselection or single selection).

We use UI template injection to build the content, see [more](http://books.zkoss.org/wiki/Small_Talks/2015/February/ZK8_Series:_UI_Template_Injection).

This sample supports several v-grid events. You can use MVVM or MVC way to build the communication between client and server.

In ***VM.java***: ([example](https://github.com/DevChu/zk8-datahandler-demo/blob/master/src/main/java/org/zkoss/zkdatahandlerdemo/VGridVM.java))

```java
@NotifyCommand(value = "v-grid$syncClientSelection", onChange = "_vm_.selections")
@ToClientCommand({"v-grid$syncClientSelection"})
@ToServerCommand({"v-grid$syncServerSelection"})
public class VGridVM {
    private Set<Integer> selections; //transfer object
    //getter..

    @Command("v-grid$syncServerSelection")
    public void syncSelection(@BindingParam("selected") Integer[] selected, @BindingParam("deselected") Integer[] deselected) {
        //do something after the grid data seleted.
    }

    //some commands which select the data in model, and change the transfer object to synchronize selections in client.
}
```
The annotations of class would build the connection between server and client.

**@ToServerCommand**: Trigger command in server by client.  
**@ToClientCommand**: Trigger the aftercommand in client.  
**@NotifyCommand**: Trigger a command in viewmodel whenever the given expression changes at the server.

See more in [Client side binding API](http://books.zkoss.org/zk-mvvm-book/8.0/data_binding/client_binding_api.html).

##Implements
In ***zk.xml***
```xml
<client-config>
	<data-handler>
		<name>v-grid</name> <!-- data-v-grid -->
		<depends>~./js/lib/webcomponents-lite.js</depends>  <!-- vaadin webcomponent Library -->
        <links href="~./js/lib/vaadin-grid/vaadin-grid.html" rel="import" /> <!-- vaadin grid Library -->
        <script src="~./js/data-v-grid.js" /> <!-- Data Handler Script -->
	</data-handler>
</client-config>
```
In ***data-v-grid.js***

```javascript
function (wgt, dataValue) {
	//Creat vaadin grid
	var grid = document.createElement('v-grid');
	grid._lightChildren = null;
	var dom = wgt.$n();
	var firstChild = jq(dom).find('table')[0];
	dom.removeChild(firstChild);
	grid.appendChild(firstChild);
	dom.appendChild(grid);

	var settings = dataValue.length > 0 ? $.evalJSON(dataValue) : {},
		self = this;

	//Do setting after v-grid import ready
	HTMLImports.whenReady(function() {
		// Set the selection mode
		if (settings.mode == 'multi')
			grid.selection.mode = 'multi';

		// Events to server.
		// If using composer (MVC), it would trigger the Event Listeners.
		// If using view model (MVVM), it would trigger the Commands which have been indicated by the following annotation:
		// @ToServerCommand({"v-grid$syncServerSelection"})
		// Notice that the command name would be expanded by adding the prefix "v-grid" automatically.
		if (self.command) {
			grid.addEventListener("select", function() {
				var selected = grid.selection.selected(),
					deselected = grid.selection.deselected();
				if (selected.length != 0 || deselected.length != 0)
	    			self.command("$syncServerSelection", {selected: selected, deselected: deselected});
	        });
		}

		// Call back from server side (MVVM only). It works if the following annotations have been set:
		// @ToClientCommand({"v-grid$syncClientSelection"})
		// And use the following annotations to tranfer the data:
		// @NotifyCommand(value = "v-grid$syncClientSelection", onChange = "_vm_.selections")
		// Notice that the aftercommand name would be expanded by adding the prefix "v-grid" automatically.
		if (self.after) {
			self.after('$syncClientSelection', function (evt) {
				if (evt != null) {
					for (var i = 0; i < evt.length; i++) {
						grid.selection.select(evt[i]);
					}
				}
			});
	    }
	});
	
}
```
See more supported events - [v-grid API](http://vaadin.github.io/components-apidoc/#v-grid).
##License
* datahandler-v-grid - [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0)
* [Vaadin Components](https://github.com/vaadin/components) - [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0)