if(localStorage.getItem('Cards') == null) {
    localStorage.setItem('Cards', JSON.stringify([]))
}

let cardbtns = document.querySelectorAll('.card_product button')

for(let cardbtn of cardbtns) {
    cardbtn.onclick = function() {
        let cardlist = JSON.parse(localStorage.getItem('Cards'))

        let id = this.parentElement.parentElement.id
        let src = this.parentElement.previousElementSibling.firstElementChild.src
        let product = this.previousElementSibling.previousElementSibling.firstElementChild.innerHTML
        let price = this.previousElementSibling.firstElementChild.firstElementChild.innerHTML

        let existCard = cardlist.find(product => product.Id === id)

        if(existCard == undefined) {
            cardlist.push({
                Id: id,
                Image: src,
                Product: product,
                Price: price,
                Count: 1,
            })

            document.querySelector(".toaster").innerHTML = 'Successfully Added'
            document.querySelector(".toaster").style.backgroundColor = 'green'
         }

        else{
            existCard.Count += 1
            document.querySelector(".toaster").innerHTML = 'Already Added'
            document.querySelector(".toaster").style.backgroundColor = 'red'
        }

        document.querySelector(".toaster").style.right = '3%'
        setTimeout(() => {
            document.querySelector(".toaster").style.right = '-40%'
        }, 1200);
        localStorage.setItem('Cards', JSON.stringify(cardlist))
        ShowCount()
    }
}

function ShowCount() {
    let countttt = document.querySelectorAll('.all_basket a span');
let cardlist = JSON.parse(localStorage.getItem('Cards'));

countttt.forEach((baskett, index) => {
    baskett.textContent = cardlist.length;
});

}
ShowCount()




