
//restDB variables
var foodURL = "https://majorwork-d533.restdb.io/rest/menu-items"
var apikey = "629eaf96c4d5c3756d35a5e5"

function selectionSort(array){
    for(var i = 0; i <array.length; i++){
        //store smallest index
        var min = i;
        for(var j = i+1; j < array.length; j++){
            if(array[j].price<array[min].price){
                min = j;
            }
        }
        var temp = array[i];
        array[i] = array[min];
        array[min] = temp;
    }
    return array;
};

//Menu display thingy
function getFood(url,apikey){
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "x-apikey": apikey,
            "cache-control": "no-cache"
        }
    }
    
    $.ajax(settings).done(function (response) {
        console.log(response);
        selectionSort(response);
        var foodItems = '<div class="foodContainer" id="foodContainer">'
        for(var i=0; i<response.length; i++){
            console.log(response[i].itemName);
            foodItems += '<div class="food" id=" '+ response[i]._id + '">' 
            foodItems += '<div class="itemName" id=" ' + response[i].itemName + '">' + response[i].itemName + '</div>'
            foodItems += '<div class="price"> '+ " price: $" + response[i].price + '</div>'
            foodItems += '<div class="quantity">' + "quantity: " + '<input type="number" id="quantity' + response[i]._id + '" class="quantity" min="1" max="5" value="0"> </div>' 
            foodItems += "</div>";
            //<img src="' + response[i].ImgURL + '">' + response[i].Name + 
        }
        foodItems += "</div>"
        $("body").append(foodItems);
    });
}

getFood(foodURL,apikey);


//TODO: On dropdown change, call getFood again. Make sure to clean the current html

//all of my arrays
var arrCoffeeTypes = ["espresso", "long black", "flat white", "latte", "cappuccino", "mocha", "chai latte", "dirty chai", "hot chocolate", "babycino"];

var arrMilkTypes = ["full-fat", "skim", "soy", "almond", "oat"];

var arrSize = ["small", "medium", "large"];

var arrTempLevel = ["iced", "warm", "normal", "extra hot", "super-duper hot"];

var arrFullOrder = [" "]

//calling arrays to display in drop-down menus

function loadCoffeeTypes() {
    for (var i = 0; i < arrCoffeeTypes.length; i++) {
        var tempString = "<option value='" + arrCoffeeTypes[i] + "' > " + arrCoffeeTypes[i] + " </option>";
        $('#coffeeType').append(tempString);
    }
}

loadCoffeeTypes();

function loadMilkTypes() {
    for (var i = 0; i < arrMilkTypes.length; i++) {
        var tempString = "<option value='" + arrMilkTypes[i] + "' > " + arrMilkTypes[i] + " </option>";
        $('#milkType').append(tempString);
    }
}

loadMilkTypes();

function loadSize() {
    for (var i = 0; i < arrSize.length; i++) {
        var tempString = "<option value='" + arrSize[i] + "' > " + arrSize[i] + " </option>";
        $('#size').append(tempString);
    }
}

loadSize();

function loadTempLevel() {
    for (var i = 0; i < arrTempLevel.length; i++) {
        var tempString = "<option value='" + arrTempLevel[i] + "' > " + arrTempLevel[i] + " </option>";
        $('#tempLevel').append(tempString);
    }
}

loadTempLevel();

//all the stuff for the navigation bar code and switching pages


$("#homePage").show();
$("#viewMenu").hide();
$("#orderHere").hide();
$("#aboutUs").hide();
$("#foodContainer").hide();

function resetActiveNav() {
    document.getElementById("homeTab").classList.remove("active")
    document.getElementById("ourMenu").classList.remove("active")
    document.getElementById("orderForm").classList.remove("active")
    document.getElementById("aboutCafe").classList.remove("active")
}

$("#homeTab").click(function () {
    resetActiveNav();
    document.getElementById("homeTab").classList.add("active")
    $("#viewMenu").hide();
    $("#orderHere").hide();
    $("#aboutUs").hide();
    $("#homePage").show();
    $("#foodContainer").hide();
});

$("#ourMenu").click(function () {
    resetActiveNav();
    document.getElementById("ourMenu").classList.add("active")
    $("#homePage").hide();
    $("#orderHere").hide();
    $("#aboutUs").hide();
    $("#viewMenu").show();
    $("#foodContainer").show();
    $("#foodContainer").css("display","flex");
});

$("#orderForm").click(function () {
    resetActiveNav();
    document.getElementById("orderForm").classList.add("active")
    $("#viewMenu").hide();
    $("#homePage").hide();
    $("#aboutUs").hide();
    $("#orderHere").show();
    $("#foodContainer").hide();
});
$("#aboutCafe").click(function () {
    resetActiveNav();
    document.getElementById("aboutCafe").classList.add("active")
    $("#viewMenu").hide();
    $("#orderHere").hide();
    $("#homePage").hide();
    $("#aboutUs").show();
    $("#foodContainer").hide();

});


/*to complete order and send it to owner

When button(completeOrder) = clicked:
    console.log (all inputs) --> for now

*/
$("#completeOrder").click(function () {
    console.log("the customer name is: " + document.getElementById("customerName").value)
    console.log("the customer phone number is: " + document.getElementById("customerPhone").value)
    console.log("the coffee type is: " + document.getElementById("coffeeType").value)
    console.log("the milk type is: " + document.getElementById("milkType").value)
    console.log("the drink size is: " + document.getElementById("size").value)
    console.log("the drink temperature is: " + document.getElementById("tempLevel").value)
    if(document.getElementById("decaf").checked){
        console.log("is there decaf? " + document.getElementById("decaf").value)
    } 
    if(document.getElementById("noDecaf").checked){
        console.log("is there decaf? " + document.getElementById("noDecaf").value)
    };
    console.log("the amount of sugars is: " + document.getElementById("sugars").value)
    if(document.getElementById("paymentPaperMoney").checked){
        console.log("payment type: " + document.getElementById("paymentPaperMoney").value)
    } 
    if(document.getElementById("paymentOnlineMoney").checked){
        console.log("payment type: " + document.getElementById("paymentOnlineMoney").value)
    }
})

//Coding the sorts for the selector




//actual sorting of db

if(document.getElementById("sortMenuBy")== document.getElementById("alphabetical")){
    selectionSort(foodURL, itemName)
}
