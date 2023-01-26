
let valid=()=>{
    let input =document.querySelector(".input");
    let ok =document.querySelector(".ok");
     ok.addEventListener("click",(e)=>{

        if(input.value==""){
            e.preventDefault();
        }

        else{
            
        }
     })

}

window.addEventListener("load", () => {
  
    valid();
  });