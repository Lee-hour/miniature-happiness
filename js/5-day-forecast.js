let weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var search = document.querySelector(".header__search--input");
let fiveDaysData;
var city="phnom penh"; 
let day = new Date();
let a=[];
let selected_date=[];

console.log(document.getElementsByClassName("time")[4]);

search.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        fetch_fiveDay(search.value);
  //   console.log(search.value);
    }
});


const fetch_fiveDay= async (search)=>{
     if(search)
     {
        city=search;
     }
     
     await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=f31b34a98000568daf09398d6f4aeb9a&units=metric`)
     .then(res=>res.json())
     .then(data=>{fiveDaysData=data});
    //  console.log(fiveDaysData);

     if(fiveDaysData.cod==200)
     {
        for(i=0; i<5; i++) {
            let currentDay = new Date();
            currentDay.setDate(currentDay.getDate() + i);
            
            var tempData = getDataByDate(currentDay.toLocaleDateString());
         //   console.log(currentDay)
            a.push(currentDay.toString().slice(4,11));
          //  console.log("array"+a);
            selected_date.push(currentDay.toLocaleDateString());
            // console.log(currentDay);
           //  console.log("temp"+tempData);
         //   document.getElementsByClassName("p1-month")[i].innerText = a;
            document.getElementsByClassName("green-header")[i+1].innerText = weekDay[checkDay(i+1)];
            document.getElementsByClassName("p2")[i].innerText = `${tempData[0].main.temp.toFixed(0)}°C`;
            document.getElementsByClassName("five-day-weather")[i].innerText = `${tempData[0].weather[0].description}`;
            let icon =  tempData[0].weather[0].description;

            if(icon == "broken clouds")
            {
                document.querySelectorAll("#icon3")[i].className="";
                document.querySelectorAll("#icon3")[i].classList.add("cloud");
            }

            if(icon == "light rain")
            {
                document.querySelectorAll("#icon3")[i].className="";
                document.querySelectorAll("#icon3")[i].classList.add("rain");
            }

            if(icon == "scattered clouds")
            {
                document.querySelectorAll("#icon3")[i].className="";
                document.querySelectorAll("#icon3")[i].classList.add("cloud");
            }
                 
            if(icon == "overcast clouds")
            {
                document.querySelectorAll("#icon3")[i].className="";
                document.querySelectorAll("#icon3")[i].classList.add("cloud");
            }
            // if(tempData[0].weather[0].description)
            // {
             
      //      }
            //console.log();
    
        }
    }
    checkTime();
     injectMonth();
    // document.querySelector("#icon3")[0].className="night";
    // console.log(document.querySelector("#icon3")[0].className);
   //  console.log(a);
}

fetch_fiveDay();

// console.log(a);
//console.log(selected_date);

function injectMonth(){
    for(i=0;i<5;i++)
    {
      document.getElementsByClassName("p1-month")[i].innerText = a[i];
    }
}

function checkTime(){
     if(day.getHours()>6 && day.getHours()<18){
        document.getElementsByClassName("green-header")[0].innerText = "Today";
        return;
     }
     document.getElementsByClassName("green-header")[0].innerText = "Tonight";
}



function getDataByDate(date) {
    let tempData = fiveDaysData.list.filter(item => {
        let temp = new Date(item.dt * 1000).toLocaleDateString();

        return temp == date;
    });

    return tempData;
}

function checkDay(day) {
    let d = new Date();

    if (day + d.getDay() > 6) {
        return day + d.getDay() - 7;
    } else {
        return day + d.getDay();
    }
}



for(i=0; i < 5; i++) {
     let today = new Date();
     today.setDate(today.getDate() + i);
    document.getElementsByClassName("green-header")[i].parentElement.dataset.date = today.toLocaleDateString();
    document.getElementsByClassName("green-header")[i].parentElement.id = today.toLocaleDateString();
}

document.querySelectorAll(".col-1-of-5").forEach(item => {
    item.addEventListener("click", function() 
    {
        let data = getDataByDate(this.dataset.date);
       // console.log(data); 
        console.log("data length "+data.length); 
        
        for(i=0;i<5;i++)
        {
            let tempTime = new Date(data[i].dt * 1000).getHours() || 24;
            let time = tempTime % 12 +":00 "+ (tempTime > 12 ? "PM":"AM");
            document.getElementsByClassName("time")[i].innerText=time;
        }

        for(i=0;i<5;i++)
        {
            document.querySelectorAll(".weather")[i].innerText=data[i].weather[0].main;
        }

        for(i=0;i<5;i++)
        {
            document.getElementsByClassName("Temp")[i].innerText=`${data[i].main.temp.toFixed(0)}°`;
        }

        for(i=0;i<5;i++)
        {
            document.getElementsByClassName("realfeel")[i].innerText=`${data[i].main.feels_like.toFixed(0)}°`;
        }
        for(i=0;i<5;i++)
        {
            document.getElementsByClassName("wind1")[i].innerText=data[i].wind.speed;
        }
        for(i=0;i<5;i++)
        {
            let icon =  data[i].weather[0].description;

            if(data[i].weather[0].main == "Clouds")
            {
                document.querySelectorAll("#selected_day")[i].className="";
                document.querySelectorAll("#selected_day")[i].className="cloud";
            }

            if(icon == "broken clouds")
            {
                document.querySelectorAll("#selected_day")[i].className="";
                document.querySelectorAll("#selected_day")[i].classList.add("cloud");
            }

            if(icon == "light rain")
            {
                document.querySelectorAll("#selected_day")[i].className="";
                document.querySelectorAll("#selected_day")[i].classList.add("rain");
            }

            if(icon == "scattered clouds")
            {
                document.querySelectorAll("#selected_day")[i].className="";
                document.querySelectorAll("#selected_day")[i].classList.add("cloud");
            }
                 
            if(icon == "overcast clouds")
            {
                document.querySelectorAll("#selected_day")[i].className="";
                document.querySelectorAll("#selected_day")[i].classList.add("cloud");
            }
        }
    });
});

