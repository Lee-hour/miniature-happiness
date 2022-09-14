let borderBtnColor =  document.querySelectorAll(".header__item");
// console.log(borderBtnColor);

borderBtnColor.forEach(item=>{
        item.addEventListener("click",()=>{
            borderBtnColor.forEach(element=>element.classList.remove("border_buttom"));
            item.classList.add("border_buttom");
        })
})




