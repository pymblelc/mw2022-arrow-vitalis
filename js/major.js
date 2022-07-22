
//restDB variables
var foodURL = "https://majorwork-d533.restdb.io/rest/menu-items"
var apikey = "629eaf96c4d5c3756d35a5e5"
var arrFoods;

//sort function
function selectionSort(array, direction){
    for(var i = 0; i <array.length; i++){
        //store smallest index
        var min = i;
        for(var j = i+1; j < array.length; j++){
            if(direction=='low'){
                if(array[j].price<array[min].price){
                    min = j;
                }

            }else{
                if(array[j].price>array[min].price){
                    min = j;
                }
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
    $("body").css("cursor", "progress");
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
        arrFoods = response;
        console.log(response);
        selectionSort(response,$('#sortMenuBy').val());
        var foodItems = ''
        for(var i=0; i<response.length; i++){
            console.log(response[i].itemName);
            foodItems += '<div class="food" id="'+ response[i]._id + '">' 
            foodItems += '<div class="itemName" id=" ' + response[i].itemName + '">' + response[i].itemName + '</div>'
            foodItems += '<div class="price"> '+ " price: $" + response[i].price + '</div>'
            foodItems += '<div class="quantity">' + "quantity: " + '<input type="number" id="quantity' + response[i]._id + '" class="quantity" min="1" max="5" value="0"> </div>' 
            foodItems += '<div>' + "<button type= " + '"addToOrder" class=' + '"addToCustomer">' + 'order' + "</button>" + "</div>"
            foodItems += "</div>";
            //<img src="' + response[i].ImgURL + '">' + response[i].Name + 
        }
        $("#foodContainer").html(foodItems);
        $("body").css("cursor", "default");
        for(var i=0; i<response.length; i++){
            const callback = function() {
                arrFullOrder.push({
                    name: this.itemName,
                    quantity: document.getElementById("quantity" + this._id).value
                });

                console.log(arrFullOrder);
            };
            document.getElementById(response[i]._id).addEventListener("click", callback.bind(response[i]));
        }
    });
}
getFood(foodURL,apikey);

//adding Full order to final order page
function displayFinalOrder(){
    for (var i = 0; i<arrFullOrder.length; i++){
        var tempString = "<div id='" + arrFullOrder[i] + "' > " + arrFullOrder[i] + " </div>"
        $("#fullOrderArray").append(tempString);
    }
    $("fullOrderArray").append()
}
$("#finalOrderFullSend").click(function() {
    console.log("Final Order: "+ arrFullOrder);


});

//On dropdown change, call getFood again. Make sure to clean the current html
$('#sortMenuBy').change(function(){
    getFood(foodURL,apikey);
})

//search function
function linearSearch(arrayToSearch, searchTerm){
    for (var i = 0; i<arrayToSearch.length; i++){
        console.log("current item:" + searchTerm);
        console.log(arrayToSearch[i]);
        if (arrayToSearch[i].itemName == searchTerm){
            console.log('item found in position: ' + i);
            $(document.getElementsByClassName('food')).hide();
            $("#" + arrayToSearch[i]._id).show();
            break;
        }else{
            console.log("item not found");
            $("#itemNotThere").show();
            $("#foodContainer").hide();

        };
    };
};


//getting the thing to search when it needs to
$('#timeToSearch').click(function() {
    let searchBarTerm = document.getElementById('searchBar').value;
    linearSearch(arrFoods, searchBarTerm);
});


//all of my arrays
var arrCoffeeTypes = ["espresso", "long black", "flat white", "latte", "cappuccino", "mocha", "chai latte", "dirty chai", "hot chocolate", "babycino"];

var arrMilkTypes = ["full-fat", "skim", "soy", "almond", "oat"];

var arrSize = ["small", "medium", "large"];

var arrTempLevel = ["iced", "warm", "normal", "extra hot", "super-duper hot"];

var arrFullDrinkOrder = [];

var arrFullOrder = [];

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
$("#finalOrderToSend").hide();
$("#foodContainer").hide();
$("#itemNotThere").hide();

function resetActiveNav() {
    document.getElementById("homeTab").classList.remove("active")
    document.getElementById("ourMenu").classList.remove("active")
    document.getElementById("orderForm").classList.remove("active")
    document.getElementById("aboutCafe").classList.remove("active")
    document.getElementById("finalOrder").classList.remove("active")
}

$("#homeTab").click(function () {
    resetActiveNav();
    document.getElementById("homeTab").classList.add("active")
    $("#viewMenu").hide();
    $("#orderHere").hide();
    $("#aboutUs").hide();
    $("#homePage").show();
    $("#foodContainer").hide();
    $("#searchBarDiv").hide();
    $("#itemNotThere").hide();
    $("#finalOrderToSend").hide();
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
    $("#searchBarDiv").show();
    $("#itemNotThere").hide();
    $("#finalOrderToSend").hide();
});

$("#orderForm").click(function () {
    resetActiveNav();
    document.getElementById("orderForm").classList.add("active")
    $("#viewMenu").hide();
    $("#homePage").hide();
    $("#aboutUs").hide();
    $("#orderHere").show();
    $("#foodContainer").hide();
    $("#searchBarDiv").hide();
    $("#itemNotThere").hide();
    $("#finalOrderToSend").hide();
});
$("#aboutCafe").click(function () {
    resetActiveNav();
    document.getElementById("aboutCafe").classList.add("active")
    $("#viewMenu").hide();
    $("#orderHere").hide();
    $("#homePage").hide();
    $("#aboutUs").show();
    $("#foodContainer").hide();
    $("#searchBarDiv").hide();
    $("#itemNotThere").hide();
    $("#finalOrderToSend").hide();

});

$("#finalOrder").click(function () {
    resetActiveNav();
    document.getElementById("finalOrder").classList.add("active")
    $("#viewMenu").hide();
    $("#orderHere").hide();
    $("#aboutUs").hide();
    $("#homePage").hide();
    $("#foodContainer").hide();
    $("#searchBarDiv").hide();
    $("#itemNotThere").hide();
    $("#finalOrderToSend").show();
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
    arrFullDrinkOrder.push({
        customerName: document.getElementById("customerName").value,
        customerPhone: document.getElementById("customerPhone").value,
        coffee: document.getElementById("coffeeType").value,
        milk: document.getElementById("milkType").value,
        size: document.getElementById("size").value,
        temperature: document.getElementById("tempLevel").value,
        sugarAmount: document.getElementById("sugars").value,
    })
    if(document.getElementById("decaf").checked){
        arrFullDrinkOrder.push({
            Decaf: document.getElementById("decaf").value,
        })
    }
    if(document.getElementById("noDecaf").checked){
        arrFullDrinkOrder.push({
            decaf: document.getElementById("noDecaf").value,
        })
    };

})

//actual sorting of db

if(document.getElementById("sortMenuBy")== document.getElementById("alphabetical")){
    selectionSort(foodURL, itemName)
}


//adding a send full order 

