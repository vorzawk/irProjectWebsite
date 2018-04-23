function loadAPIdata(itemName, itemId) {
    console.log("inside loadAPIdata ",itemName, itemId);
    /* Function get the data from the Google API */
    var numResults = 3;
    var xhttp = new XMLHttpRequest();
    /* XMLHttpRequest is an function inbuilt in the browser to get data dynamically from the server */
    xhttp.onreadystatechange = function() {
        // Call the function when the state of the request changes */
        console.log("state changed");
        if (this.readyState == 4 && this.status == 200) {
            /* readyState = 4 and status = 200 corresponds to data received */
//            console.log(this.responseText)
            var searchRes = JSON.parse(this.responseText);
            console.log(searchRes)
            var item = document.getElementById(itemId);
            var results = ""
            for (i = 0; i < numResults; i++){
                if ('cse_image' in searchRes.items[i].pagemap) {
                    results+= "<img src=" + searchRes.items[i].pagemap.cse_image[0].src + " class='popoverImage' style=max-width:48px; max-height:48px><br>"
                    results += "<a href="+searchRes.items[i].link+">"+searchRes.items[i].title+"</a><br>"
                }
            }
//            console.log(results);
            item.setAttribute("data-content", results);
        }
    };
    xhttp.open("GET",
        "https://www.googleapis.com/customsearch/v1?key=AIzaSyDLlxLfLpsjSmOzjHsVOL11EkaBPZKa_9Y&cx=002503135075439133886:eiknzesr1gg&q="+itemName, true);
    xhttp.send();
}

function loadReviews() {
    /* Aggregate functionality for obtaining all of the relevant info */
    console.log("inside loadData");
    var recData = JSON.parse(recommendations);
//    console.log(recData)
    var userId = getUserId();
    console.log(userId);
    var recItems = recData[userId];
//    var recItems = ["Bossypants","Paddle your own Canoe","Yes Please"];
    console.log(recItems);
    var recItemIds = ["first","second", "third"];
    loadBookCovers(recItems, recItemIds);

//    var recItems = ["Bossypants"];
//    var recItemIds = ["first"];
    var numItems = recItems.length
    for (i = 0; i < numItems; i++) {
        loadAPIdata(recItems[i], recItemIds[i]);
    }
}

function loadBookCovers(bookNames, ids) {
    for(i = 0; i < bookNames.length; i++) {
        urlBookCover = "./images/" + bookNames[i] + ".jpeg";
//        console.log(urlBookCover);
        var item = document.getElementById(ids[i]).childNodes[0];
        item.setAttribute("src", urlBookCover);
    }
}
    
function getUserId() {
    var obj = document.getElementById("selUserId");
    return obj.options[obj.selectedIndex].text;
}

$(function () {
    $('[data-toggle="popover"]').popover({html:true})
})

$(window).on('load',function(){
    $('#myModal').modal('show');
});

$('#myModal').on('hidden.bs.modal', function (e) {
    loadReviews();
})
