const input = document.querySelector(".item-input");
const submit = document.querySelector(".btn-submit");
const listItem = document.querySelector(".list-item");
const cartItem = document.querySelector(".list-cart");

const createElement = (item, type, icon) => {
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
    newBtn.innerHTML = `<i class='fa ${icon}'></i>`;
    newDiv.appendChild(newBtn);

    if(type == "cart-btn") {
        // append to listItem
        listItem.appendChild(newDiv);
    }else {
        cartItem.appendChild(newDiv);
    }
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
    data.push(input.value.toLowerCase());
    createElement(input.value, "cart-btn", "fa-cart-plus");
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
    if(localStorage.getItem("cart-list") === null) {
        cartList = [];
    }else {
        cartList = JSON.parse(localStorage.getItem("cart-list"));
    }

    // show data 
    data.forEach((i) => {
        createElement(i, "cart-btn", "fa-cart-plus");
    });

    // show cart list
    cartList.forEach((i) => {
        createElement(i, "trash-btn", "fa-trash");
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
        data.splice(data.indexOf(index), 1);

        btn.parentElement.classList.add("slide-out");
        btn.parentElement.addEventListener("transitionend", () => {
            btn.parentElement.remove();
        });

        createElement(index, "trash-btn", "fa fa-trash");
        cartList.push(index);

        localStorage.setItem("list-item", JSON.stringify(data));
        localStorage.setItem("cart-list", JSON.stringify(cartList));
    }
}

const removeCart = (e) => {
    const btn = e.target;
    if(btn.classList.contains("trash-btn")) {
        const index = btn.parentElement.children[0].innerText.toLowerCase();
        cartList = JSON.parse(localStorage.getItem("cart-list"));
        
        cartList.splice(cartList.indexOf(index), 1);
        btn.parentElement.remove();

        localStorage.setItem("cart-list", JSON.stringify(cartList));
    }
}

submit.addEventListener("click", addItem);
window.addEventListener("DOMContentLoaded", getData);
listItem.addEventListener("click", addToCart);
cartItem.addEventListener("click", removeCart);