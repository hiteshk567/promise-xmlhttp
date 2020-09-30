let container = document.querySelector(".container");

var promise = new Promise((resolve, reject) => {
    var request = new XMLHttpRequest();
    request.open("GET", "https://raw.githubusercontent.com/rvsp/restcountries-json-data/master/res-countries.json", true);
    request.send();
    request.onload = function () {
        if (this.response) {
            resolve(this.response);
        } else {
            reject("Could not fetch data");
        }
    }

});
promise.then(function (data) {
        return JSON.parse(data);
    })
    .then(function (responseData) {
        for (let i = 0; i < responseData.length; i++) {

            var row;
            let col = createDiv("col-sm-6 col-lg-3 col-md-6");
            let card = createDiv("card");
            let cardBody = createDiv("card-body");
            let h5 = createH5("card-title", responseData[i].name);
            let h6 = createH6("card-subtitle mb-2 text-muted", responseData[i].capital);
            let p = createPara("card-text", responseData[i].region);
            let currencies = createH6("card-text", "Currencies: ");
            let details = createPara("card-text", "code: " + responseData[i].currencies[0]["code"] + ", name: " + responseData[i].currencies[0]["name"] + ", symbol: " + responseData[i].currencies[0]["symbol"])
            let latlng = createPara("card-text", "lat: " + responseData[i].latlng[0] + ", lng: " + responseData[i].latlng[1]);
            let a = createA(responseData[i].flag, "btn btn-primary", "See Flag");
            if (i % 4 === 0) {
                row = createDiv("row");
                cardBody.append(h5, h6, p, latlng, currencies, details, a);
                card.append(cardBody);
                col.append(card);
                row.append(col);
            } else {
                cardBody.append(h5, h6, p, latlng, currencies, details, a);
                card.append(cardBody);
                col.append(card);
                row.append(col);
                container.append(row);
            }
        }
    })
    .catch(function (err) {
        console.log(err);
    });

function createDiv(className, styles) {
    let element = document.createElement("div");
    element.className = className;
    if (styles) {
        element.styles = styles;
    }
    return element;
}

function createH5(className, text) {
    let element = document.createElement("h5");
    element.className = className;
    element.innerHTML = text;
    return element;
}

function createH6(className, text) {
    let element = document.createElement("h6");
    element.className = className;
    element.innerHTML = text;
    return element;
}

function createPara(className, text) {
    let element = document.createElement("p");
    element.className = className;
    element.innerHTML = text;
    return element;
}

function createA(href, className, text) {
    let element = document.createElement("a");
    element.href = href;
    element.className = className;
    element.innerHTML = text;
    return element;
}