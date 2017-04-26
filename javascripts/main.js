$(document).ready(function(){

	const apiKey = "";

	
		

	$("body").on("click", "li", (e) =>{
		// console.log(e.target.innerHTML);
		loadPlaces(e.target.innerHTML).then((results)=>{
			// console.log(data.results);
			// for (let i=0; i<data.results.length; i++){
			// 	console.log(data.results[i].name);
				writePlaceToDom(results);
			// }
		}).catch((error)=>{
			console.log(error);
		});	
	});

	$("body").on("click", ".place", (e) => {
		let place_id = e.target.id;
		loadDetail(place_id).then((results) =>{
			console.log(results.formatted_address);
			writeAddressToDom(results.formatted_address);
		});


	});

	const loadDetail = (place_id) => {
		return new Promise ((resolve, reject) => {
			$.ajax(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&key=${apiKey}`)
			.done((data) => resolve(data.result))
			.fail((error) => reject(error));
		});
	};

	const loadPlaces = (dropdownType)=>{
		return new Promise ((resolve, reject)=>{
			$.ajax(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=36.1627,-86.7816&radius=50000&type=${dropdownType}&key=${apiKey}`)
			.done((data)=> resolve(data.results))
			.fail((error)=>reject(error));
		});

	};

	const writeAddressToDom = (address) => {
		let outputString = `<div>${address}</div>`;
		$("#addresses").append(outputString);
	};

	const writePlaceToDom = (results) => {
		let placeString = "";
		for (let i=0; i< results.length; i++){
			
			placeString+=`<a href='#'><div class="place" id=${results[i].place_id}>${results[i].name}</div></a>`;

		}
		$("#input").html(placeString);
	};

});
