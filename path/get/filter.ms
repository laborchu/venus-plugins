.elementsById("<%= id %>").then(elements=>{
    if(elements.length==0){
        <%if(error){%>
        throw new Error(error)
        <%}else{%> 
        return null;
        <%}%> 
    }

    <%if(isExp){%>
    let value = <%=filter.value%>;
    <%}else{%> 
    let value = '<%=filter.value%>';
    <%}%> 

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

        return elements[index].getProperty('<%=filter.target%>').then(function(desc){
                let cmpV = "";
                let cacheV;
                <%if(filter.target=="description"){%>
                    cacheV = JSON.parse(desc.description);
                    cmpV = cacheV['<%=filter.property%>']
                <%}else if(filter.target=="value"){%>
                    <%if(filter.property){%>
                        cacheV = JSON.parse(desc);
                        cmpV = cacheV['<%=filter.property%>']
                    <%}else{%>
                        cacheV = desc;
                        cmpV = desc.replace(/(^\\s*)|(\\s*$)/g, "");
                    <%}%>   
                <%}else{%>
                    cmpV = desc.text;
                    cacheV = desc.text;
                <%}%>

                <%if(cacheElement){%>
                    driver.cacheElements.push(elements[index]);
                <%}%>
                <%if(cacheDesc){%>
                    driver.cacheDescs.push(cacheV);
                <%}%>

                let compResult = false;
                <%if(filter.op=="=="||filter.op==">"||filter.op=="!="){%>
                    compResult = (cmpV<%=filter.op%>value);
                <%}else if(filter.op=="in"){%>
                    compResult = (value.indexOf(cmpV) > -1);
                <%}%>

                if(compResult){
                    return elements[index];
                }else{
                    <%if(mode=='first'){%>
                        return call(++index);
                    <%}else{%> 
                        return call(--index);
                    <%}%>
                }
                
            })
    }

    if(elements.length>0){
        <%if(mode=='first'){%>
        return call(0);
        <%}else{%> 
        return call(elements.length-1);
        <%}%>
    }
                
})