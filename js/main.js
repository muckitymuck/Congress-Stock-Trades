//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
document.querySelector('button').addEventListener('click',getData)
function getData() {
    let input = document.querySelector("input").value
    fetch(`https://house-stock-watcher-data.s3-us-west-2.amazonaws.com/data/all_transactions.json`)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
            console.log(data)
            if (data.length > 0) {
                var temp = "";
                data.forEach((itemData) => {
                    
                
                    temp += "<tr>";
                    temp += "<td>" + itemData.disclosure_year + "</td>";
                    temp += "<td>" + itemData.transaction_date + "</td>";
                    temp += "<td>" + itemData.district + "</td>";
                    temp += "<td>" + itemData.representative + "</td>";
                    temp += "<td>" + itemData.ticker + "</td>";
                    temp += "<td>" + itemData.amount + "</td>";
                    temp += "<td>" + itemData.asset_description + "</td></tr>";
                });
                document.getElementById('data').innerHTML = temp;
                
            }

        })
        .catch(err => {
            console.log(`error ${err}`)
    });
}
