var selected_col = document.querySelectorAll(".col-1-of-5");

// console.log(selected_col);

selected_col.forEach(item=>{
        item.addEventListener("click",()=>{
             selected_col.forEach(element=>element.classList.remove("selected_col"));
             item.classList.add("selected_col");
        })
    })
