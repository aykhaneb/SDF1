function GetCards() {
  let productlist = JSON.parse(localStorage.getItem("Cards"));
  let x = "";

  productlist.forEach((product) => {
    x += `
            <tr>
                <td>
                    <img
                      src="${product.Image}"
                      alt=""
                    />
                    <a href="">${product.Product}</a>
                  </td>
                  <td class="text-center">$${product.Price}</td>
                  <td class="text-center"><input id="productinput" type="number" min="1" value="${
                    product.Count
                  }"></td>
                  <td class="text-center">$${
                    Number(product.Count) * Number(product.Price)
                  }</td>
                <td><button class="btn">Delete</button></td>
                </tr>
        `;
  });

  document.querySelector(".tbody").innerHTML = x;

  if (productlist.length === 0) {
    document.querySelector(".foralert").classList.remove("d-none");
    document.querySelector("table").classList.add("d-none");
    document.querySelector(".checkout").classList.add("d-none")
  } else {
    document.querySelector(".foralert").classList.add("d-none");
    document.querySelector("table").classList.remove("d-none");
    document.querySelector(".checkout").classList.remove("d-none")
  }
}

GetCards();

let cardlist = JSON.parse(localStorage.getItem('Cards'));
let deleteButtons = document.querySelectorAll('.btn.delete');
let productInputs = document.querySelectorAll('#productinput');

function updateTable() {
    let tableBody = document.querySelector('tbody');
    tableBody.innerHTML = '';

    cardlist.forEach(product => {
        let row = document.createElement('tr');

        let productCell = document.createElement('td');
        let productImage = document.createElement('img');
        productImage.src = product.Image;
        productImage.alt = '';
        let productNameLink = document.createElement('a');
        productNameLink.href = '';
        productNameLink.textContent = product.Product;
        productCell.appendChild(productImage);
        productCell.appendChild(productNameLink);

        let priceCell = createTableCell('text-center', `$${product.Price}`);
        let countCell = createTableCell('text-center');
        let countInput = document.createElement('input');
        countInput.type = 'number';
        countInput.min = '1';
        countInput.value = product.Count;
        countInput.className = 'product-input';
        countInput.dataset.id = product.Id;
        countCell.appendChild(countInput);

        let totalCell = createTableCell('text-center', `$${(product.Count * product.Price).toFixed(2)}`);

        let deleteCell = document.createElement('td');
        let deleteButton = document.createElement('button');
        deleteButton.className = 'btn delete';
        deleteButton.textContent = 'Delete';
        deleteCell.appendChild(deleteButton);

        row.appendChild(productCell);
        row.appendChild(priceCell);
        row.appendChild(countCell);
        row.appendChild(totalCell);
        row.appendChild(deleteCell);

        tableBody.appendChild(row);
    });

    deleteButtons = document.querySelectorAll('.btn.delete');
    productInputs = document.querySelectorAll('.product-input');

    deleteButtons.forEach(button => {
        button.addEventListener('click', deleteProduct);
    });

    productInputs.forEach(input => {
        input.addEventListener('input', updateProductCount);
    });
}

function createTableCell(className, content) {
    let cell = document.createElement('td');
    cell.className = className;
    cell.textContent = content;
    return cell;
}

function deleteProduct() {
    let id = this.parentElement.parentElement.querySelector('input.product-input').dataset.id;
    cardlist = cardlist.filter(product => product.Id !== id);
    localStorage.setItem('Cards', JSON.stringify(cardlist));
    updateTable();
}

function updateProductCount() {
    let id = this.dataset.id;
    let count = Number(this.value);
    let product = cardlist.find(p => p.Id === id);

    if (product) {
        product.Count = count;
        localStorage.setItem('Cards', JSON.stringify(cardlist));
        updateTable();
    }
}

updateTable();
