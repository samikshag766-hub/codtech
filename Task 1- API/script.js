let slideIndex = 1;
let slideTimer;

// Initialize slideshow
function initSlideshow() {
    showSlide(slideIndex);
    autoSlide();
}

// Change slide by n
function changeSlide(n) {
    clearTimeout(slideTimer);
    showSlide(slideIndex += n);
    autoSlide();
}

// Go to specific slide
function currentSlide(n) {
    clearTimeout(slideTimer);
    showSlide(slideIndex = n);
    autoSlide();
}

// Display slide
function showSlide(n) {
    const slides = document.getElementsByClassName("slide");
    const dots = document.getElementsByClassName("dot");
    
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }
    
    slides[slideIndex - 1].classList.add("active");
    dots[slideIndex - 1].classList.add("active");
}

// Auto-change slides every 5 seconds
function autoSlide() {
    slideTimer = setTimeout(() => {
        slideIndex++;
        showSlide(slideIndex);
        autoSlide();
    }, 5000);
}

function getWeather() {

    const city = document.getElementById("city").value.trim();

    if (city === "") {
        document.getElementById("weather-result").innerHTML = "Please enter a city name";
        return;
    }

    const apiKey = "7a9b16c022414ca44720c5668685a052";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {

            if (data.cod !== 200) {
                document.getElementById("weather-result").innerHTML = "City not found or API issue";
                return;
            }

            document.getElementById("weather-result").innerHTML = `
                <p><b>City:</b> ${data.name}</p>
                <p><b>Temperature:</b> ${data.main.temp} °C</p>
                <p><b>Weather:</b> ${data.weather[0].description}</p>
            `;
        })
        .catch(error => {
            document.getElementById("weather-result").innerHTML = "Network error";
        });
}

// Start slideshow when page loads
window.addEventListener('DOMContentLoaded', initSlideshow);
