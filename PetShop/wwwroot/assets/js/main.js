let box_bottoms = document.querySelectorAll(".box_bottom")
for(let btn of box_bottoms){
    btn.onclick = function () {
        let active_box = document.querySelector(".active")
        active_box.classList.remove("active")
        this.classList.add("active")

        let id = this.getAttribute('data-id')

        let contents = document.querySelectorAll(".top_user")

        for(let box of contents){
            if (id===box.id) {
                box.classList.remove("d-none")
            }
            else{
                box.classList.add("d-none")
            }
        }
    }
}



let digits = document.querySelectorAll(".digits")
for(let digit of digits){
    digit.onclick = function () {
        let digit_color = document.querySelector(".digit_color")
        digit_color.classList.remove("digit_color")
        this.classList.add("digit_color")

        let id = this.getAttribute('data-id')

        let missions = document.querySelectorAll(".missions")

        for(let mission of missions){
            if (id===mission.id) {
                mission.classList.remove("d-none")
            }
            else{
                mission.classList.add("d-none")
            }
        }
    }
}

let accordianHead = Array.from(document.querySelectorAll(".accordian_head"));

accordianHead.map((item) =>
  item.addEventListener("click", () => {
    closeAllAccordian(item);
  })
);

function closeAllAccordian(current_target) {
  console.log(current_target);
  accordianHead.map((item) => {
    if (current_target !== item) {
      const accordianBody = item.nextElementSibling;
      const togglerBtn = item.firstElementChild;
      togglerBtn.classList.remove("active");
      accordianBody.classList.remove("active_body");
    } else {
      const accordianBody = current_target.nextElementSibling;
      const togglerBtn = item.firstElementChild;
      togglerBtn.classList.toggle("active");
      accordianBody.classList.toggle("active_body");
    }
  });
}



// let box_tab_offer_all = document.querySelector(".box_tab_offer_all")
// let phag = document.querySelector(".phag")
// for(let btn of box_tab_offer_all){
//     box_tab_offer_all.onclick = function () {
//         phag.classList.toggle("d-none")
//         let active_box = document.querySelector(".active")
//         active_box.classList.remove("active")
//         this.classList.add("rotate")

//         let id = this.getAttribute('data-id')

//         let contents = document.querySelectorAll(".phag")

//         for(let box of contents){
//             if (id===box.id) {
//                 box.classList.remove("d-none")
//             }
//             else{
//                 box.classList.add("d-none")
//             }
//         }
//     }
// }
var element = document.querySelectorAll(".phag");
for(let tabs of element){
    function myFunction() {
        element.classList.toggle("d-none");
    }
}

let text_goals = document.querySelectorAll(".text_goals")
for(let goals of text_goals){
    goals.onclick = function () {
       
        let active_tab = document.querySelector(".tab")
        active_tab.classList.remove("tab")
        this.classList.add("tab")

        let id = this.getAttribute('data-id')

        let bottom_goals = document.querySelectorAll(".bottom_goals")

        for(let bottom of bottom_goals){
            if (id===bottom.id) {
                bottom.classList.remove("d-none")
            }
            else{
                bottom.classList.add("d-none")
            }
        }
    }
}

let bottom_imgs = document.querySelectorAll(".rep");
let top_img = document.querySelector(".top_img img");
let currentTopImage = top_img.src;

for (let img of bottom_imgs) {
    img.onclick = function () {
        let clickedImageSrc = this.src;

        if (clickedImageSrc !== currentTopImage) {
            top_img.src = clickedImageSrc;
            currentTopImage = clickedImageSrc;
        }

        console.log(this.src);

        let border_red = document.querySelector(".border_red");
        border_red.classList.remove("border_red");
        this.classList.add("border_red");
    };
}





//    let loadMoreBtn = document.querySelector('#load-more');
// let currentItem = 3;
//     loadMoreBtn.onclick = () =>{
//    let boxes = [...document.querySelectorAll('.container .content_blog .col-lg-4')];
//    for (var i = currentItem; i < currentItem + 3; i++){
//       boxes[i].style.display = 'inline-block';
//    }
//    currentItem += 3;

//    if(currentItem >= boxes.length){
//       loadMoreBtn.style.display = 'none';
//    }
// }


let types = document.querySelectorAll(".types")
for(let type of types){
    type.onclick = function () {
        let type_color = document.querySelector(".type_color")
        type_color.classList.remove("type_color")
        this.classList.add("type_color")

        let id = this.getAttribute('data-id')

        let row = document.querySelectorAll(".content_type .row")

        for(let box of row){
            if (id===box.id) {
                box.classList.remove("d-none")
            }
            else{
                box.classList.add("d-none")
            }
        }
    }
}



   

 
