import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-c2ff7-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "things")
const shoppingListEl = document.getElementById("shopping-list");

let input = document.getElementById("input-field");
let button = document.getElementById("add-button");

button.addEventListener("click", function (){
    let inputValue = input.value;
    push(shoppingListInDB, inputValue)
    clearInput();
})

onValue(shoppingListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())

        clearShoppingListEl()

        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]

            addNewItem(currentItem)
        }
    } else {
        shoppingListEl.innerHTML = "No items here... yet"
    }
})
function clearInput (){
    input.value = "";
}

function clearShoppingListEl(){
    shoppingListEl.innerHTML = ""
}

function addNewItem(item){
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `things/${itemID}`) // Corrected reference here
        remove(exactLocationOfItemInDB)
    })

    shoppingListEl.append(newEl)
}

