
function fixDocumentSet() {
    var clientContext = SP.ClientContext.get_current();
    var ids = SP.ListOperation.Selection.getSelectedItems(ctx);
    var list = clientContext.get_web().get_lists().getById(SP.ListOperation.Selection.getSelectedList());
    var listItems = [];
    for (currentItemId in ids) {
        var itemSelected = list.getItemById(parseInt(ids[currentItemId].id));
        listItems.push(itemSelected);
        clientContext.load(itemSelected);
    }
    console.log(listItems)
    clientContext.executeQueryAsync(function () {
        for (i in listItems) {
            listItems[i].set_item("HTML_x0020_File_x0020_Type", "SharePoint.DocumentSet");
            listItems[i].update();
        }
        clientContext.executeQueryAsync(function () {
            console.log("DocSets Fixed")
        }
            , Function.createDelegate(this, this.onQueryFailed));
    }
        , Function.createDelegate(this, this.onQueryFailed));
}

function onQueryFailed(sender, args) {
    alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
}
