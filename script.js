const URL = "https://65417e9bf0b8287df1fe6a21.mockapi.io/users/";

const getId = document.getElementById("inputGet1Id");
const postName = document.getElementById("inputPostNombre");
const postLastName = document.getElementById("inputPostApellido");
const putId = document.getElementById("inputPutId");
const modalNombre = document.getElementById("inputPutNombre");
const modalApellido = document.getElementById("inputPutApellido");
const deleteId = document.getElementById("inputDelete");

const btnGet = document.getElementById("btnGet1");
const btnPost = document.getElementById("btnPost");
const btnPut = document.getElementById("btnPut");
const btnDel = document.getElementById("btnDelete");
const btnSendChanges = document.getElementById("btnSendChanges");

const result = document.getElementById("results");
const alerta = document.getElementById("alert-error");

//Inputs----------------------------------------
const postbox = document.getElementById("post-box");
postbox.addEventListener("keydown", () => {
  if (event.key == "Delete" || event.key == "Backspace") {
    if (postName.value.length <= 1 && postLastName.value.length <= 1) {
      btnPost.disabled = true;
    }
  } else {
    if (
      postName != "" &&
      postLastName != "" &&
      postName != null &&
      postLastName != null &&
      postName != undefined &&
      postLastName != undefined
    ) {
      btnPost.disabled = false;
    } else {
      btnPost.disabled = true;
    }
  }
});

putId.addEventListener("input", () => {
  if (putId != "" && putId != null && putId != undefined) {
    btnPut.disabled = false;
  } else {
    btnPut.disabled = true;
  }
});

deleteId.addEventListener("input", () => {
  if (deleteId != "") {
    btnDel.disabled = false;
  } else {
    btnDel.disabled = true;
  }
});
//----------------------------------------------

async function getData() {
  const response = await fetch(URL);
  const info = await response.json();
  result.innerHTML = "";
  info.forEach((element) => {
    showObject(element);
  });
}

function showObject(object) {
  for (const key in object) {
    result.innerHTML += `<p><strong>${key}:</strong> ${object[key]}</p>`;
  }
}

btnGet.addEventListener("click", async () => {
  const response = await fetch(URL + getId.value);
  const data = await response.json();
  result.innerHTML = "";
  if (response.ok) {
    alerta.classList.remove("show");
    if (getId.value == "" || getId.value == null || getId.value == undefined) {
      data.forEach((element) => {
        showObject(element);
      });
    } else {
      showObject(data);
    }
  } else {
    alerta.classList.add("show");
  }
});

btnPost.addEventListener("click", async () => {
  if (postName.value == "" || postLastName.value == "") {
    alert("No puede haber campos vacios");
  } else {
    let datos = {
      name: postName.value,
      last_name: postLastName.value,
    };
    const response = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });
    if (response.ok) {
      alerta.classList.remove("show");
      postName.value = "";
      postLastName.value = "";
      let data = await response.json();
      result.innerHTML = "";
      getData();
    } else {
      alerta.classList.add("show");
    }
  }
});

btnDel.addEventListener("click", async () => {
  const response = await fetch(URL + deleteId.value, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    alerta.classList.remove("show");
    let data = await response.json();
    result.innerHTML = "";
    getData();
  } else {
    alerta.classList.add("show");
  }
});

btnPut.addEventListener("click", async () => {
  const res = await fetch(URL + putId.value);
  let data = await res.json();
  if (data.name == undefined || data.last_name == undefined) {
    alert("No existe el usuario");
    modalNombre.value = "";
    modalApellido.value = "";
    btnSendChanges.disabled = true;
  } else {
    modalNombre.value = data.name;
    modalApellido.value = data.last_name;
    btnSendChanges.disabled = false;
  }
});

btnSendChanges.addEventListener("click", async () => {
  let datos = {
    name: modalNombre.value,
    last_name: modalApellido.value,
  };
  const response = await fetch(URL + putId.value, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });
  if (response.ok) {
    alerta.classList.remove("show");
    let data = await response.json();
    result.innerHTML = "";
    getData();
  } else {
    alerta.classList.add("show");
  }
});
