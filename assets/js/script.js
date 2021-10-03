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

    data.forEach((i) => {
        createElement(i, "cart-btn");
    });
}

submit.addEventListener("click", addItem);
window.addEventListener("DOMContentLoaded", getData)