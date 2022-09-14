
var current_weather = document.querySelector(".current__weather--descrp").innerText;
var search = document.querySelector(".header__search--input");
var s_city="phnom penh"; 
var weather;
var hourly;
let t = new Date().toLocaleDateString();
let t1 = new Date();

//console.log(document.querySelectorAll("#icon2")[4].className="night");
// document.getElementsByClassName("hourly-icon")[0].className="";
// document.getElementsByClassName("hourly-icon")[0].classList.add("rain");
// var hourly_forecast=;
//console.log(document.querySelectorAll(".time-forecast"));


async function fetch_currentWeather(search){
    if(search)
    {
        s_city=search;
    }
   
    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${s_city}&appid=912cfcb4179ad6bbaac203c10b9e93bc&units=metric`)
        .then(resp => resp.json())
        .then(date => {
            // console.log( resp.weather[0].description);
            //  = resp.weather[0].description;
            weather=date;
        });
        if(weather.cod==200)
        {
            let sunrise=convertTime(weather.sys.sunrise);
            let sunset=convertTime(weather.sys.sunset);
         //   new Date(sec * 1000).toISOString().substring(14, 19)
           let a= new Date(weather.sys.sunset).getHours();
           let b = new Date(weather.sys.sunrise).getHours();
            document.querySelector(".current__weather--descrp").innerText = weather.weather[0].main;
            document.querySelector(".current__weather--temp").innerText = `${(weather.main.temp).toFixed(0)}°C`;
            document.querySelector(".current__weather--realfeel").innerText = `Real Feel ${weather.main.feels_like.toFixed(0)}°`;
            document.querySelector(".sunrise").innerText =`Sunrise: ${sunrise}` ;
            document.querySelector(".sunset").innerText = `Sunset: ${sunset}` ;
            document.querySelector(".duration").innerText = `Duration: undefined Hr` ; 
            document.querySelector(".current__weather--date").innerText = t.replaceAll('/','.');
            let icon = weather.weather[0].description;
        //    console.log(icon);

            if(icon == "scattered clouds")
            {
               document.querySelector(".current__weather--col1").querySelector("div").className="";
               document.querySelector(".current__weather--col1").querySelector("div").classList.add("sun");
            }
            if(icon == "broken clouds")
            {
               document.querySelector(".current__weather--col1").querySelector("div").className="";
               document.querySelector(".current__weather--col1").querySelector("div").classList.add("haze");
            }
            if(icon == "clear sky")
            {
               document.querySelector(".current__weather--col1").querySelector("div").className="";
               document.querySelector(".current__weather--col1").querySelector("div").classList.add("sun");
            }
            if(icon == "thunderstorm")
            {
               document.querySelector(".current__weather--col1").querySelector("div").className="";
               document.querySelector(".current__weather--col1").querySelector("div").classList.add("lightning");
            }
            if(icon == "few clouds")
            {
               document.querySelector(".current__weather--col1").querySelector("div").className="";
               document.querySelector(".current__weather--col1").querySelector("div").classList.add("sun");
               
            }
            if(icon == "mist")
            {
               document.querySelector(".current__weather--col1").querySelector("div").className="";
               document.querySelector(".current__weather--col1").querySelector("div").className="wind";
                
            }

            if(weather.weather[0].main == "Rain")
            {
               document.querySelector(".current__weather--col1").querySelector("div").className="";
               document.querySelector(".current__weather--col1").querySelector("div").className="rain";
            }
            if(t1.getHours()>=18)
            {
               document.querySelector(".current__weather--col1").querySelector("div").className="";
               document.querySelector(".current__weather--col1").querySelector("div").classList.add("night");
            }
        }

        await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=f31b34a98000568daf09398d6f4aeb9a&units=metric`)
        .then(res=>res.json())
        .then(data=> {hourly=data;});
       // console.log(hourly.list[0].weather[0].main);
        if(hourly.cod==200)
        {
            for(i=0;i<5;i++) {
                //  document.getElementsByClassName("time-forecast").forEach(item=>{
                //      item.innerText=hourlyConvertor(hourly.list[i].dt_txt.slice(11,21));
                //     
               // 
                document.getElementsByClassName("time-forecast")[i].innerText=hourlyConvertor( hourly.list[i].dt_txt.slice(11,21));
            //    console.log(hourlyConvertor(hourly.list[i].dt_txt.slice(11,21))); 
                document.getElementsByClassName("hourly-forecast-weather")[i].innerText=hourly.list[i].weather[0].main;
                document.getElementsByClassName("hourly-forecast-temp")[i].innerText=`${hourly.list[i].main.temp.toFixed(0)}°`;
                document.getElementsByClassName("hourly-forecast-feelLike")[i].innerText=`${hourly.list[i].main.feels_like.toFixed(0)}°`;
                document.getElementsByClassName("hourly-forecast-wind")[i].innerText=hourly.list[i].wind.speed;
            }

             for(i=0;i<6;i++)
             {
                console.log(hourly.list[i].weather[0].main);

                if(hourly.list[i].weather[0].main == "Rain")
                {
                    document.querySelectorAll("#icon2")[i].className="";
                    document.querySelectorAll("#icon2")[i].classList.add("cloud");  
                }
                if(hourly.list[i].weather[0].description == "broken clouds")
                {
                    document.querySelectorAll("#icon2")[i].className="";
                    document.querySelectorAll("#icon2")[i].classList.add("cloud"); 
                }
                if(hourly.list[i].weather[0].descriptionon == "clear sky")
                {
                    document.querySelectorAll("#icon2")[i].className="";
                    document.querySelectorAll("#icon2")[i].classList.add("sun"); 
                }
                if(hourly.list[i].weather[0].description == "thunderstorm")
                {
                    document.querySelectorAll("#icon2")[i].className="";
                    document.querySelectorAll("#icon2")[i].classList.add("lightning"); 
                }
                if(hourly.list[i].weather[0].description == "few clouds")
                {
                    document.querySelectorAll("#icon2")[i].className="";
                    document.querySelectorAll("#icon2")[i].classList.add("sun"); 
                }
                if(hourly.list[i].weather[0].description == "mist")
                {  
                    document.querySelectorAll("#icon2")[i].className="";
                    document.querySelectorAll("#icon2")[i].classList.add("wind"); 
                }
    
                if(hourly.list[i].weather[0].main == "Rain")
                {
                    document.querySelectorAll("#icon2")[i].className="";
                    document.querySelectorAll("#icon2")[i].classList.add("rain"); 
                }
                if(hourly.list[i].weather[0].main == "Clouds")
                {
                    document.querySelectorAll("#icon2")[i].className="";
                    document.querySelectorAll("#icon2")[i].className="cloud"; 
                }
                if(t1.getHours()>=18)
                {
                    document.querySelectorAll("#icon2")[i].className="";
                    document.querySelectorAll("#icon2")[i].classList.add("night"); 
                }   

             }

             
        }
        


      //  console.log(fiveDay);
}
const convertTime =(x)=>{
    let tempTime = new Date(x * 1000).getHours() || 24;
    console.log(tempTime);
    let time = tempTime % 12 + " " + (tempTime >= 12 ? "PM":"AM");
    return time;

}

const hourlyConvertor =(x)=>{ return new Date('1970-01-01T' + x + 'Z')
  .toLocaleTimeString('en-US',
    {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
  );
}
  
fetch_currentWeather();



search.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        fetch_currentWeather(search.value);
  //   console.log(search.value);
    }
});