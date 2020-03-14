// defined arrow button function


var user_id2 = document.location.search.replace(/^.*?\&user_id\=/, '');
var user_id = user_id2.replace(/&_category\=[a-zA_Z0-9]+/, '');

var worker_id = document.location.search.replace(/^.*?\_id\=/, '');

var worker_id2 = worker_id.replace(/&user_id\=[a-zA-Z0-9]+/, '');

var _id = worker_id2.replace(/&_category\=[a-zA_Z0-9]+/, '');
var category = document.location.search.replace(/^.*?&_category\=/, '');

console.log("category " + category);

function arrowButton() {
    location.href = "http://127.0.0.1:4444/map/map.component.html?_id=" + user_id + '&_category=' + category;
}

// var _id = document.location.search.replace(/^.*?\=/, '');
//var user_id = document.location.search.replace(/^.*&\=/, '');



console.log("worker id :" + _id);
console.log("user id :" + user_id);


var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHtmlRequest = new XMLHttpRequest();
        anHtmlRequest.onreadystatechange = function() {
            if (anHtmlRequest.readyState == 4 && anHtmlRequest.status == 200) {
                aCallback(anHtmlRequest.responseText);
            }
        }

        anHtmlRequest.open("GET", aUrl, true);
        anHtmlRequest.send(null);
    }
};

var client = new HttpClient();

this.client.get("http://127.0.0.1:4444/admin/workers?_id=" + _id, function(respone) {
    var dbElement = JSON.parse(respone);
    console.log(dbElement);

    // for fixed digits afer point
    var rate = dbElement[0].Rating.rating;
    var category = dbElement[0].Catagory;

    var storeCategory = "";

    if (category === '0')
        storeCategory = "কারেন্টের মিস্ত্রি";
    else if (category === '1')
        storeCategory = "গাড়ির মিস্ত্রি";
    else if (category === '2')
        storeCategory = "গ্যাসের চুলার মিস্ত্রি";
    else if (category === '3')
        storeCategory = "পানির লাইনের মিস্ত্রি";


    var name = document.getElementById("workerName").innerHTML = dbElement[0].Name;
    var phone = document.getElementById("phone").innerHTML = dbElement[0].Phone;
    var category = document.getElementById("category").innerHTML = storeCategory;
    var successfulWork = document.getElementById("successfulWork").innerHTML = dbElement[0].Rating.count;
    var rating = document.getElementById("rating").innerHTML = parseFloat(Math.round(rate * 100) / 100).toFixed(1);
    var reviews = document.getElementById("reviews").innerHTML = dbElement[0].Rating.count;
});