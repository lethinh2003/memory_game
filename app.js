const items = [
    {
        name: "apple",
        img: "./imgs/apple.png"
    },
    {
        name: "banana",
        img: "./imgs/banana.png"
    },
    {
        name: "bread",
        img: "./imgs/bread.png"
    },
    {
        name: "coconut",
        img: "./imgs/coconut.png"
    },
    {
        name: "dog",
        img: "./imgs/dog.png"
    },
    {
        name: "duck",
        img: "./imgs/duck.png"
    }
]
const hide3Second = async () => {
    await document.querySelectorAll(".hide").forEach((item)=> item.style.opacity="1")
    await (document.querySelector(".container").style="pointer-events: none;");
    
    setTimeout(() => {
        
        document.querySelectorAll(".hide").forEach((item)=> item.style="")
        document.querySelector(".container").style="";
       

        
    },2000);

}
const buttonNewGame = () => {
    const button = document.createElement("div");
    button.classList.add("button");
    button.textContent="New game";
    document.body.appendChild(button);
    const btn = document.querySelector(".button");
    btn.addEventListener("click", () => {
        createGame();
        hide3Second();
        playGame();
        btn.parentNode.removeChild(btn);
})

}

const resetGame = () => {
    
    const listCards = document.querySelectorAll(".card");
    listCards.forEach((item) => {
        item.parentNode.removeChild(item);

    })

}
        
    
const createGame = () => {

    let randomItems = items.sort(() => 0.5 - Math.random());
    let currentItems = items.concat(randomItems);
    currentItems.sort(() => 0.5 - Math.random());
    let container = document.querySelector(".container");
    currentItems.map((item) => {
        let card_item = document.createElement("div");
    card_item.classList.add("card");
    card_item.setAttribute("data-name",item.name);
    let card_img = document.createElement("img");
    card_img.setAttribute("src",item.img);
    card_img.classList.add("card-img", "hide");
    card_item.appendChild(card_img);
    
    container.appendChild(card_item);
    
    
    
})
}
createGame();


hide3Second();
const resetChoose = () => {
    firstGuess = '';
    secondGuess = '';
    count = 0;
}
const playGame = () => {

    let countSuccess = 0;
    let count = 0;
    let firstGuess = "";
    let secondGuess = "";
    const card = document.querySelectorAll(".card");
    card.forEach((item) => {
        item.addEventListener("click", () => {
           
            if (item.classList.contains("selected")) {
                return;
            }       
            if (count >= 2) {
                return;
            }
            count++;       
            item.children[0].classList.remove("hide");
            item.children[0].classList.add("show");    
            if (count === 1) {
                firstGuess = item.getAttribute("data-name");
                item.classList.add("selected");
            } 
             if (count === 2) {
                item.classList.add("selected");
                secondGuess = item.getAttribute("data-name");
            }
           
            if (countSuccess===5 && count === 2) {
                resetGame();
                setTimeout(()=> {
                    buttonNewGame();
    
                },1000)
                
    
            }
            if (firstGuess !== "" && secondGuess !== "" && firstGuess === secondGuess) {
                card.forEach((filterItem) => {
                            if (filterItem.getAttribute("data-name") === firstGuess) {
                                filterItem.classList.add("done")
                                filterItem.classList.remove("selected");
                            }
                        })
                        countSuccess++;
                        firstGuess = '';
                        secondGuess = '';
                        count = 0;
            } else if (firstGuess !== "" && secondGuess !== "" && firstGuess !== secondGuess){
                setTimeout(() => {
                    card.forEach((filterItem) => {
                        filterItem.classList.remove("selected");                   
                        filterItem.children[0].classList.remove("show");
                        filterItem.children[0].classList.add("hide");                    
                    })
                    firstGuess = '';
                    secondGuess = '';
                    count = 0;
                },500)  
            }  
        })
    })
    }
    playGame();




