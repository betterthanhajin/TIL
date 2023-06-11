const apiURI = "http://api.openweathermap.org/data/2.5/weather?q="+
               'Gyeonggi-do'+"&appid="+"9bfe48b6891e13cde6f0efc07a2821fa";


getData();

function getData() {
    fetch(apiURI).then(function(res){
        return res.json()
    }).then(function(json){
        renderWeatherData(json);
    });
}


function renderWeatherData(data) {
    changeIcon(data);
}


function changeIcon(data) {
    console.log("data", data);
    let weather = data.weather[0]['main'];
    //weather = 'Clouds';
    let icon = document.getElementById('weather-icon');
    icon.classList.remove();
    switch(weather){
        case 'Clouds': 
            icon.classList.add('fa-solid', 'fa-cloud-sun');
            break;
        case 'Clear':
            icon.classList.add('fa-solid', 'fa-sun');
            break;
        case 'Rain':
            icon.classList.add('fa-solid', 'fa-umbrella');
            break;
        default:
            icon.classList.add('fa-solid','fa-temperature-empty');
            break;
    }
}
        
