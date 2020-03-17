
let tareas = JSON.parse(localStorage.getItem('tareas')) || [];[];
let done = JSON.parse(localStorage.getItem('done')) || [];[];
let doing = JSON.parse(localStorage.getItem('doing')) || [];[];

let titulo = document.getElementById("inputTitulo");
let fecha = document.getElementById("inputFecha");
let descripcion = document.getElementById("inputDescripcion");

listarTareas();
listarDone();
listarDoing();

function modalVacio() {
    inputTitulo.value = "";
    inputFecha.value = "",
    inputDescripcion.value= "";
  }




function listarTareas() {
    ulTareas.innerHTML = "";
    tareas.forEach((item, i) => {
        ulTareas.innerHTML += `<div id="drag1" draggable="true" ondragstart="drag(event), listarDoing()" style="width:auto;" class="card text-center">
        <li><h3 class="card-header">${item.titulo}</h3>
        <p class="badge badge-info">${item.fecha}</p> 
        <p class="card-text">${item.descripcion}<p> <button class="btn btn-primary" onclick="tareaDoing(${i})">Doing</button></li> </div>`;
    })
}

function listarDoing() {
    ulDoing.innerHTML = "";
    doing.forEach((item, i) => {
        ulDoing.innerHTML += `<div id="drag1" draggable="true" ondragstart="drag(event)" style="width:auto;" class="card text-center">
        <li><h3 class="card-header">${item.titulo}</h3>
        <p class="badge badge-info">${item.fecha}</p> 
        <p class="card-text">${item.descripcion}<p> <button class="btn btn-primary" onclick="tareaDone(${i})">Done</button></li>`;
    })
}

function listarDone() {
    ulDone.innerHTML = "";
    done.forEach((item, i) => {
        ulDone.innerHTML += `<div  id="drag1" draggable="true" ondragstart="drag(event)"   style="width:auto;" class="card text-center">
        <li><h3 class="card-header">${item.titulo}</h3> 
        <p class="badge badge-info">${item.fecha}</p> 
        <p class="card-text">${item.descripcion}<p><p><button class="btn btn-primary" onclick="eliminarTarea(${i})">Eliminar</button></li></div>`;
    })
}

function agregarTarea (){
    tareas.push({
        titulo: titulo.value,
        fecha: fecha.value,
        descripcion: descripcion.value,
        
    });
    localStorage.setItem('tareas', JSON.stringify(tareas));

    listarTareas();
}

function tareaDoing(i) {
    doing.push(tareas[i]);
    tareas.splice(i, 1);
    localStorage.setItem('doing', JSON.stringify(doing));
    localStorage.setItem('tareas', JSON.stringify(tareas));
    listarTareas();
    listarDoing();
}

function tareaDone(i) {
    done.push(doing[i]);
    doing.splice(i, 1);
    localStorage.setItem('done', JSON.stringify(done));
    localStorage.setItem('doing', JSON.stringify(tareas));
    listarDoing();
    listarDone();
}

function eliminarTarea (i) {
    done.splice(i, 1);
    localStorage.setItem('done', JSON.stringify(done));
    localStorage.clear();
    listarTareas();
    listarDone();
    listarDoing();
}

function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }


