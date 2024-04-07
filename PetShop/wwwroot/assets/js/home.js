
let pages_category = document.querySelector(".pages_category")
let pages = document.querySelector(".pages_category_position")

pages.addEventListener("mouseover",function(event) {    
    pages_category.classList.toggle("d-none")
    document.querySelector(".pages").addEventListener("click", function(event){
        // event.preventDefault()
    });
})

pages.addEventListener("mouseout",function(event) {    
    pages_category.classList.toggle("d-none")
    document.querySelector(".pages").addEventListener("click", function(event){
        // event.preventDefault()
    });
})

let elements_category = document.querySelector(".elements_category")
let elements = document.querySelector(".elements_category_position")

elements.addEventListener("mouseover",function(event) {    
    elements_category.classList.toggle("d-none")
    document.querySelector(".elements_category_position").addEventListener("click", function(event){
        // event.preventDefault()
    });
})

elements.addEventListener("mouseout",function(event) {    
    elements_category.classList.toggle("d-none")
    document.querySelector(".elements_category_position").addEventListener("click", function(event){
        // event.preventDefault()
    });
})


let sm_navbar = document.querySelector(".sm_navbar")
let burger = document.querySelector(".burger")
burger.onclick = function () {
    sm_navbar.classList.toggle("d-none")
    burger.classList.toggle("fa-bars")
    burger.classList.toggle("fa-xmark")
}

let search = document.querySelector(".search")
let search_icon = document.querySelector(".search_icon")

search_icon.onclick = function () {
    search.classList.toggle("d-none")
}

const fixedHeader = document.querySelector(".bottom_header");
// const fixedCateogry =  document.querySelector(".pages_category");
window.addEventListener("scroll" , function(){
    if (this.window.scrollY > 118) {
        fixedHeader.classList.add("fixed_header")
        // fixedCateogry.classList.add("fixed_category")

    }
    else{
        fixedHeader.classList.remove("fixed_header")
        // fixedCateogry.classList.remove("fixed_category")

    }    
})



$("#slider-range").slider({
    range: true,
    min: 0,
    max: 999,
    step: 1,
    values: [0, 999],
    slide: function(event, ui) {
        var min = Math.floor(ui.values[0]);
        $('.slider-time').html('$' + min);

        var max = Math.floor(ui.values[1]);
        $('.slider-time2').html('$' + max);

        $('.box').each(function() {
            var value = $(this).data('start-time');
            
            if (value >= min && value <= max) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }
});
