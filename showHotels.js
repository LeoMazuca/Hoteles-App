const menu = document.getElementById("menu")
const toggle = document.getElementById("toggle")
let estado=1;

    toggle.addEventListener("click", ()=>{
        if (estado == 0) {
            menu.className = "hotelList";
            toggle.className = "menuClose"
            estado = 1;
        }else{
            menu.className = "show-menu";
            toggle.className = "menu"
            estado = 0;
        }
})
