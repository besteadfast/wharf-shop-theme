let accordionItems = document.querySelectorAll("button.accordion__trigger");
let currOpenId = null;
accordionItems.forEach( function (element, id) {
    element.addEventListener("click", function() {
        console.log("event triggered")
        //if other acc is open, close it
        if(currOpenId && currOpenId !== this.id){
            let open = document.querySelector("#" + currOpenId)
            open.classList.toggle("accordion__trigger_active");
            let content = open.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        }
        //toggle open state of clicked acc
        this.classList.toggle("accordion__trigger_active");
        let content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            currOpenId = null
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
            currOpenId = this.id;
        }

    });
});

let content = document.querySelector('.content-dependant');
window.addEventListener('resize', function() {
    if(content.style.maxHeight === content.scrollHeight + "px" || content.style.maxHeight === 0){
        return
    }
    else{
        content.style.maxHeight = content.scrollHeight + "px";
    }
}, {passive: true})
