const agreePlay = () => {
    const modalContent = document.querySelector(".modal-content");
    const modalContainer = document.querySelector(".modal-container");
    const button = document.createElement("div");
    button.classList.add("close");
    button.textContent="Close";
    modalContent.appendChild(button);
    const btn = document.querySelector(".close");
    btn.addEventListener("click", () => {
        modalContainer.parentNode.removeChild(modalContainer);
       
})

}
const typeWriter = async () => {
    const getText =  document.querySelector(".modal-container .modal-body .modal-content .desc #text").textContent;    
    const str = getText;

    var p = document.getElementById('text');
    p.innerHTML = '';
    var n = 0;


var typeTimer = setInterval(function() {
    n = n + 1;
  p.innerHTML = str.slice(0, n);
  if (n === str.length) {
    clearInterval(typeTimer);
    p.innerHTML =   str;
    n = 0;
    setInterval(function() {
        
        if (n === 0) {
            p.innerHTML =  str
            n = 1;
        } else {
            p.innerHTML = str
            n = 0;
            
        };
    }, 500);
};
}, 60)
agreePlay();
}
typeWriter()