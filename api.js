// document.addEventListener("DOMContentLoaded", function () {
//   // Set background color using JavaScript
//   const container = document.querySelector('.title-welcome');
//   const overlay = document.createElement('div');
//   overlay.classList.add('overlay');
//   container.appendChild(overlay);
// })

const API_KEY = 'api_key=92b02f3c7b0e895f6fcff7dcb83fcaf4';
const BASE_URL = 'https://api.themoviedb.org/3';
const POPULAR_URL = BASE_URL + '/movie/popular?' + API_KEY;
const TOPRATED_URL = BASE_URL + '/movie/top_rated?' + API_KEY;
const UPCOMING_URL = BASE_URL + '/movie/upcoming?' + API_KEY;
const POPULARTV_URL = BASE_URL + '/tv/popular?' + API_KEY;
const TOPRATEDTV_URL = BASE_URL + '/tv/top_rated?' + API_KEY;
// const BGR_URL= BASE_URL+''+ API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const main = document.getElementById("main");
card = document.getElementsByClassName("card");
image = document.querySelector(".image");
var startslice = 1;
var endslice = 8;
let modalCounter = 0;
async function popularmovies() {
  console.log('getting data');
  let response = await fetch(POPULAR_URL);
  let data = await response.json();
  data.results.slice(startslice + 2, endslice + 2).forEach(element => {
    const cast_URL= `https://api.themoviedb.org/3/movie/${element.id}/credits?api_key=92b02f3c7b0e895f6fcff7dcb83fcaf4`;
    modalCounter++;
    var cardElement = document.createElement('div');
    cardElement.className = 'col-md-2-mb-2';
    cardElement.innerHTML = `
        <div class="card">
         <a><img src="${IMG_URL + element.poster_path}" class="card-img-top" alt="No Image"></a>
           <div class="card-body">
           <h5 class="card-title">${element.title}</h5>
           <h8 class="card-releasedate">Released On:<br>${element.release_date}</h8>           
           <button type="button" id="modalopenbtn" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#modal${modalCounter}">
           Know More  
           </button>
           </div>
        </div>
      `;
    document.getElementById("popmoviedata").appendChild(cardElement);
    const modal = document.createElement("div");
    modal.classList.add("modal", "fade");
    modal.id = `modal${modalCounter}`;
    modal.tabIndex = "-1";
    modal.role = "dialog";
    modal.setAttribute("aria-labelledby", `modal${modalCounter}Label`);
    modal.setAttribute("aria-hidden", "&true");
    modal.innerHTML = `
      <div class="modal-dialog" >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modal${modalCounter}Label">${element.title}</h5>
            
          </div>
          <div class="modal-body" id="modal${element.title}Label">     
            <img src="${IMG_URL + element.poster_path}" class="img-fluid" alt="Modal Image">
            <h8 class="card-modalreleasedate">Released On:${element.release_date}</h8> 
            <h5 class="card-modaltext">${element.overview}</h5>
            <h5>Cast Details:</h5>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    `;

    // Append modal to the body
    document.body.appendChild(modal);
      async function castdata(){
        let response2=await fetch(cast_URL);
        let data2= await response2.json();
        data2.cast.forEach(elem=>{
          var CastElement=document.createElement("div");
          CastElement.classList="card-modalcastdetails";
          if(elem.profile_path.status_code==404){
            CastElement.innerHTML=`
          <div class="card">
          <div class="card-castdetailsimage">
          <img src="photos/No photo.jpg" class="img-fluid" alt="Modal Image">
          </div>
          <h6 class="card-castdetailstext">${elem.name} as ${elem.character}</h6> 
         </div>
           `
           document.getElementById(`modal${element.title}Label`).appendChild(CastElement);
          }
          else{
          CastElement.innerHTML=`
          <div class="card">
          <div class="card-castdetailsimage">
          <img src="${IMG_URL + elem.profile_path}" class="img-fluid" alt="Modal Image">
          </div>
          <h6 class="card-castdetailstext"><b>${elem.name}</b> as ${elem.character}</h6> 
         </div>
           `
           document.getElementById(`modal${element.title}Label`).appendChild(CastElement);
          }
        })
      }
        castdata()
  })
}
popularmovies()
async function populartvshows() {
  console.log('getting data');
  let response = await fetch(POPULARTV_URL);
  let data = await response.json();
  console.log(data.results);
  let poptvstartslice = Math.floor(Math.random() * 15)
  data.results.slice(parseInt(poptvstartslice), parseInt(poptvstartslice) + 7).forEach(element => {
    modalCounter++;
    const casttv_URL= `https://api.themoviedb.org/3/tv/${element.id}/credits?api_key=92b02f3c7b0e895f6fcff7dcb83fcaf4`;
    var cardElement = document.createElement('div');
    cardElement.className = 'col-md-2-mb-2';
    cardElement.innerHTML = `
        <div class="card">
         <a ><img src="${IMG_URL + element.poster_path}" class="card-img-top" alt="No Image"></a>
           <div class="card-body">
            <h5 class="card-title">${element.original_name}</h5>
           <h8 class="card-releasedate">First Episode:<br>${element.first_air_date}</h8>           
           <button type="button" id="modalopenbtn" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#modal${modalCounter}">
           Know More  
           </button>
          </div>
        </div>
      `;
    document.getElementById("poptvdata").appendChild(cardElement);
    const modal = document.createElement("div");
    modal.classList.add("modal", "fade");
    modal.id = `modal${modalCounter}`;
    modal.tabIndex = "-1";
    modal.role = "dialog";
    modal.setAttribute("aria-labelledby", `modal${modalCounter}Label`);
    modal.setAttribute("aria-hidden", "&true");
    modal.innerHTML = `
      <div class="modal-dialog" >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modal${modalCounter}Label">${element.original_name}</h5>
          </div>
          <div class="modal-body" id="modal${element.original_name}Label">     
            <img src="${IMG_URL + element.poster_path}" class="img-fluid" alt="Modal Image">
            <h8 class="card-modalreleasedate">Released On:${element.first_air_date}</h8> 
            <h5 class="card-modaltext">${element.overview}</h5>
            <h5>Cast Details:</h5>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    `;

    // Append modal to the body
    document.body.appendChild(modal);
    async function casttvdata() {
        let response2 = await fetch(casttv_URL);
        let data2 = await response2.json();
        console.log(data2.cast);
        data2.cast.forEach(elem => {
            var CastElement = document.createElement("div");
            CastElement.classList = "card-modalcastdetails";
            CastElement.innerHTML=`
            <div class="card">
            <div class="card-castdetailsimage">
            <img src="${IMG_URL + elem.profile_path}" class="img-fluid" alt="Modal Image">
            </div>
            <h6 class="card-castdetailstext"><b>${elem.name}</b> as ${elem.character}</h6> 
           </div>
             `
             document.getElementById(`modal${elem.title}Label`).appendChild(CastElement);
            
        })
      
      }
    casttvdata()
  })
}
populartvshows()
function popmovbutton() {
  document.getElementById("poptvdata").style.display = 'none';
  document.getElementById("popmoviedata").style.display = 'flex';
}
function poptvbutton() {
  document.getElementById("popmoviedata").style.display = 'none';
  document.getElementById("poptvdata").style.display = 'flex';
}


async function topratedmovies() {
  // console.log('getting data');
  let response = await fetch(TOPRATED_URL);
  let data = await response.json();
  // console.log(data.results);
  let topmovstartslice = Math.floor(Math.random() * 15)
  data.results.slice(parseInt(topmovstartslice), parseInt(topmovstartslice) + 7).forEach(element => {
    modalCounter++;
    const cast_URL= `https://api.themoviedb.org/3/movie/${element.id}/credits?api_key=92b02f3c7b0e895f6fcff7dcb83fcaf4`;
    var cardElement = document.createElement('div');
    cardElement.className = 'col-md-2-mb-2';
    cardElement.innerHTML = `
        <div class="card">
         <a><img src="${IMG_URL + element.poster_path}" class="card-img-top" alt="No Image"></a>
           <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
           <h8 class="card-releasedate">Released On:<br>${element.release_date}</h8>     
           <button type="button" id="modalopenbtn" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#modal${modalCounter}">
           Know More  
           </button>    
           
          </div>
        </div>
      `;
    document.getElementById("topmoviedata").appendChild(cardElement);
    const modal = document.createElement("div");
    modal.classList.add("modal", "fade");
    modal.id = `modal${modalCounter}`;
    modal.tabIndex = "-1";
    modal.role = "dialog";
    modal.setAttribute("aria-labelledby", `modal${modalCounter}Label`);
    modal.setAttribute("aria-hidden", "&true");
    modal.innerHTML = `
      <div class="modal-dialog" >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modal${modalCounter}Label">${element.title}</h5>
          </div>
          <div class="modal-body" id="modal${element.title}Label">     
            <img src="${IMG_URL + element.poster_path}" class="img-fluid" alt="Modal Image">
            <h8 class="card-modalreleasedate">Released On:${element.release_date}</h8> 
            <h5 class="card-modaltext">${element.overview}</h5>
            <h5>Cast Details:</h5>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    `;

    // Append modal to the body
    document.body.appendChild(modal);
      async function castdata(){
        let response2=await fetch(cast_URL);
        let data2= await response2.json();
        console.log(data2.cast);
        data2.cast.forEach(elem=>{
          var CastElement=document.createElement("div");
          CastElement.classList="card-modalcastdetails";
          if(elem.profile_path.status_code==404){
            CastElement.innerHTML=`
          <div class="card">
          <div class="card-castdetailsimage">
          <img src="photos/No photo.jpg" class="img-fluid" alt="Modal Image">
          </div>
          <h6 class="card-castdetailstext"><b>${elem.name}</b> as ${elem.character}</h6> 
         </div>
           `
           document.getElementById(`modal${element.title}Label`).appendChild(CastElement);
          }
          else{
          CastElement.innerHTML=`
          <div class="card">
          <div class="card-castdetailsimage">
          <img src="${IMG_URL + elem.profile_path}" class="img-fluid" alt="Modal Image">
          </div>
          <h6 class="card-castdetailstext"><b>${elem.name}</b> as ${elem.character}</h6> 
         </div>
           `
           document.getElementById(`modal${element.title}Label`).appendChild(CastElement);
          }
           
        })
      }
        castdata()
  })
}
async function topratedtvshows() {
  // console.log('getting data');
  let response = await fetch(TOPRATEDTV_URL);
  let data = await response.json();
  // console.log(data.results);
  let toptvstartslice = Math.floor(Math.random() * 10)
  data.results.slice(parseInt(toptvstartslice), parseInt(toptvstartslice) + 7).forEach(element => {
    modalCounter++;
    var cardElement = document.createElement('div');
    cardElement.className = 'col-md-2-mb-2';
    cardElement.innerHTML = `
        <div class="card">
         <a ><img src="${IMG_URL + element.poster_path}" class="card-img-top" alt="No Image"></a>
           <div class="card-body">
            <h5 class="card-title">${element.original_name}</h5>
           <h8 class="card-releasedate">First Episode:<br>${element.first_air_date}</h8>           
           <button type="button" id="modalopenbtn" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#modal${modalCounter}">
           Know More  
           </button>
          </div>
        </div>
      `;
    document.getElementById("toptvdata").appendChild(cardElement);
    const modal = document.createElement("div");
    modal.classList.add("modal", "fade");
    modal.id = `modal${modalCounter}`;
    modal.tabIndex = "-1";
    modal.role = "dialog";
    modal.setAttribute("aria-labelledby", `modal${modalCounter}Label`);
    modal.setAttribute("aria-hidden", "&true");
    modal.innerHTML = `
      <div class="modal-dialog" >
        <div class="modal-content">
          <div class="modal-header" id="modal${element.original_name}Label">
            <h5 class="modal-title" id="modal${modalCounter}Label">${element.original_name}</h5>
          </div>
          <div class="modal-body" id="modal${element.original_name}Label">     
            <img src="${IMG_URL + element.poster_path}" class="img-fluid" alt="Modal Image">
            <h8 class="card-modalreleasedate">Released On:${element.first_air_date}</h8> 
            <h5 class="card-modaltext">${element.overview}</h5>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    `;

    // Append modal to the body
    document.body.appendChild(modal);
  })
}
function topmovbutton() {
  document.getElementById("toptvdata").style.display = 'none';
  document.getElementById("topmoviedata").style.display = 'flex';
}
function toptvbutton() {
  document.getElementById("topmoviedata").style.display = 'none';
  document.getElementById("toptvdata").style.display = 'flex';
}
async function upcomingmovies() {

  console.log('getting data');
  let response = await fetch(UPCOMING_URL);
  let data = await response.json();
  // console.log(data.results);
  let upmovstartslice = Math.floor(Math.random() * 15)
  data.results.slice(parseInt(upmovstartslice), parseInt(upmovstartslice) + 7).forEach(element => {
    modalCounter++;
    const cast_URL= `https://api.themoviedb.org/3/movie/${element.id}/credits?api_key=92b02f3c7b0e895f6fcff7dcb83fcaf4`;
    
    var cardElement = document.createElement('div');
    cardElement.className = 'col-md-2-mb-2';
    cardElement.innerHTML = `
        <div class="card">
         <a><img src="${IMG_URL + element.poster_path}" class="card-img-top" alt="No Image"  ></a>
           <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
           <h8 class="card-releasedate">Released On:<br>${element.release_date}</h8>           
           <button type="button" id="modalopenbtn" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#modal${modalCounter}">
           Know More  
           </button>
          </div>
        </div>
      `;
    document.getElementById("upcomingmovies").appendChild(cardElement);
    const modal = document.createElement("div");
    modal.classList.add("modal", "fade");
    modal.id = `modal${modalCounter}`;
    modal.tabIndex = "-1";
    modal.role = "dialog";
    modal.setAttribute("aria-labelledby", `modal${modalCounter}Label`);
    modal.setAttribute("aria-hidden", "&true");
    modal.innerHTML = `
      <div class="modal-dialog" >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modal${modalCounter}Label">${element.title}</h5>
          </div>
          <div class="modal-body" id="modal${element.title}Label">     
            <img src="${IMG_URL + element.poster_path}" class="img-fluid" alt="Modal Image">
            <h8 class="card-modalreleasedate">Released On:${element.release_date}</h8> 
            <h5 class="card-modaltext">${element.overview}</h5>
            <h6>Cast Details:</h6>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    `;

    // Append modal to the body
    document.body.appendChild(modal);
      async function castdata(){
        let response2=await fetch(cast_URL);
        let data2= await response2.json();
        console.log(data2.cast);
        data2.cast.forEach(elem=>{
          var CastElement=document.createElement("div");
          CastElement.classList="card-modalcastdetails";
          if(elem.profile_path.status_code==404){
            CastElement.innerHTML=`
          <div class="card">
          <div class="card-castdetailsimage">
          <img src="photos/No photo.jpg" class="img-fluid" alt="Modal Image">
          </div>
          <h6 class="card-castdetailstext"><b>${elem.name}</b> as ${elem.character}</h6> 
         </div>
           `
           document.getElementById(`modal${element.title}Label`).appendChild(CastElement);
          }
          else{
          CastElement.innerHTML=`
          <div class="card">
          <div class="card-castdetailsimage">
          <img src="${IMG_URL + elem.profile_path}" class="img-fluid" alt="Modal Image">
          </div>
          <h6 class="card-castdetailstext"><b>${elem.name}</b> as ${elem.character}</h6> 
         </div>
           `
           document.getElementById(`modal${element.title}Label`).appendChild(CastElement);
          }
        })
      }
        castdata()

  })
}
function search() {
  console.log("clicked");
  var searchinput = document.getElementById("searchinput").value;
  displayResults(searchinput);
  const moviename = document.getElementById("searchResults").innerHTML;
  console.log(moviename);
  window.localStorage.setItem("movie", moviename);
}

function displayResults(query) {
  var resultsContainer = document.getElementById("searchResults");
  var results = query;
  resultsContainer.innerHTML = results;
  // console.log(document.getElementById("searchResults").innerHTML);
}


topratedmovies()
upcomingmovies()
topratedtvshows()
// function handleEnterKeyPress(event) {
            
//   if (event.keyCode === 13) {
//       search();
//   }
// }
// document.getElementById("searchinput").addEventListener("onkeydown", handleEnterKeyPress);


// document.getElementById('dropdown-popitem').addEventListener('click', function() {
//   localStorage.setItem('previousPage', window.location.href);
// });