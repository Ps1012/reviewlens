setTimeout(() => {
    document.querySelectorAll("details").forEach((ele)=>{
        if(ele.getAttribute("val")==""){
            ele.remove()
        }
    })
}, 1000);