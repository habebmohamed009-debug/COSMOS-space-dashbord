let sidebarToggle=document.getElementById("sidebar-toggle")
let sidebar=document.getElementById("sidebar")
sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("sidebar-open");
    
    
});
document.addEventListener("click", (e) => {
    if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
        
            sidebarToggle.click(); 
    }
});

let sectionsBtns = document.querySelectorAll("nav a");
let sections = document.querySelectorAll("section");
for (let i = 0; i < sectionsBtns.length; i++) {
    let sectionBtn = sectionsBtns[i];

    sectionBtn.addEventListener("click", () => {
        for (let k = 0; k < sectionsBtns.length; k++) {
        sectionsBtns[k].classList.remove("bg-blue-500/10", "text-blue-400");
        sectionsBtns[k].classList.add("text-slate-300", "hover-bg-slate-800");
        sidebarToggle.click()
        }
        sectionBtn.classList.add("bg-blue-500/10", "text-blue-400");
        sectionBtn.classList.remove("text-slate-300", "hover-bg-slate-800");
        for (let j = 0; j < sections.length; j++) {
        let targetSection = sections[j];
        if (
            targetSection.getAttribute("data-section") ==
            sectionBtn.getAttribute("data-section")
        ) {
            targetSection.classList.remove("hidden");
        } else {
            targetSection.classList.add("hidden");
        }
        }
    });
    
    }

let apodImage = document.getElementById("apod-image");
let viewFull = document.getElementById("viewFull");
let apodDate = document.getElementById("apod-date");
let apodTitle = document.getElementById("apod-title");
let apodDateDetail = document.getElementById("apod-date-detail");
let apodExplanation = document.getElementById("apod-explanation");
let apodCopyright = document.getElementById("apod-copyright");
let apodDateInfo = document.getElementById("apod-date-info");
let apodMediaType = document.getElementById("apod-media-type");
let apodLoading = document.getElementById("apod-loading");
let apodDateInput = document.getElementById("apod-date-input");
let selectedDate = apodDateInput.nextElementSibling;
apodDateInput.addEventListener("change", () => {
    selectedDate.textContent = dateToString(apodDateInput.value);
});

// dat of the day
let today = new Date();
let todayYear = today.getFullYear();
let todayMonth = today.getMonth();
let todayDay = today.getDate();
let todayFormat = `${todayMonth + 1} ${todayDay},${todayYear}`;
selectedDate.textContent = dateToString(todayFormat);

// format month to string
function dateToString(date) {
  let dateObj = new Date(date);
  let options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return dateObj.toLocaleDateString("en-us", options);
}

async function getApodImg() {
    showLoading();
    let res = await fetch(
        "https://api.nasa.gov/planetary/apod?api_key=pxe2ZN9igp6mZ9tThfWobA7ekGcPx7RsKX3hoXRH",
    );
    let finalRes = await res.json();
    if (res.status >= 200 && res.status < 300) {
        let stringDate = dateToString(finalRes.date);
        apodImage.setAttribute("src", `${finalRes.url}`);
        apodDate.textContent = `Astronomy Picture of the Day - ${stringDate}`;
        apodTitle.innerHTML = finalRes.title;
        apodDateDetail.innerHTML = `<i class="far fa-calendar mr-2"></i>${stringDate}`;
        apodExplanation.textContent = finalRes.explanation;
        apodCopyright.classList.add("d-none");
        apodDateInfo.textContent = stringDate;
        apodMediaType.textContent = finalRes.media_type;
        viewFull.classList.remove("hidden");
        viewFull.addEventListener("click", (e) => {
        window.open(`${finalRes.url}`, "_blank");
        e.stopPropagation();
        });
        hideLoading();
    } else {
        apodDateDetail.innerHTML = `<i class="far fa-calendar mr-2"></i> Invalid Date`;
        apodExplanation.textContent = "";
        apodDateInfo.textContent = "Invalid Date";
        apodDate.textContent = `Astronomy Picture of the Day - Invalid Date `;
        apodLoading.innerHTML = `
                <i class="fas fa-exclamation-triangle text-4xl text-red-400 mb-4"></i>
                <p class="text-slate-400">Failed to load today's image</p>
                <p class="text-slate-500 text-sm mt-2">Please try again later</p>
            `;
    }
}

function showLoading() {
  apodLoading.classList.remove("hidden");
  apodImage.classList.add("hidden");
  apodDateDetail.innerHTML = `<i class="far fa-calendar mr-2"></i> Loading....`;
  apodExplanation.textContent = "Loading Description ...";
  apodDateInfo.textContent = "Loading....";
  apodDate.textContent = `Astronomy Picture of the Day - Loading.... `;
  apodTitle.innerHTML = " ";
  apodCopyright.textContent = "";
  viewFull.classList.add("hidden");
}
function hideLoading() {
    apodLoading.classList.add("hidden");
    apodImage.classList.remove("hidden");
}
//////////////////////////////////////////////////////////
function formatlaunchTime(time){
    let timeObj=new Date(time)
    let options3={
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true, 
        timeZone: 'UTC'
    }
    return timeObj.toLocaleTimeString("en-us",options3)
    
}
function formatlaunchDate(date){
    let dateObj2=new Date(date)
    let options2={
        weekday:'long',
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
    }
    return dateObj2.toLocaleDateString("en-us",options2)
    
}
let featuredLaunch = document.getElementById("featured-launch");
let launchesGrid=document.getElementById("launches-grid")
async function getLaunches() {
    let lanunchRes = await fetch(
        "https://lldev.thespacedevs.com/2.3.0/launches/upcoming/?limit=10",
    );
    let launchesFinalRes = await lanunchRes.json();
    let launchesFinalResList = launchesFinalRes.results;
        
    let featuredLaunchBox = ``;
    let launchesGridBox=``;
    for (let i = 0; i < launchesFinalResList.length; i++) {
        if(i==0){
            featuredLaunchBox += `
        <div
            class="relative bg-slate-800/30 border border-slate-700 rounded-3xl overflow-hidden group hover:border-blue-500/50 transition-all"
        >
            <div
            class="absolute inset-0 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
            ></div>
            <div class="relative grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
            <div class="flex flex-col justify-between">
                <div>
                <div class="flex items-center gap-3 mb-4">
                    <span
                    class="px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold flex items-center gap-2"
                    >
                    <i class="fas fa-star"></i>
                    Featured Launch
                    </span>
                    <span
                    class="px-4 py-1.5 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold"
                    >
                    Go
                    </span>
                </div>
                <h3 class="text-3xl font-bold mb-3 leading-tight">
                    ${launchesFinalResList[i].name}
                </h3>
                <div
                    class="flex flex-col xl:flex-row xl:items-center gap-4 mb-6 text-slate-400"
                >
                    <div class="flex items-center gap-2">
                    <i class="fas fa-building"></i>
                    <span>${launchesFinalResList[i].launch_service_provider.name}</span>
                    </div>
                    <div class="flex items-center gap-2">
                    <i class="fas fa-rocket"></i>
                    <span>${launchesFinalResList[i].rocket.configuration.name}</span>
                    </div>
                </div>
                <div
                    class="inline-flex items-center gap-3 px-6 py-3 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-xl mb-6"
                >
                    <i class="fas fa-clock text-2xl text-blue-400"></i>
                    <div>
                    <p class="text-2xl font-bold text-blue-400">${launchesFinalResList[i].agency_launch_attempt_count_year}</p>
                    <p class="text-xs text-slate-400">Days Until Launch</p>
                    </div>
                </div>
                <div class="grid xl:grid-cols-2 gap-4 mb-6">
                    <div class="bg-slate-900/50 rounded-xl p-4">
                    <p
                        class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                    >
                        <i class="fas fa-calendar"></i>
                        Launch Date
                    </p>
                    <p class="font-semibold">${formatlaunchDate(launchesFinalResList[i].window_start)}</p>
                    </div>
                    <div class="bg-slate-900/50 rounded-xl p-4">
                    <p
                        class="text-xs text-slate-400 mb-1 flex items-center gap-2"
                    >
                        <i class="fas fa-clock"></i>
                        Launch Time
                    </p>
                    <p class="font-semibold">${formatlaunchTime(launchesFinalResList[i].window_start)} UTC</p>
                    </div>
                    <div class="bg-slate-900/50 rounded-xl p-4">
                    <pclass="text-xs text-slate-400 mb-1 flex items-center gap-2">
                        <i class="fas fa-map-marker-alt"></i>
                        Location
                    </pclass=>
                    <p class="font-semibold text-sm">${launchesFinalResList[i].pad.location.name}</p>
                    </div>
                    <div class="bg-slate-900/50 rounded-xl p-4">
                    <p class="text-xs text-slate-400 mb-1 flex items-center gap-2">
                        <i class="fas fa-globe"></i>
                        Country
                    </p>
                    <p class="font-semibold">${launchesFinalResList[i].pad.country.name}</p>
                    </div>
                </div>
                <p class="text-slate-300 leading-relaxed mb-6">
                    ${launchesFinalResList[i].mission.description}
                </p>
                </div>
                <div class="flex flex-col md:flex-row gap-3">
                <button class="flex-1 self-start md:self-center px-6 py-3 bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors font-semibold flex items-center justify-center gap-2">
                    <i class="fas fa-info-circle"></i>
                    View Full Details
                </button>
                <div class="icons self-end md:self-center">
                    <button class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors" >
                    <i class="far fa-heart"></i>
                    </button>
                    <button class="px-4 py-3 bg-slate-700 rounded-xl hover:bg-slate-600 transition-colors">
                    <i class="fas fa-bell"></i>
                    </button>
                </div>
                </div>
            </div>
            <div class="relative">
                <div class="relative h-full min-h-[0px] rounded-2xl overflow-hidden bg-slate-900/50">
                    <img src="images/launch-placeholder.png" alt="Nuri | NeonSat-2 to 6" class="w-full h-full object-cover" onerror="this.onerror=null; this.src='/images/launch-placeholder.png';">
                    <div class="flex items-center justify-center h-full bg-slate-800">
                        <i class="fas fa-rocket text-9xl text-slate-700/50"></i>
                    </div>
                    <div class="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent"></div>
                </div>
            </div>
            </div>
        </div>
        
        `;
        }else
        {
            launchesGridBox+=`
            <div
                class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer"
                >
                <div
                    class="relative h-48 bg-slate-900/50 flex items-center justify-center"
                >
                    <img src="${launchesFinalResList[i].image.image_url}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onerror="this.onerror=null; this.src='images/launch-placeholder.png';" />
                    <div class="absolute top-3 right-3">
                    <span
                        class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold"
                    >
                        Go
                    </span>
                    </div>
                </div>
                <div class="p-5">
                    <div class="mb-3">
                    <h4
                        class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors"
                    >
                        ${launchesFinalResList[i].name}}
                    </h4>
                    <p class="text-sm text-slate-400 flex items-center gap-2">
                        <i class="fas fa-building text-xs"></i>
                        ${launchesFinalResList[i].launch_service_provider.name  }
                    </p>
                    </div>
                    <div class="space-y-2 mb-4">
                    <div class="flex items-center gap-2 text-sm">
                        <i class="fas fa-calendar text-slate-500 w-4"></i>
                        <span class="text-slate-300">${formatlaunchDate(launchesFinalResList[i].window_start)}</span>
                    </div>
                    <div class="flex items-center gap-2 text-sm">
                        <i class="fas fa-clock text-slate-500 w-4"></i>
                        <span class="text-slate-300">${formatlaunchTime(launchesFinalResList[i].window_start)}</span>
                    </div>
                    <div class="flex items-center gap-2 text-sm">
                        <i class="fas fa-rocket text-slate-500 w-4"></i>
                        <span class="text-slate-300">${launchesFinalResList[i].rocket.configuration.name}</span>
                    </div>
                    <div class="flex items-center gap-2 text-sm">
                        <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                        <span class="text-slate-300 line-clamp-1">${launchesFinalResList[i].pad.location.name}</span>
                    </div>
                    </div>
                    <div
                    class="flex items-center gap-2 pt-4 border-t border-slate-700"
                    >
                    <button
                        class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold"
                    >
                        Details
                    </button>
                    <button
                        class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                    >
                        <i class="far fa-heart"></i>
                    </button>
                    </div>
                </div>
            </div>
            `
        }
    }
    featuredLaunch.innerHTML=featuredLaunchBox
    launchesGrid.innerHTML=launchesGridBox
}
////////////////////////////////////////////////////////////////////////////
let planets=document.querySelectorAll(".planet-card")
let planetDetailImg=document.getElementById("planet-detail-image")
let planetDetailName=document.getElementById("planet-detail-name")
let planetDetailDes=document.getElementById("planet-detail-description")
let planetRaduis=document.getElementById("planet-radius")
let planetDistance=document.getElementById("planet-distance")
let planetMass=document.getElementById("planet-mass")
let planetDensity=document.getElementById("planet-density")
let planetOrbitalPeriod=document.getElementById("planet-orbital-period")
let planetRotation=document.getElementById("planet-rotation")
let planetMoons=document.getElementById("planet-moons")
let planetGravity=document.getElementById("planet-gravity")
let planetDiscoverer=document.getElementById("planet-discoverer")
let planetBodyType=document.getElementById("planet-body-type")
let planetFacts=document.getElementById("planet-facts")
let planetPerihelion=document.getElementById("planet-perihelion")
let planetAphelion=document.getElementById("planet-aphelion")
let planetEnccentericity=document.getElementById("planet-eccentricity")
let planetInclination=document.getElementById("planet-inclination")
let planetAxialTilt=document.getElementById("planet-axial-tilt")
let planetTemp=document.getElementById("planet-temp")
let planetEscape=document.getElementById("planet-escape")
let planetDiscoveryDate=document.getElementById("planet-discovery-date")
let planetVolume=document.getElementById("planet-volume")

async function getPlanets(){
    let planetsRes= await fetch("https://solar-system-opendata-proxy.vercel.app/api/planets")
    let planetsFinalRes=await planetsRes.json()
    let planetsBody=planetsFinalRes.bodies
    for(let i=0;i<planets.length;i++){
        let planet=planets[i]
        planet.addEventListener("click",()=>{
            for(let j=0;j<planetsBody.length;j++){
                let body=planetsBody[j]
                if(planet.getAttribute("data-planet-id")==body.englishName.toLowerCase()){
                    planetDetailImg.setAttribute("src",`images/${body.englishName.toLowerCase()}.png`)
                    planetDetailName.textContent=body.englishName
                    planetDetailDes.textContent=body.description
                    planetRaduis.textContent=`${Math.round(body.meanRadius).toLocaleString()} km`
                    let distance = body.semimajorAxis / 1000000;
                    planetDistance.textContent = `${distance.toFixed(1)}M km`;
                    planetMass.innerHTML=`${body.mass.massValue} &times; 10<sup>${body.mass.massExponent}</sup> kg`
                    planetDensity.textContent=`${body.density.toFixed(2)} g/cm³`
                    planetOrbitalPeriod.textContent=`${body.sideralOrbit.toFixed(2)} days`
                    planetRotation.textContent=`${body.sideralRotation.toFixed(2)} hours`
                    planetMoons.textContent=`${body.moons?body.moons.length:0}`
                    planetGravity.innerHTML=`${body.gravity.toFixed(2)} m/s<sup>2</sup>`
                    planetDiscoverer.textContent=`${body.discoveredBy?body.discoveredBy:"Known since antiquity"}`
                    planetDiscoveryDate.textContent=`${body.discoveryDate?body.discoveryDate:"Ancient times"}`
                    planetBodyType.textContent=body.bodyType
                    planetVolume.innerHTML=`${body.vol.volValue} &times; 10^${body.vol.volExponent} km<sup>3</sup>`
                    let planetFactsBox=`
                                    <li class="flex items-start">
                                        <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                                        <span class="text-slate-300"
                                        >Mass: ${body.mass.massValue} &times; 10<sup>${body.mass.massExponent}</sup> kg</span
                                        >
                                    </li>
                                    <li class="flex items-start">
                                        <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                                        <span class="text-slate-300"
                                        >Surface gravity: ${body.gravity.toFixed(2)} m/s<sup>2</sup> </span
                                        >
                                    </li>
                                    <li class="flex items-start">
                                        <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                                        <span class="text-slate-300"
                                        >Density: ${body.density.toFixed(4)} g/cm³</span
                                        >
                                    </li>
                                    <li class="flex items-start">
                                        <i class="fas fa-check text-green-400 mt-1 mr-2"></i>
                                        <span class="text-slate-300"
                                        >Axial tilt: ${body.axialTilt}°</span
                                        >
                                    </li>
                                `
                    planetFacts.innerHTML=planetFactsBox
                    let perihelion=body.perihelion/1000000
                    planetPerihelion.textContent=`${perihelion.toFixed(1)}M km`
                    let aphelion=body.aphelion/1000000
                    planetAphelion.textContent=`${aphelion.toFixed(1)}M km`
                    planetEnccentericity.textContent=`${body.eccentricity}`
                    planetInclination.textContent=`${body.inclination.toFixed(2)}°`
                    planetAxialTilt.textContent=`${body.axialTilt}°`
                    planetTemp.textContent=`${body.avgTemp}°k`
                    let escape=body.escape/1000
                    planetEscape.textContent=`${(escape.toFixed(1))}km/s`
                    
                    
                }
            }           
        })
        let earthCard = document.querySelector('.planet-card[data-planet-id="earth"]');
        if (earthCard) {
            earthCard.click();
        }
    }
}
/////////////////////////////////////
getApodImg()
getLaunches()
getPlanets()
///////////////////////////////////////
///side bar toggle

