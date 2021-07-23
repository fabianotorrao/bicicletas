let bikes = []
if (localStorage.getItem('bikes')) {
    bikes = JSON.parse(localStorage.getItem("bikes"))
}
document.querySelector("#add").addEventListener("click", function (event) {
    console.log(bikes)
    let bikeId = prompt("Insira o numero ou nome da bicicleta :")
    if (bikeId && bikes.filter(bike => bike.id == bikeId).length==0) {
        let bike = { id: bikeId, state: true }
        bikes.push(bike)
        localStorage.setItem('bikes', JSON.stringify(bikes))
        let table = document.querySelector("#stockTable")
        table.innerHTML += `
            <tr >
                <th scope="row" id="a${bikeId}" class="free">${bikeId}</th>
                <td>
                    <button value="arrendar" class="btn btn-primary" onclick="arrendar('${bikeId}')" ><img src="https://img.icons8.com/ios/50/ffffff/exit.png" width="20" height="20"/></button>
                    <button value="eliminar" class="btn btn-warning ml-5" onclick="reparar('${bikeId}')"><img width="20" height="20" src="https://img.icons8.com/ios/50/ffffff/wrench--v1.png"/> </button>
                    <button value="eliminar" class="btn btn-danger ml-5" onclick="eliminar('${bikeId}')"><img width="20" height="20"  src="https://img.icons8.com/ios/50/ffffff/delete-trash.png"/> </button>
                    </td>
            </tr>`

    } else {
        alert("Numero/nome repetido ou inválido")
    }

})
window.addEventListener("load", function (event) {

    console.log(bikes)
    if (bikes) {
        bikes.forEach(bike => {
            if (bike.state === true) {
                let table = document.querySelector("#stockTable")
                table.innerHTML += `
            <tr >
                <th scope="row" id="a${bike.id}" class="free">${bike.id}</th>
                <td>
                    <button value="arrendar" class="btn btn-primary" onclick="arrendar('${bike.id}')" ><img src="https://img.icons8.com/ios/50/ffffff/exit.png" width="20" height="20"/></button>
                    <button value="eliminar" class="btn btn-warning ml-5" onclick="reparar('${bike.id}')"><img width="20" height="20" src="https://img.icons8.com/ios/50/ffffff/wrench--v1.png"/> </button>
                    <button value="eliminar" class="btn btn-danger ml-5" onclick="eliminar('${bike.id}')"><img width="20" height="20"  src="https://img.icons8.com/ios/50/ffffff/delete-trash.png"/> </button>
                    </td>
            </tr>`
            } else if (bike.state === false) {
                let table = document.querySelector("#rentedTable")
                table.innerHTML += `
            <tr >
                <th scope="row" id="a${bike.id}" class="rented">${bike.id}</th>
                <td>
                    <button value="arrendar" class="btn btn-primary" onclick="devolver('${bike.id}')" ><img src="https://img.icons8.com/material-outlined/48/ffffff/return.png" width="20" height="20"/></button>
                    
                    </td>
            </tr>`
            } else {
                let table = document.querySelector("#fixTable")
                table.innerHTML += `
            <tr >
                <th scope="row" id="a${bike.id}" class="fix">${bike.id}</th>
                <td>
                    <button value="arrendar" class="btn btn-primary" onclick="devolver('${bike.id}')" ><img src="https://img.icons8.com/material-outlined/48/ffffff/return.png" width="20" height="20"/></button>
                    
                    </td>
            </tr>`


            }

        });

    } else {//no bikes to show
    }

})
function reparar(id) {
    bikes.map(bike => bike.id == id ? bike.state = "fix" : bike)
    let td = document.querySelector(`#a${id}.free`)
    var i = td.parentNode.rowIndex;
    document.querySelector("#stockTable").deleteRow(i)
    localStorage.setItem("bikes", JSON.stringify(bikes))
    let table = document.querySelector("#fixTable")
    table.innerHTML += `
            <tr >
                <th scope="row" id="a${id}" class="fix">${id}</th>
                <td>
                    <button value="arrendar" class="btn btn-primary" onclick="devolver('${id}')" ><img src="https://img.icons8.com/material-outlined/48/ffffff/return.png" width="20" height="20"/></button>
                    
                    </td>
            </tr>`

}
function devolver(id) {
    bikes.map(bike => bike.id == id ? bike.state = true : bike)
    localStorage.setItem("bikes", JSON.stringify(bikes))
    let td = document.querySelector(`#a${id}`)
    console.log(td)
    var i = td.parentNode.rowIndex;
    document.querySelector(td.className == "rented" ? "#rentedTable" : "#fixTable").deleteRow(i)
    let table = document.querySelector("#stockTable")
    table.innerHTML += `
            <tr >
                <th scope="row" id="a${id}" class="free">${id}</th>
                <td>
                    <button value="arrendar" class="btn btn-primary" onclick="arrendar('${id}')" ><img src="https://img.icons8.com/ios/50/ffffff/exit.png" width="20" height="20"/></button>
                    <button value="eliminar" class="btn btn-warning ml-5" onclick="reparar('${id}')"><img width="20" height="20" src="https://img.icons8.com/ios/50/ffffff/wrench--v1.png"/> </button>
                    <button value="eliminar" class="btn btn-danger ml-5" onclick="eliminar('${id}')"><img width="20" height="20"  src="https://img.icons8.com/ios/50/ffffff/delete-trash.png"/> </button>
                    </td>
            </tr>`
}
function arrendar(id) {
    bikes.map(bike => bike.id == id ? bike.state = false : bike)
    let td = document.querySelector(`#a${id}.free`)
    var i = td.parentNode.rowIndex;
    document.querySelector("#stockTable").deleteRow(i)
    localStorage.setItem("bikes", JSON.stringify(bikes))
    let table = document.querySelector("#rentedTable")
    table.innerHTML += `
            <tr >
                <th scope="row" id="a${id}" class="rented">${id}</th>
                <td>
                    <button value="arrendar" class="btn btn-primary" onclick="devolver('${id}')" ><img src="https://img.icons8.com/material-outlined/48/ffffff/return.png" width="20" height="20"/></button>
                    
                    </td>
            </tr>`

}
function eliminar(id) {
    if (confirm(`Certeza que quer eliminar a bicicleta ${id}`)) {
        bikes = bikes.filter(bike => bike.id != id)
        let td = document.querySelector(`#a${id}.free`)
        var i = td.parentNode.rowIndex;
        document.querySelector("#stockTable").deleteRow(i)
        localStorage.setItem("bikes", JSON.stringify(bikes))
    }


}