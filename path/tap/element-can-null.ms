.then(element=>{
    if(element!=null){
        return element.touch('tap');
    }else{
        return this;
    }
})