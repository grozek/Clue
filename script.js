// @ts-nocheck
let cards = {
    people: {
        yellow: {
            inno:false,
            who:null,
        },
        green: {
            inno:false,
            who: null,
        },
        blue: {
            inno:false,
            who:null,
        }
    },

    weapons: {
        knife: {
            inno:false,
            who: null,
        },
        gun: {
            inno:false,
            who: null,
        },
        candle: {
            inno:false,
            who: null,
        },
    },
    place: {
        kitchen: {
            inno:false,
            who: null,
        },
        bathroom: {
            inno:false,
            who: null,
        },
        bedroom: {
            inno:false,
            who:null,
        },
    } 
} // card dictionary


let evidence = {
    people:{
        found: false,
    },
    weapon:{
        found:false,
    },
    place:{
        found:false,
    },
} // mark whether the evidence of each category is discovered - helps to make decision to make the final call

let playersArray = [];
let currPlayerIndex = -1;
let username = "";
let options = ["Option 1", "Option 2", "Option 3"];
let selectMenu = document.createElement("select");
let currentContainerIndex = 0;
let containerArray = ["welcomeContainer","initialSetup","initContainer","everyContainer"];
window.onload = function() {
    containerSetup();
};

function containerSetup(){
    document.getElementById("menuContainer").style.display = "none";
    //document.getElementById("welcomeContainer").style.display = "none";
    document.getElementById("initialSetup").style.display = "none";
    document.getElementById("initContainer").style.display = "none";
    document.getElementById("everyContainer").style.display = "none";
}


function initMenuDrop() {
    if (selectMenu.children.length > 0) return; // Prevent duplicates

    options.forEach(optionText => {
        let option = document.createElement("option");
        option.value = optionText.toLowerCase();
        option.textContent = optionText;
        selectMenu.appendChild(option);
    });

    selectMenu.addEventListener("change", function() {
        console.log("User selected:", this.value);
    });

    document.body.appendChild(selectMenu);
}


function arrowR(){
    if (currentContainerIndex <= 2){
        let container = containerArray[currentContainerIndex];
        document.getElementById(container).style.display = "none";
        currentContainerIndex += 1;
        container = containerArray[currentContainerIndex];
        document.getElementById(container).style.display = "block";
    }
    else{

    }
}

function arrowL(){
    if (currentContainerIndex !== 0){
        let container = containerArray[currentContainerIndex];
        document.getElementById(container).style.display = "none";
        currentContainerIndex -= 1;
        container = containerArray[currentContainerIndex];
        document.getElementById(container).style.display = "block";
    }
}

//no longer valid - the arrows will be fully used as a navigation to make things clear
document.getElementById("submitBtn").addEventListener("click", function() {
    //document.getElementById("initialSetup").style.display = "none";
    console.log("ready to input init: " + this.value);
    //initMenuDrop();
});

document.getElementById("userN").addEventListener("blur", function() {
    console.log("User finished typing: " + this.value);
    username = this.value;
    document.getElementById("welcomeT").innerText = `Hi ${username}! Enjoy the game!`;
});

// document.getElementById("playerNamesI").addEventListener("blur", function() {
//     console.log("ready to input init: " + this.value);
//     initMenuDrop();
// });


    async function sendData() { 
        username = document.getElementById("userID").value; 
        let isTwo = parseInt(username) === 3;
        document.getElementById("welcomeT").innerText = `Hi ${username}! Enjoy the game!`;
    } // assigns the username, welcomes

    async function playerFieldDrop() {
        let number = parseInt(document.getElementById("playerN").value);
        let container = document.getElementById("playerNamesI");
        container.innerHTML = ""; // Clear previous inputs
        // let input = document.createElement("input");
        // input.type = "text";
        // input.id = `player0`;
        // input.value = username;
        // container.appendChild(input); // Add input to container

        for (let i=0; i<number; i++){
            input = document.createElement("input");
            input.type = "text";
            if(i===0){
                input.value = username;
            }
            else{
                input.placeholder = `Player ${i + 1}`;
            }
            input.placeholder = `Player ${i + 1}`;
            input.id = `player${i + 1}`;
            container.appendChild(input); // Add input to container
            container.appendChild(document.createElement("br")); // Add line break
        } // for

    } // upon writing how many players there are, drops the menu to fill in their names

    function playersFieldSubmit(){
        let num = parseInt(document.getElementById("playerN").value);
        for (let i = 0; i < num; i++) {
            let inputValue = document.getElementById(`player${i + 1}`).value;
            playersArray.push(inputValue);
        } // for
        console.log("Collected Values:", playersArray);
       //document.getElementById("initialPart").this.style.display = "none";
    } // takes in the player names and records them into array - to be used as we iterate through the players each round

    async function checkCards(){
        let input1 = document.getElementById("card1").value; 
        for (let category in cards) {
            if (input1 in cards[category]) {  // Check if input exists in this category 
                cards[category][input1]["inno"] = true;  // Update value to #f
                document.getElementById("generalT").innerText = `${input1} in ${category} is no longer suspected `;
                console.log(cards);  // ✅ Debugging: Show updated dictionary                    return;  // Exit after finding a match
            } // if
        } // for
    } // upon receiving a card - marks it off as not suspected anymore

    async function move(){
        let playersN = playersArray.length-1;
        if (playersArray.length === 0) {
            console.error("No players available! Add players before calling move().");
            return;
        } // no players        
        if (currPlayerIndex >= playersN){
            currPlayerIndex= 0;
        } 
        else {
            currPlayerIndex++;
        }
        let currPlayer = playersArray[currPlayerIndex];

        if (currPlayer == username){
            document.getElementById("generalT").innerText = `It's your move now!`;   
            yourMove();
        }
        else{
        document.getElementById("generalT").innerText = `${currPlayer} should make their move now`;   
        othersRound();
        }
    } // iterates through the players and directs desired moved upon round of every player

    async function yourMove() {
        let question = [];
        let i = 0;
        console.log("Starting yourMove()..."); 
        
        for (let category in cards) {
            console.log(`Checking category: ${category}`); // ✅ Debugging
            
            for (let input in cards[category]) {  // ✅ Loop through items in category
                console.log(`Checking item: ${input}, inno: ${cards[category][input]["inno"]}`); // ✅ Debugging
                if (i >= 3) {  // ✅ Stop once we collect 3 questions
                    break;
                }
                if (typeof cards[category][input] === "object" && cards[category][input]["inno"] === false) {
                    question.push(input); // ✅ Store the item
                    console.log(`Added to question list: ${input}`); // ✅ Debugging
                    i++;
                    break;
                } // if the item is not yet proven innocent then add to list of things we wanna ask about
            } // for
        } // loops thru categories
    
        console.log("Final question list:", question); // ✅ Debugging
    
        // ✅ Handle cases where there are fewer than 3 available items
        let message;
        if (question.length === 3) {
            message = `Ask about ${question[0]}, ${question[1]} and ${question[2]}`;
        } else if (question.length === 2) {
            message = `Ask about ${question[0]} and ${question[1]}`;
        } else if (question.length === 1) {
            message = `Ask about ${question[0]}`;
        } else {
            message = "No available questions to ask.";
        }
    
        console.log("Displaying message:", message); // ✅ Debugging
        document.getElementById("subT").innerText = message;
    } // direct what the user should ask for in their round

    
    function othersRound(){
        document.getElementById("subT").innerText = `Please write down what this player asked about`;  
        let container = document.getElementById("askedItems");
        container.innerHTML = ""; // Clear previous inputs
        for(let i=0; i < 3; i++) {
            let input = document.createElement("input");
            input.type = "text";
            input.placeholder = `askedItem ${i + 1}`;
            input.id = `askedItem${i + 1}`;
            container.appendChild(input); // Add input to container
            container.appendChild(document.createElement("br")); // Add line break
        }

    }
