document.addEventListener('DOMContentLoaded', function() {
    document.querySelector(".add_user").addEventListener("click",()=>SetVisable());
    document.querySelectorAll(".edit").forEach(element => {element.addEventListener("click",()=>EditValue(element))});
    document.querySelectorAll(".delete").forEach(element => {element.addEventListener("click",()=>DeleteValue(element))});
});
function SetVisable()
{
    let value = document.querySelector(".add_form");
    var style =  window.getComputedStyle(value);
    var display = style.getPropertyValue('display');
    if (display === "none"){
        value.style.display = "block";
    }
    else{
        value.style.display = "none";
    }

}

function DeleteValue(elem){
    const id = elem.getAttribute('data-id');
    // Надсилаємо запит на видалення 
    fetch(``,{
        method: "DELETE",
        body:JSON.stringify({
            "id": id
        })
    });
    
    setTimeout(function() {
        location.reload();
    }, 1000)

}
function EditValue(elem)
{
    const id = elem.getAttribute('data-id');
    let edit_form =  document.createElement("div");
        edit_form.innerHTML = `<tr><form action="/groups" method="post" onsubmit="return false;">
        <td><input type ="text" class="form-control username" name="username"></td>
        <td><input type="hidden" name="Id" value = ${id}></td>
        <td><select class="form-control groups" id= "groups" name="groups"></select></td>
        <button class="btn btn-success editValue" type ="submit">Edit group </button>
        </form></tr>`
        document.querySelector(`#edit-${id}`).insertAdjacentElement('afterend',edit_form);
    // Отримуємо список груп, через надсилання GET запиту
    fetch(`/userlist`,{
        method: 'GET'
    })
    .then(response => response.json()) 
    .then(data => {
        for (var i = 0; i < data.length; i++) {
            var option = document.createElement("option");
            option.text = data[i]["Name"];
            option.value = data[i]["Name"];
            document.querySelector("#groups").appendChild(option);
        }
    });
    document.querySelector(".editValue").addEventListener("click", ()=>SaveEdit(id));
    
}

function SaveEdit(id){
    let username = document.querySelector(".username").value;
    let groups = document.querySelector(".groups").value;
    // Надсилаємо PUT запит
    fetch(``,{
        method: "PUT",
        body:JSON.stringify({
            "id": id,
            "username": username,
            "groups":groups
        })
    });
    setTimeout(function() {
        location.reload();
    }, 1000);
}