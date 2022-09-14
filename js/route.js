//const {API_KEY} = require('dotenv').config();
//var api_key ="";

var city="phnom penh";
var today;

var input = document.querySelector(".header__search--input");

const route = (e) => {
    e = e || window.event;
    e.preventDefault();
    window.history.pushState({}, "", e.target.href);
    handleLocation();
};

//routing path object
const routes = {
    "/views":"/index.html",
    "/today": "/views/today.html",
    "/5-day-forecast": "/views/5days.html",
    "/404":"/views/404.html"
};

//route2();

let next = [];

const handleLocation = async (code) => {
    const path = window.location.pathname;
    console.log(path);
    //today on webpage by default
   // const route = routes[path] || routes["/today"];
   const page=[];

    for(const key in routes) {
            routes[key]!=='/index.html'  &&  await fetch(routes[key])
                                                    .then(data => data.text())
                                                    .then(resp =>{
                                                       // console.log(resp);
                                                        page.push(resp);
                                                       //  document.getElementById("main").innerHTML=resp;
                                                       // page+=resp;
                                                     });
    }
    // console.log(page);
    let nav = 0;

    if(path=="/5-day-forecast"){
        nav=1;
    }
   //   console.log(page[nav]);
   if(code=="404"){
        nav=2;
    }

    let main = document.getElementById("main");
    let frag = document.createRange().createContextualFragment(page[nav]);
 
    if(path==="/index.html" || path==="/views/"){
        main.appendChild(frag);
        return;
       // next.pop();
    }

    const prev = main.children[0];

      // console.log(prev);
     main.replaceChild(frag, prev);
     return;
   // main.replaceChild(next[0]);
   // main.replaceChild(frag, frag);

    //main.innerHTML=page[1];
};


window.onpopstate = handleLocation;
window.route = route;

//handleLocation();

function fetch_api (input){
    if(input)
    {
        city=input;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f31b34a98000568daf09398d6f4aeb9a&units=metric`)
    .then(data => data.json())
    .then(resp => {
        if(resp.cod==200)
        {
            //handleLocation();
        }
       else{
              handleLocation(resp.cod);
       }
    });
}

//window.onload(fetch_api());

input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
   //   console.log(input.value);
      fetch_api(input.value);
    }
  });




//exports const page2 = page;
