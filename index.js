const clientId = "829163";
const accessKey = "AXRNmFIOy6FcftCR136gPmEOivZEMxCvC06_JnKPObo";
const searchResults = document.getElementById("searchResults");


// uel: https://api.unsplash.com/search/photos?client_id=AXRNmFIOy6FcftCR136gPmEOivZEMxCvC06_JnKPObo
// send an HTTP request using XMLHttpRequest
function searchUsingXHR() {
    searchResults.innerHTML = "";
    let keyword = document.getElementById("keyword").value;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            createDOMElements(data);
        } else if (xhr.readyState === 4 && xhr.status != 200) {
            console.error('Error:', xhr.status, xhr.statusText);
        }
    }
    xhr.open('GET', `https://api.unsplash.com/search/photos?client_id=AXRNmFIOy6FcftCR136gPmEOivZEMxCvC06_JnKPObo&query=jeddah`, true); // true for async request
    xhr.setRequestHeader('Authorization', `Client-ID ${accessKey}`);
    xhr.send();
}

// Send an HTTP request using Fetch API
function searchUsingFetch() {
    searchResults.innerHTML = "";
    let keyword = document.getElementById("keyword").value;

    fetch(`https://api.unsplash.com/search/photos?client_id=AXRNmFIOy6FcftCR136gPmEOivZEMxCvC06_JnKPObo&query=jeddah
`, {
        headers: {
            'Authorization': `Client-ID ${accessKey}`
        }
    })
        .then(response => response.json())
        .then(data => {
            createDOMElements(data);
        })
        .catch(error => console.error('Error:', error));
}

// send an HTTP request using Fetch API with async await
async function searchUsingFetchAsyncAwait() {
    searchResults.innerHTML = "";
    let keyword = document.getElementById("keyword").value;
    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?client_id=AXRNmFIOy6FcftCR136gPmEOivZEMxCvC06_JnKPObo&query=jeddah
`, {
            headers: {
                'Authorization': `Client-ID ${accessKey}`
            }
        });
        const data = await response.json();
        createDOMElements(data);
    } catch (error) {
        console.error('Error:', error);
    }

}

// create DOM elements based on the response data
function createDOMElements(data) {
    for (item of data['results']) {
        console.log()
        let image = item['urls']['regular'];
        // check if it's jpeg or mpr and create element accordingly

            let imgElem = document.createElement("img");
            imgElem.src = image;
            searchResults.appendChild(imgElem);
        }
}