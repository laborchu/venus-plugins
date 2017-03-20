.elementByXPathOrNull("<%= xpath %>").then(function(e){
    if(e){
        return e.touch('tap');
    }
})