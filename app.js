const createPopup = (text, header) => {
    
    const popup = document.createElement("div");
    popup.classList.add("modal-container");
    popup.innerHTML=`<div class="modal-body">
    <div class="modal-header">${header}</div>
    <div class="modal-content">
        <div class="desc">           
             <p id="text">${text}
            </p>
        </div>     
              
    </div>
</div>`;
    document.body.appendChild(popup);
    
}
createPopup(`Chào mừng đến với Memory Game.</br>
Tại đây bạn có thể chơi game bằng cách chọn ra 2 lá bài trùng nhau.<br>
Mỗi lần chơi thì chỉ được phép chọn sai tối đa 3 lượt.`, `Hướng dẫn chơi game`);

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
    },
    {
        name: "gift",
        img: "./imgs/gift.png"
    },
    {
        name: "umbrella",
        img: "./imgs/umbrella.png"
    }
]
const hide3Second = async () => {
    await document.querySelectorAll(".hide").forEach((item)=> item.style.opacity="1")
    await document.querySelectorAll(".card").forEach((item)=> item.classList.remove("question"))
    await (document.querySelector(".container").style="pointer-events: none;");    
    setTimeout(() => {        
        document.querySelectorAll(".hide").forEach((item)=> item.style="")
        document.querySelector(".container").style="";
        document.querySelectorAll(".card").forEach((item)=> item.classList.add("question")) 
    },3000);
}
const buttonNewGame = () => {
    const button = document.createElement("div");
    button.classList.add("button");
    button.textContent="New game";
    document.body.appendChild(button);
    const btn = document.querySelector(".button");
    btn.addEventListener("click", () => {
        createGame();
        creatHeart();
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
    const listHearts = document.querySelector(".heart");
    listHearts.parentNode.removeChild(listHearts);
}            
const createGame = () => {
    let randomItems = items.sort(() => 0.5 - Math.random());
    let currentItems = items.concat(randomItems);
    currentItems.sort(() => 0.5 - Math.random());
    let container = document.querySelector(".container");
    currentItems.map((item) => {
        let card_item = document.createElement("div");
        card_item.classList.add("card");
        card_item.classList.add("question");
        card_item.setAttribute("data-name",item.name);
        let card_img = document.createElement("img");
        card_img.setAttribute("src",item.img);
        card_img.classList.add("card-img", "hide");
        card_item.appendChild(card_img);    
        container.appendChild(card_item);   
    })
    
}
const creatHeart = () => {
    const navigation = document.querySelector(".navigation");
    const heartInit = document.createElement("div");
    heartInit.classList.add("heart");
    const heartImg1 = document.createElement("img");
    const heartImg2 = document.createElement("img");
    const heartImg3 = document.createElement("img");
    heartImg1.setAttribute("src", "./imgs/heart.png");
    heartImg2.setAttribute("src", "./imgs/heart.png");
    heartImg3.setAttribute("src", "./imgs/heart.png");

    heartInit.appendChild(heartImg1)
    heartInit.appendChild(heartImg2)
    heartInit.appendChild(heartImg3)
 
    navigation.appendChild(heartInit);





}
createGame();
creatHeart();
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
    let heart_game = 3;
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
                item.classList.remove("question");
            } 
             if (count === 2) {
                item.classList.add("selected");
                secondGuess = item.getAttribute("data-name");
                item.classList.remove("question");
            }      
            if ((countSuccess===7) && count === 2) {
                resetGame();
                setTimeout(()=> {
                    buttonNewGame();
    
                },500)                    
            }
            if (firstGuess !== "" && secondGuess !== "" && firstGuess === secondGuess) {
                card.forEach((filterItem) => {
                            if (filterItem.getAttribute("data-name") === firstGuess) {
                                filterItem.classList.add("done")
                                filterItem.classList.remove("selected");
                                filterItem.classList.remove("question"); 
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
                        filterItem.classList.add("question");                   
                        filterItem.children[0].classList.remove("show");
                        filterItem.children[0].classList.add("hide");                    
                    })
                    if (heart_game===1) {
                        
                        createPopup(`Bạn đã thua.`, `Thông báo`);
                        typeWriter();
                        resetGame();
                        setTimeout(()=> {
                            buttonNewGame();
            
                        },500)
                        return;                    
                    }
                    const heart = document.querySelectorAll(".navigation .heart img");
                    heart[heart_game-1].style.opacity="0";
                    heart_game--;
                    firstGuess = '';
                    secondGuess = '';
                    count = 0;
                    
                },500)  
            }  
        })
    })
    }
playGame();




