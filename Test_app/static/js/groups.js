
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector(".addGroup").addEventListener("click",()=>SetVisable());
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
    fetch(`/groups`,{
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
    // Створюмо форму для редагування групи
    const id = elem.getAttribute('data-id');
    let edit_form =  document.createElement("div");
    edit_form.innerHTML = `<tr><form action="/groups" class="dynamic" method="post" onsubmit="return false;">
    <td><input type ="text" class="form-control Name" name="Name"></td>
    <td><input type ="text" class="form-control Description" name="Descriptions"></td>
    <td><input type="hidden" name="Id" value = ${id}></td>
    <button class="btn btn-success editValue" type ="submit">Edit group </button>
    </form></tr>`
    document.querySelector(`#edit-${id}`).insertAdjacentElement('afterend',edit_form);
    document.querySelector(".editValue").addEventListener("click", ()=>SaveEdit(id));
}

function SaveEdit(id){
    let name = document.querySelector(".Name").value;
    let descriptions = document.querySelector(".Description").value;
    // Надсилаємо PUT запит
    fetch(`/groups`,{
        method: "PUT",
        body:JSON.stringify({
            "id": id,
            "Name": name,
            "Descriptions":descriptions
        })
    });
    // Оновлюємо сторінку через 1 сек
    setTimeout(function() {
        location.reload();
    }, 1000);
}