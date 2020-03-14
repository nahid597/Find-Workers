// defined arrow button function

function arrowButton() {
    location.href = "../map/map.component.html";
}

var _id = document.location.search.replace(/^.*?\=/, '');

console.log("worker id :" + _id);


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
    var reviews = document.getElementById("reviews").innerHTML = dbElement[0].Rating.count * 5;
});