.elementsByClassName("<%= className %>").then(function(e){
    if(elements.length><%=index-1%>){
        return elements[<%=index-1%>].touch('tap');
    }
})