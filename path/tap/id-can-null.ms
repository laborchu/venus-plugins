.elementsByIdOrNull("<%= id %>").then(function(elements){
    if(elements.length><%=index-1%>){
        return elements[<%=index-1%>].touch('tap');
    }
})