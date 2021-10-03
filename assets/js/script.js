const input = document.querySelector(".item-input");
const submit = document.querySelector(".btn-submit");
const listItem = document.querySelector(".list-item");

const createElement = (item, type) => {
    // div
    const newDiv = document.createElement("div");
    newDiv.classList.add("item");

    // li
    const newLi = document.createElement("li");
    newLi.classList.add("item-name");
    newLi.innerText = item;
    newDiv.appendChild(newLi);

    // button
    const newBtn = document.createElement("button");
    newBtn.classList.add("btn", type);
    newBtn.innerHTML = "<i class='fa fa-cart-plus'></i>";
    newDiv.appendChild(newBtn);

    // append to listItem
    listItem.appendChild(newDiv);
}

const addItem = (e) => {
    e.preventDefault();

    // check local storage
    if (localStorage.getItem("list-item") === null) {
        data = [];
    } else {
        data = JSON.parse(localStorage.getItem("list-item"));
    }

    // check input
    if (input.value === "") {
        return alert("Harus diisi");

    }

    // check itemName
    const items = listItem.childNodes;
    for (i = 0; i < items.length; i++) {
        const itemName = items[i].children[0].innerText;

        if (input.value.toLowerCase() == itemName.toLowerCase()) {
            input.value = "";
            return alert(itemName + " Sudah ada");
        }
    }

    // add data
    data.push(input.value);
    createElement(input.value, "cart-btn");
    localStorage.setItem("list-item", JSON.stringify(data));

    input.value = "";
}

const getData = () => {
    // check local storage
    if (localStorage.getItem("list-item") === null) {
        data = [];
    } else {
        data = JSON.parse(localStorage.getItem("list-item"));
    }

    // show data
    data.forEach((i) => {
        createElement(i, "cart-btn");
    });
}

const addToCart = (e) => {
    const btn = e.target;
    if(btn.classList.contains("cart-btn")) {
        if(localStorage.getItem("cart-list") === null) {
            cartList = [];
        }else {
            cartList = JSON.parse(localStorage.getItem("cart-list"));
        }

        const index = btn.previousSibling.innerText.toLowerCase();
        const newCart = data.splice(data.indexOf(index), 1);
        btn.parentElement.remove();

        cartList.push(index);

        localStorage.setItem("list-item", JSON.stringify(data));
        localStorage.setItem("cart-list", JSON.stringify(cartList));
    }
}

submit.addEventListener("click", addItem);
window.addEventListener("DOMContentLoaded", getData);
listItem.addEventListener("click", addToCart);