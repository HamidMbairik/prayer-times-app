let cities = [
    'الرباط', 'اكادير', 'مراكش', 'الدار البيضاء'
]


for(let city of cities) {
    const content = `
        <option>${city}</option>
    `
    document.getElementById('cities-selector').innerHTML += content
}
document.getElementById('en-city-name').innerHTML = 'Rabat'
document.getElementById('ar-city-name').innerHTML = document.getElementById('cities-selector').value
document.getElementById('cities-selector').addEventListener('change', () => {
    document.getElementById('ar-city-name').innerHTML = document.getElementById('cities-selector').value
    if(document.getElementById('cities-selector').value == 'الرباط') {
        getPrayerTimingsOsCity('Rabat')
        document.getElementById('en-city-name').innerHTML = 'Rabat'
    }else if(document.getElementById('cities-selector').value == 'مراكش'){
        getPrayerTimingsOsCity('Marrakech')
        document.getElementById('en-city-name').innerHTML = 'Marrakech'
    }else if(document.getElementById('cities-selector').value == 'اكادير'){
        getPrayerTimingsOsCity('Agadir-Ida-Ou-Tanane')
        document.getElementById('en-city-name').innerHTML = 'Agadir'
    }else if(document.getElementById('cities-selector').value == 'الدار البيضاء'){
        getPrayerTimingsOsCity('Casablanca')
        document.getElementById('en-city-name').innerHTML = 'Casablanca'
    }
})

function getPrayerTimingsOsCity(cityName) {
    let params = {
        country: 'MA',
        city: cityName //'Rabat'
    }
    axios.get('http://api.aladhan.com/v1/timingsByCity', {
        params: params
    })
    .then((response) => {
        const timings = response.data.data.timings;
        document.getElementById('fajer').innerHTML = timings.Fajr;
        document.getElementById('shoro9').innerHTML = timings.Sunrise;
        document.getElementById('doher').innerHTML = timings.Dhuhr;
        document.getElementById('3aser').innerHTML = timings.Asr;
        document.getElementById('maghrib').innerHTML = timings.Sunset;
        document.getElementById('3icha2').innerHTML = timings.Isha;
    
        const readableDate = response.data.data.date.readable
        const weekDay = response.data.data.date.hijri.weekday.ar
        document.getElementById('date').innerHTML = readableDate + ' ' + weekDay;
    })
    .catch((error) => {
        console.log(error)
    })
}
getPrayerTimingsOsCity('Rabat')

