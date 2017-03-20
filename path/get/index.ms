.elementsById("<%= id %>").then(elements=>{
    return elements[<%=index-1%>];
})