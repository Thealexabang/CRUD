const URL = "https://65417e9bf0b8287df1fe6a21.mockapi.io/users/";

const getId = document.getElementById("inputGet1Id");
const postName = document.getElementById("inputPostNombre");
const postLastName = document.getElementById("inputPostApellido");
const putId = document.getElementById("inputPutId");
const deleteId = document.getElementById("inputDelete");


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

async function getData(){
    const response = await fetch(URL);
    const info = await response.json();
    showObject(info);
};

function showObject(object){
    for (const key in object){
        result.innerHTML += `<p><strong>${key}:</strong> ${object[key]}</p>`;
    }
}

btnPost.addEventListener("click", async ()=>{
    let datos ={
        "name": postName.value,
        "last_name": postLastName.value,
       };
       
    const response = await fetch(URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos),
    });
    if (response.ok){
      postName.value="";
      postLastName.value="";
      getData()
    }
})