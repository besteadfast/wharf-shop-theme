const accordionElts = document.querySelectorAll(".accordion");
const accordions = Array.from(accordionElts).map((accordion) => {
    return {
      accordion: accordion,
      accordionItems: accordion.querySelectorAll(".accordion__trigger"),
      currOpenId: null
    };
})
let accordionItems = document.querySelectorAll(".accordion__trigger");
let currOpenId = null;
console.log(accordions)
accordions.forEach( function( accordion){
    accordion.accordionItems.forEach( function (element, id) {
        element.addEventListener("click", function() {
            console.log("here")
            //if other acc is open, close it
            if(accordion.currOpenId && accordion.currOpenId !== this.id){
                let open = document.querySelector("#" + accordion.currOpenId)
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
                accordion.currOpenId = null
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                accordion.currOpenId = this.id;
            }
        });
    });
});

let content = document.querySelector('.content-dependant');
window.addEventListener('resize', function() {
    if(window.innerWidth >= "1024"){
        content.style.removeProperty("max-height");
        return
    }
    if(content.style.maxHeight === content.scrollHeight + "px" || content.style.maxHeight === 0){
        return
    }
    else{
        content.style.maxHeight = content.scrollHeight + "px";
    }
}, {passive: true})
