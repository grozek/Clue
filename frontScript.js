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
let selectMenu = document.createElement("select");
let currentContainerIndex = 0;
let containerArray = ["welcomeContainer","initialSetup","initContainer","everyContainer"];

window.onload = function() {
    containerSetup();
    chooseContainer();
};

function containerSetup(){
    document.getElementById("menuContainer").style.display = "none";
    //document.getElementById("welcomeContainer").style.display = "none";
    document.getElementById("initialSetup").style.display = "none";
    document.getElementById("initContainer").style.display = "none";
    document.getElementById("everyContainer").style.display = "none";
}

// drop menu of items to select by user: the one they have in hand
function initMenuDrop() {
    let items = ["select item","yellow", "green", "blue", "knife", "gun", "candle", "kitchen", "bathroom", "bedroom"]; // Options for the dropdowns
    let itemIDs = ["item1", "item2", "item3"]; // IDs of the three dropdowns

    // Loop through the three dropdowns
    itemIDs.forEach(itemID => {
        let selectMenu = document.getElementById(itemID); // Get the dropdown
        selectMenu.innerHTML = ""; // Clear previous options (prevents duplication)

        // Add options to the dropdown
        items.forEach(itemText => {
            let option = document.createElement("option");
            option.value = itemText.toLowerCase();
            option.textContent = itemText;
            selectMenu.appendChild(option);
            console.log("pre-loop");
        });
        selectMenu.addEventListener("change", function() {
        console.log(`${itemID} selected:`, this.value);
        console.log(selectMenu);
        
        let selectedOption = this.value;

            for (let category in cards){
                console.log("Checking category:", category);
                if (selectedOption in cards[category]) {  // Check if input exists in this category 
                    console.log("Match found in category:", category);
                    cards[category][selectedOption]["inno"] = true;  // Update value to #f
                    document.getElementById("generalT").innerText = `${selectedOption} in ${category} is no longer suspected `;
                    console.log(cards);  // ✅ Debugging: Show updated dictionary                    return;  // Exit after finding a match
                } // if
            }
        });
        } // for
    );

}

// mangages the functionality of right arrow - move between the menus: containers
function arrowR(){
    if (currentContainerIndex <= 2){
        let container = containerArray[currentContainerIndex];
        document.getElementById(container).style.display = "none";
        currentContainerIndex += 1;
        container = containerArray[currentContainerIndex];
        document.getElementById(container).style.display = "block";
        console.log("current container:", container);
    }
}

// mangages the functionality of left arrow - move between the menus: containers
function arrowL(){
    if (currentContainerIndex !== 0){
        let container = containerArray[currentContainerIndex];
        document.getElementById(container).style.display = "none";
        currentContainerIndex -= 1;
        container = containerArray[currentContainerIndex];
        document.getElementById(container).style.display = "block";
        console.log("current container:", container);
    }
}

// alternates between displayed containers
function chooseContainer(){
    console.log("which case we are on:", currentContainerIndex);
    if (containerArray.length !== 0){
        console.log("containerArray:", containerArray);
        switch (currentContainerIndex){
            case 0:
                // the initial setup:
                case0();
            case 1:
                initMenuDrop();

            case 2:
        }
    }
}

// manages the display settings on the first container: the initial info providing tab
function case0(){
    // when the player provides number of players, the menu to input their names drops
    document.getElementById("playerN").addEventListener("blur", function() {
        console.log("executing a container:1", containerArray[currentContainerIndex]);
        playerFieldDrop();
    })
    // welcomes the player as they input their username
    document.getElementById("userN").addEventListener("blur", function() {
        console.log("User finished typing: " + this.value);
        username = this.value;
        document.getElementById("welcomeT").innerText = `Hi ${username}! Enjoy the game!`;
    });
    // get ID of last player so that once user fills all names out we proceed
    if (playersArray.length !== 0){
        let lastPlayer = "player" + playersArray.length-1;
        document.getElementById(lastPlayer).addEventListener("blur", function() {
            console.log("executing a container:2", containerArray[currentContainerIndex]);
        });
    }
}

    async function sendData() { 
        username = document.getElementById("userID").value; 
        let isTwo = parseInt(username) === 3;
        document.getElementById("welcomeT").innerText = `Hi ${username}! Enjoy the game!`;
    } // assigns the username, welcomes

// upon writing how many players there are, drops the menu to fill in their names
    async function playerFieldDrop() {
        let number = parseInt(document.getElementById("playerN").value);
        let container = document.getElementById("playerNamesI");
        container.innerHTML = ""; // Clear previous inputs

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
    } // playerFieldDrop()

    // adds the names of the players to playersArray as the user inputs the names into the input box
    // takes in the player names and records them into array - to be used as we iterate through the players each round
    function playersFieldSubmit(){
        let num = parseInt(document.getElementById("playerN").value);
        for (let i = 0; i < num; i++) {
            let inputValue = document.getElementById(`player${i + 1}`);
            playersArray.push(inputValue);
        } // for
        console.log("Collected Values:", playersArray);
    } //playersFieldSubmit()

    //used previously to check whether cards are suspected or not. no longer needed in this file
    // async function checkCards(){
    //     let input1 = document.getElementById("card1").value; 
    //     for (let category in cards) {
    //         if (input1 in cards[category]) {  // Check if input exists in this category 
    //             cards[category][input1]["inno"] = true;  // Update value to #f
    //             document.getElementById("generalT").innerText = `${input1} in ${category} is no longer suspected `;
    //             console.log(cards);  // ✅ Debugging: Show updated dictionary                    return;  // Exit after finding a match
    //         } // if
    //     } // for
    // } // upon receiving a card - marks it off as not suspected anymore

    //decides who makes the next move based on the array order - no longer used in this file
    // async function move(){
    //     let playersN = playersArray.length-1;
    //     if (playersArray.length === 0) {
    //         console.error("No players available! Add players before calling move().");
    //         return;
    //     } // no players        
    //     if (currPlayerIndex >= playersN){
    //         currPlayerIndex= 0;
    //     } 
    //     else {
    //         currPlayerIndex++;
    //     }
    //     let currPlayer = playersArray[currPlayerIndex];

    //     if (currPlayer == username){
    //         document.getElementById("generalT").innerText = `It's your move now!`;   
    //         yourMove();
    //     }
    //     else{
    //     document.getElementById("generalT").innerText = `${currPlayer} should make their move now`;   
    //     othersRound();
    //     }
    // } // iterates through the players and directs desired moved upon round of every player

    //decides what player should ask for during their turn- no longer used in this file
    // async function yourMove() {
    //     let question = [];
    //     let i = 0;
    //     console.log("Starting yourMove()..."); 
        
    //     for (let category in cards) {
    //         console.log(`Checking category: ${category}`); // ✅ Debugging
            
    //         for (let input in cards[category]) {  // ✅ Loop through items in category
    //             console.log(`Checking item: ${input}, inno: ${cards[category][input]["inno"]}`); // ✅ Debugging
    //             if (i >= 3) {  // ✅ Stop once we collect 3 questions
    //                 break;
    //             }
    //             if (typeof cards[category][input] === "object" && cards[category][input]["inno"] === false) {
    //                 question.push(input); // ✅ Store the item
    //                 console.log(`Added to question list: ${input}`); // ✅ Debugging
    //                 i++;
    //                 break;
    //             } // if the item is not yet proven innocent then add to list of things we wanna ask about
    //         } // for
    //     } // loops thru categories
    
    //     console.log("Final question list:", question); // ✅ Debugging
    
    //     // ✅ Handle cases where there are fewer than 3 available items
    //     let message;
    //     if (question.length === 3) {
    //         message = `Ask about ${question[0]}, ${question[1]} and ${question[2]}`;
    //     } else if (question.length === 2) {
    //         message = `Ask about ${question[0]} and ${question[1]}`;
    //     } else if (question.length === 1) {
    //         message = `Ask about ${question[0]}`;
    //     } else {
    //         message = "No available questions to ask.";
    //     }
    
    //     console.log("Displaying message:", message); // ✅ Debugging
    //     document.getElementById("subT").innerText = message;
    // } // direct what the user should ask for in their round

    //asks about input of other playeres during their turn - no longer used in this file
    // function othersRound(){
    //     document.getElementById("subT").innerText = `Please write down what this player asked about`;  
    //     let container = document.getElementById("askedItems");
    //     container.innerHTML = ""; // Clear previous inputs
    //     for(let i=0; i < 3; i++) {
    //         let input = document.createElement("input");
    //         input.type = "text";
    //         input.placeholder = `askedItem ${i + 1}`;
    //         input.id = `askedItem${i + 1}`;
    //         container.appendChild(input); // Add input to container
    //         container.appendChild(document.createElement("br")); // Add line break
    //     }

    // }
