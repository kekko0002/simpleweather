const apiRoot = 'http://api.openweathermap.org/data/2.5/weather?';
const apiKey = '6c31df7f2be80e4fd4ae23674939e835';
const now = new Date();
const body = document.querySelector('body');
const cityName = document.querySelector('.cityName'); //dichiaro tutti gli elementi della pagina HTML
const date = document.querySelector('#date');
const type = document.querySelector('#type');
const icon = document.querySelector('.icon');
const degrees = document.querySelector('.degrees');
const wind = document.querySelector('#wind');
const humidity = document.querySelector('#humidity');
const unitC = document.querySelector('#cel');
const unitF = document.querySelector('#far');
const form = document.getElementById('form');
const search = document.querySelector('#search');
const geo = document.querySelector('#geo');
const imported = document.querySelectorAll('p.imported');

let apiCall = 'http://api.openweathermap.org/data/2.5/weather?q='  + '&appid=' + apiKey;


function dateParser(num){ //da numero a giorno della settimana in lettere
	switch(num){
		case 0:
			return 'Domenica';
			break;
		case 1:
			return 'Lunedì';
			break;
		case 2:
			return 'Martedì';
			break;
		case 3:
			return 'Mercoledì';
			break;
		case 4:
			return 'Giovedì';
			break;
		case 6:
			return 'Venerdì';
			break;
		case 7:
			return 'Sabato';
			break;
	}
}

function weatherTrans(condition){  //traduce condizione meteo in italiano
	switch(condition.toLowerCase()){
		case 'rain':
			return 'Pioggia';
			break;
		case 'thunderstorm':
			return 'Temporale';
			break;
		case 'drizzle':
			return 'Pioggia leggera';
			break;
		case 'snow':
			return 'Neve';
			break;
		case 'clear':
			return 'Sereno'
			break;
		case 'clouds':
			return 'nuvoloso';
			break;
		case 'na':
			return 'N/A';
			break;
		default:
			return 'Nebbia';
	}
}

function kelvinTo(x, value){ //converte kelvin - celsius || kelvin - farenheit
	switch(x){
		case 'c':
			return (Math.round((value - 273.15)*10)/10);
			break;
		case 'f':
			return (Math.round(((value * 9 / 5)-459.67)*10)/10);
			break;
	}
}



function addP(element, classP, contentP){ //aggiunge <p class = "nomeclasse"> figlio di un elemento 
	let p = document.createElement('p');
	p.setAttribute('class', classP);
	p.textContent = contentP;
	element.appendChild(p);
}

function createDiv(classP){
	let div = document.createElement('div');
	div.setAttribute('class',classP);
	return div;
}

function getName(cityJ, countryJ){ 
	let para = cityJ + ', ' + countryJ;
	addP(cityName, 'imported title', para);
}

function getDate(){
	let day = dateParser(now.getDay());
	let time = now.getHours() + ':' + ('0' + now.getMinutes()).slice(-2);
	let para = day + ', ' + time;
	addP(date, 'imported', para);
}

function getCondition(conditionJ){
	let condition = weatherTrans(conditionJ);
	addP(type, 'imported', condition)
}

function getDegrees(degreesJ){

	let value = degreesJ
	unitC.onclick = function(){
		let p = document.querySelector('.conv');
		unitC.setAttribute('class', 'u active');
		unitF.setAttribute('class', 'u');
		value = kelvinTo('c', value);
		p.textContent = value;
		degrees.removeChild(p);
		addP(degrees, 'imported conv', value);
		value = degreesJ;
	}

	unitF.onclick = function(){
		let p = document.querySelector('.conv');
		unitC.setAttribute('class', 'u');
		unitF.setAttribute('class', 'u active');
		value = kelvinTo('f', value);
		p.textContent = value;
		degrees.removeChild(p);
		addP(degrees, 'imported conv', value);
		value = degreesJ;
	}
	addP(degrees, 'imported conv', kelvinTo('c', value));
}

function getWind(windJ){
	let speed = windJ + ' m/s';
	addP(wind, 'imported', speed);
}

function getHumidity(humidityJ){
	let perc = humidityJ + '%';
	addP(humidity, 'imported', perc);
}

function getIcon(iconJ){
	let id = iconJ.slice(0,2);
	let div = document.createElement('div');
	let raining = document.createElement('div');
	raining.setAttribute('class','imported raining');
	let snow = document.createElement('div');
	snow.setAttribute('class','imported snow');
	let thunder = document.createElement('div');
	thunder.setAttribute('class', 'imported thunder');
	let fragment = document.createDocumentFragment();
	let fragment1 = document.createDocumentFragment();
	switch(id){
		case '01':
			fragment.appendChild(createDiv('imported sun'));
			icon.appendChild(fragment);
			break;
		case '02':
			fragment.appendChild(createDiv('imported sun'));
			fragment.appendChild(createDiv('imported cloud'));
			icon.appendChild(fragment)
			break;
		case '03':
			fragment.appendChild(createDiv('imported'));
			fragment.appendChild(createDiv('imported cloud'));
			icon.appendChild(fragment);
			break;
		case '04':
			fragment.appendChild(createDiv('imported cloud'));
			fragment.appendChild(createDiv('imported cloud'));
			icon.appendChild(fragment);
			break;
		case '09':
			fragment1.appendChild(createDiv('imported rain'));
			fragment1.appendChild(createDiv('imported rain'));
			raining.appendChild(fragment1);
			fragment.appendChild(createDiv('imported cloud'));
			fragment.appendChild(raining);
			fragment.appendChild(createDiv('imported cloud'));
			icon.appendChild(fragment);
			break;
		case '10':
			fragment1.appendChild(createDiv('imported rain'));
			fragment1.appendChild(createDiv('imported rain'));
			raining.appendChild(fragment1);
			fragment.appendChild(createDiv('imported cloud'));
			fragment.appendChild(raining);
			fragment.appendChild(createDiv('imported cloud'));
			icon.appendChild(fragment);
			break;
		case '11':
			fragment1.appendChild(createDiv('imported bolt'));
			fragment1.appendChild(createDiv('imported bolt'));
			thunder.appendChild(fragment1);
			fragment.appendChild(createDiv('imported cloud'));
			fragment.appendChild(thunder);
			fragment.appendChild(createDiv('imported cloud'));
			icon.appendChild(fragment);
			break;
		case '13':
			fragment1.appendChild(createDiv('imported flake'));
			fragment1.appendChild(createDiv('imported flake'));
			snow.appendChild(fragment1);
			fragment.appendChild(createDiv('imported cloud'));
			fragment.appendChild(snow);
			fragment.appendChild(createDiv('imported cloud'));
			icon.appendChild(fragment);
		case '50':
			fragment.appendChild(createDiv('imported cloud'));
			icon.appendChild(fragment);
			break;

	}
}

function removePara(){
	let p = document.querySelectorAll('.imported');
	console.log(p);

	for(let i = 0; i < p.length; i++){

		p[i].parentNode.removeChild(p[i]);
	}

}


async function getApi(link){ //funzione asincrona per la richiesta del JSON
	let response;
	try{
		response = await fetch(link);
	}
	catch{
		console.log('error');
	}
	return response.json();
}

async function populatePage(apiCall){
	let api;
	api = await getApi(apiCall);
	console.log(api);
	if(api.cod == 200){
		getName(api.name, api.sys.country);
		getDate();
		getCondition(api.weather[0].main);
		getDegrees(api.main.temp);
		getWind(api.wind.speed);
		getHumidity(api.main.humidity);
		getIcon(api.weather[0].icon);
	}
	else{
		let apiCode = 'Error ' + api.cod;
		getName(apiCode,api.message);
		getDate();
		getCondition('na');
		getWind(0);
		getHumidity(0);
	}
	
}

function subPosition(event){
	navigator.geolocation.getCurrentPosition(getPosition);
	event.preventDefault();
}

function getPosition(position){
	removePara();
	console.log(position);
	let apiCall = apiRoot + 'lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&appid=' + apiKey;
	populatePage(apiCall);
}

function sub(event){
	removePara();
	let x = document.getElementById('inputbar').value;
	console.log(x);
	
	let apiCall = apiRoot + 'q=' + x + '&appid=' + apiKey;
	populatePage(apiCall);
	event.preventDefault();
}

function defaultPage(){
	let apiCall = apiRoot + 'q=New York' + '&appid=' + apiKey;
	populatePage(apiCall);

}

defaultPage();