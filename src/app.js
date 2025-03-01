import axios from 'axios';
import '/src/assets/page.css';
import '/src/assets/photo-card.css';


import photoCard from "./components/photoCard";
import photoList from "./components/photoList";




// criando as variaveis para armazenar os elementos
var photos = [];
var renderPhoto = [];
var filterPhoto = [];
var totalPhotos = null;
var lastElement = 20;
var listViewOn = false;
const container = document.getElementById('container');
// função para buscar as fotos

function getPhotos() {

  axios
  .get("https://jsonplaceholder.typicode.com/photos")
  .then(function (response) {
    photos = response.data;
    renderPhoto = photos;
    totalPhotos = photos.length;
    renderPhotos(renderPhoto);
  })
  .catch((error) => {
    alert(error);
  });
}
getPhotos();

// função para buscar as fotos fim 

function renderPhotos(rendered) {
  container.innerHTML = "";
  rendered.slice(0, lastElement).forEach((photo) => {
    if (listViewOn) {
      container.appendChild(photoList(photo));
    } else {
      container.appendChild(photoCard(photo));
    }
  });
  // chamando função para paginar as fotos
  paginator();
}
// criando função para paginar as fotos
function paginator() {
  if (totalPhotos>= lastElement) {
    var p = document.getElementById('element-num');
    p.innerHTML = ` Mostrando ${lastElement} de ${totalPhotos}`;
  }else{
    var p = document.getElementById('element-num');
    p.innerHTML = ` Mostrando ${totalPhotos} de ${totalPhotos}`;
  }
} // finalizando função para paginar as fotos

// botão para buscar mais fotos
document.getElementById("load-more").addEventListener("click", showMore);

function showMore() {
  if(lastElement < totalPhotos){
    lastElement += 20;
    renderPhoto = photos.slice(0, lastElement);
    renderPhotos(renderPhoto);
  }
} // finalizando botão para buscar mais fotos

// função para filtrar as fotos

document.getElementById("search").addEventListener("input", ({ target }) => {
  const searchInput = target.value;
  filterPhoto = photos.filter(({ title }) => title.indexOf(searchInput) >= 0);
  renderPhoto = filterPhoto.slice(0, 20);
  renderPhotos(renderPhoto);
  totalPhotos = filterPhoto.length;
});

//Visualização por lista

document.getElementById("list").addEventListener("click", listView);

function listView() {
  listViewOn = true;
  renderPhotos(renderPhoto);
}
//Visualização por grid
document.getElementById("grid").addEventListener("click", gridView);

function gridView() {
  listViewOn = false;
  renderPhotos(renderPhoto);
}
