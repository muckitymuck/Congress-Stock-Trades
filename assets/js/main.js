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

document.querySelector('tableButton').addEventListener('click',getData)
function getData() {
    let input = document.querySelector("input").value
    fetch(`https://house-stock-watcher-data.s3-us-west-2.amazonaws.com/data/all_transactions.json`)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
            //console.log(data.filter(function(item){
            //    return item.district == input;
            //}))
            let filtered = data.filter(a => a.district == input)
            //console.log(filtered)
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
                document.getElementById('data').innerHTML = temp;
                
            }

        })
        .catch(err => {
            console.log(`error ${err}`)
    });
}