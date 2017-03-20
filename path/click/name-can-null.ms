.elementByNameOrNullkeycode("<%= name %>").then(function(e){
    if(e){
        return e.click();
    }
})