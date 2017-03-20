.elementsById("<%= id %>").then(elements=>{
    if(elements.length==0){
        <%if(error){%>
        throw new Error(error)
        <%}else{%> 
        return null;
        <%}%> 
    }

    var call = function(index){
        <%if(mode=='first'){%>
            if(elements.length==index){
                <%if(error){%>
                throw new Error(error)
                <%}else{%> 
                return null;
                <%}%> 
            }
        <%}else{%> 
            if(-1==index){
                <%if(error){%>
                throw new Error(error)
                <%}else{%> 
                return null;
                <%}%> 
            }
        <%}%>

        <%if(cacheDesc){%>
        return elements[index].getProperty('<%=cacheTarget%>').then(function(desc){
            <%if(cacheTarget=="description"){%>
            var descObj = JSON.parse(desc.description);
            <%}else if(cacheTarget=="value"){%>
            var descObj = JSON.parse(desc);
            <%}else{%>
            var descObj = desc.text;
            <%}%>
            driver.cacheDescs.push(descObj);
             <%if(cacheElement){%>
                driver.cacheElements.push(elements[index]);
            <%}%>
            return elements[index];
        })
        <%}else{%> 
         <%if(cacheElement){%>
            driver.cacheElements.push(elements[index]);
         <%}%>
            return elements[index];
        <%}%>
    }
    if(elements.length>0){
        <%if(mode=='first'){%>
            return call(0);
        <%}else{%> 
            return call(elements.length-1);
        <%}%>
    }
                
})