/*
	Tessellate by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			wide:    [ '1281px',  '1680px' ],
			normal:  [ '1001px',  '1280px' ],
			narrow:  [ '737px',   '1000px' ],
			mobile:  [ null,      '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Scrolly.
		$('.scrolly').scrolly();

})(jQuery);

//Load District Dropdown with valid Districts in the API
var json = "https://house-stock-watcher-data.s3-us-west-2.amazonaws.com/data/all_transactions.json"

fetch(json)
    .then(res => res.json())
    .then(data => {

        //console.log(data)
        const districtsArray = [];
        let uniqueDistrictsArray = [];
        //gets all districts and console logs them
        for (const [key, value] of Object.entries(data)){
            //console.log(`${value.district}`)
            districtsArray.push(value.district)
            uniqueDistrictsArray = [...new Set(districtsArray)]
            
        }
        uniqueDistrictsArray.sort();
        //populates the Select District Dropdown
        var districtDropdown = document.getElementById("selectDistrictDD");

       for(var i = 0; i < uniqueDistrictsArray.length; i++){
            var opt = uniqueDistrictsArray[i];
            var el = document.createElement("option");
            el.textContent = opt;
            el.value = opt;
            selectDistrictDD.appendChild(el)
            
       }
       //log the Dropdown options from API
       console.log(selectDistrictDD)

    })


document.querySelector('tableButton').addEventListener('click',getData)
document.querySelector('districtDDBtn').addEventListener('click',getDistrictData)
function getData() {
    let input = document.querySelector("input").value
    let select = document.querySelector(".selectState").value
    fetch(`https://house-stock-watcher-data.s3-us-west-2.amazonaws.com/data/all_transactions.json`)
        .then(res => res.json()) // parse response as JSON
        .then(data => {

            console.log(data)
            const districtsArray = [];
            let uniqueDistrictsArray = [];
            //gets all districts and console logs them
            for (const [key, value] of Object.entries(data)){
                //console.log(`${value.district}`)
                districtsArray.push(value.district)
                uniqueDistrictsArray = [...new Set(districtsArray)]
                
            }
            uniqueDistrictsArray.sort();
            console.log(uniqueDistrictsArray)

            let filtered = ''
            if (input.length <= 3 && select === ""){
                document.getElementById('data').innerHTML = "No Transactions.  Please Enter a District or State."

             }  
                if (input.length <= 3) {
                filtered = data.filter(a => a.district.slice(0,2) == select)  
            } else{
                //if textbox has 2 characters filter for those districts in the state
                filtered = data.filter(a => a.district.slice(0,2) == input.slice(0,2))
            }


            var temp = "";
            if (filtered.length > 0) {
                var temp = "";
                filtered.forEach((itemData) => {               
                    temp += "<tr>";
                    temp += "<td>" + itemData.disclosure_year + "</td>";
                    temp += "<td>" + itemData.transaction_date + "</td>";
                    temp += "<td>" + itemData.district + "</td>";
                    temp += "<td>" + itemData.representative + "</td>";
                    temp += "<td>" + itemData.ticker + "</td>";
                    temp += "<td>" + itemData.amount + "</td>";
                    temp += "<td>" + itemData.asset_description + "</td></tr>";
                });
                document.getElementById('#data').innerHTML = temp;


                
            }

        })
        .catch(err => {
            console.log(`error ${err}`)
    });
}
function getDistrictData() {
    let selectDistrict = document.querySelector("#selectDistrictDD").value
    console.log(selectDistrict)
    fetch(`https://house-stock-watcher-data.s3-us-west-2.amazonaws.com/data/all_transactions.json`)
        .then(res => res.json()) // parse response as JSON
        .then(data => {

            const districtsArray = [];
            let uniqueDistrictsArray = [];
            //gets all districts and console logs them
            for (const [key, value] of Object.entries(data)){
                //console.log(`${value.district}`)
                districtsArray.push(value.district)
                uniqueDistrictsArray = [...new Set(districtsArray)]
                
            }
            uniqueDistrictsArray.sort();

            let filtered = ''
            if (selectDistrictDD === ""){
                document.getElementById('#data').innerHTML = "No Transactions.  Please Enter a District or State."
                //if textbox is incomplete, filtered = State Dropdown 
                }  //if (selectDistrict != ""){
            //     filtered = data.filter(a => a.disctrict == selectDistrict.value)
            //     console.log(selectDistrict)
            // }
                else {
                    filtered = data.filter(a => a.district == "#selectDistrictDD".value)
                }


            var temp = "";
            if (filtered.length > 0) {
                var temp = "";
                filtered.forEach((itemData) => {               
                    temp += "<tr>";
                    temp += "<td>" + itemData.disclosure_year + "</td>";
                    temp += "<td>" + itemData.transaction_date + "</td>";
                    temp += "<td>" + itemData.district + "</td>";
                    temp += "<td>" + itemData.representative + "</td>";
                    temp += "<td>" + itemData.ticker + "</td>";
                    temp += "<td>" + itemData.amount + "</td>";
                    temp += "<td>" + itemData.asset_description + "</td></tr>";
                });
                document.getElementById('#data').innerHTML = temp;


                
            }

        })
        .catch(err => {
            console.log(`error ${err}`)



    });




}        

const mapToValues = (object = {}) => {
    const res = [];
    for (let key in object) {
        let obj = object[key];
        let aux = [];
        for (let i = 0; i < obj.length; i++) {
            for (x in obj[i]) {
                aux.push(obj[i][x].district);
            }
        }
        res.push(aux);
    }
    console.log(res)
    return res;
}
console.log(mapToValues(json))

