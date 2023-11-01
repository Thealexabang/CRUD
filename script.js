const URL = "https://65417e9bf0b8287df1fe6a21.mockapi.io/users/";

const getId = document.getElementById("inputGet1Id");
const postName = document.getElementById("inputPostNombre");
const postLastname = document.getElementById("inputPostApellido");
const putId = document.getElementById("inputPutId");
const deleteId = document.getElementById("inputDelete");

let datos ={
     name: "getId.value" 
}

const btnGet = document.getElementById("btnGet1");
const btnPost = document.getElementById("btnPost");
const btnPut = document.getElementById("btnPut");
const btnDel = document.getElementById("inputDelete");

const result = document.getElementById("results");

btnGet.addEventListener("click", async ()=>{
    const response = await fetch(URL + getId.value);
    const data = await response.json();
    if (getId.value == "" || getId.value == null || getId.value == undefined){
        result.innerHTML = "";
        data.forEach(element => {
            showObject(element);
        });
    } else {
        result.innerHTML = "";
        showObject(data);
    }
});
function showObject(object){
    for (const key in object){
        result.innerHTML += `<p><strong>${key}:</strong> ${object[key]}</p>`;
    }
}

btnPost.addEventListener("click", async () =>{
    const response = await fetch(URL)
})