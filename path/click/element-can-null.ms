.then(element=>{
    if(element!=null){
        return element.click();
    }else{
        return this;
    }
})