// INITIAL VARIABLES
let heroArray = []; // array to hold data from API
let appendingHeroArray = []; //array that holds the specific ID's and data of heroes that will go on the DOM
let randomHero; //number that chooses what hero in the heroArray will be picked
let newHero; //new hero object that creates the elements needed to be appened to the DOM
let buttonI = 0; //iterator that checks if any of the buttons have been pressed so that js can remove previous elements
const min = 0; // min index number for hero Array
const max = 119; // max index number of hero Array


// DOM ELEMENTS

const randomEl = document.getElementById("random-btn");
const balanceEl = document.getElementById("balance-btn");
const tableEl = document.querySelector("hero-table");

// EVENT LISTENERS

randomEl.addEventListener("click", getRandom);
balanceEl.addEventListener("click", getBalance);

// FUNCTIONS

// FUNCTION TO PULL DATA FROM API AND MAP TO HEROARRAY
function init() {
    $.ajax("https://api.opendota.com/api/heroes").then(function (data) {
        heroArray = data.map(a => Object.assign({}, a));;
        console.log("heroArray: " + heroArray);
        giveBalance();
    }, function (error) {
        console.log(error);
    });
};

//FUNCTION TO GIVE 5 RANDOMLY PICKED HEROES
function getRandom() {
    const randomHeroArray = [];

    if (buttonI > 0) {
        removeHeroes();
    }

    for (let i = 0; i < 5; i++) {
        console.log("heres i: " + i);
        randomHero = Math.floor(Math.random() * (max - min + 1)) + min;
        console.log("Random Hero #: " + randomHero)
        while (randomHeroArray.indexOf(randomHero) !== -1) {
            console.log("I ran and the index was: " + randomHeroArray.indexOf(randomHero));
            randomHero = Math.floor(Math.random() * (max - min + 1)) + min;
        }
        console.log(randomHeroArray.indexOf(randomHero));
        randomHeroArray.push(randomHero);

        console.log("Heres randomHeroArray: " + randomHeroArray);
    }
    appendingHeroArray = randomHeroArray;
    buttonI++;
    appendHeroes(appendingHeroArray);
};

//FUNCTION TO GIVE BALANCED TEAM OF HEROES
function getBalance() {
    const balanceHeroArray = []; // array of balanced heroes that will be sent to appendHeroes

    let supportTank = 0; // variable to hold amount of 'support' a team has
    let carryTank = 0; // variable to hold amount of 'carry' a team has
    let tankTank = 0; // variable to hold amount of 'tank' a team has
    let loopBreakI = 0;
    let previousHero = []; // array that will hold previous heroes so that loop does not iterate over previous heroes

    if (buttonI > 0) {
        removeHeroes();
    }

    while (balanceHeroArray.length < 5) {
        randomHero = Math.floor(Math.random() * (max - min + 1)) + min;
        console.log("Random Hero #: " + randomHero)
        while ((balanceHeroArray.indexOf(randomHero) !== -1) || previousHero.includes(randomHero)) {
            console.log("I ran and the index was: " + balanceHeroArray.indexOf(randomHero));
            randomHero = Math.floor(Math.random() * (max - min + 1)) + min;
        }
        if (supportTank < 1.5) {
            if (carryTank < 1.5) {
                if (tankTank < 1.5) {
                    balanceHeroArray.push(randomHero);
                    previousHero.push(randomHero);
                    tankTank += heroArray[randomHero].zTankValue;
                    carryTank += heroArray[randomHero].zCarryValue;
                    supportTank += heroArray[randomHero].zSupportValue;
                } else if (heroArray[randomHero].zTankValue > 0) {
                    console.log("hero # " + heroArray[randomHero] + " is too tanky.");
                } else {
                    balanceHeroArray.push(randomHero);
                    previousHero.push(randomHero);
                    tankTank += heroArray[randomHero].zTankValue;
                    carryTank += heroArray[randomHero].zCarryValue;
                    supportTank += heroArray[randomHero].zSupportValue;
                }
            } else if (heroArray[randomHero].zCarryValue > 0) {
                console.log("hero # " + heroArray[randomHero] + " does too much damage.");
            } else if (tankTank < 1.5) {
                balanceHeroArray.push(randomHero);
                previousHero.push(randomHero);
                tankTank += heroArray[randomHero].zTankValue;
                carryTank += heroArray[randomHero].zCarryValue;
                supportTank += heroArray[randomHero].zSupportValue;
            } else if (heroArray[randomHero].zTankValue > 0) {
                console.log("hero # " + heroArray[randomHero] + " is too tanky.");
            } else {
                balanceHeroArray.push(randomHero);
                tankTank += heroArray[randomHero].zTankValue;
                carryTank += heroArray[randomHero].zCarryValue;
                supportTank += heroArray[randomHero].zSupportValue;
            }
        } else if (heroArray[randomHero].zSupportValue > 0) {
            console.log("hero # " + heroArray[randomHero] + " supports too much.");
        } else if (carryTank < 1.5) {
            if (tankTank < 1.5) {
                balanceHeroArray.push(randomHero);
                previousHero.push(randomHero);
                tankTank += heroArray[randomHero].zTankValue;
                carryTank += heroArray[randomHero].zCarryValue;
                supportTank += heroArray[randomHero].zSupportValue;
            } else if (heroArray[randomHero].zTankValue > 0) {
                console.log("hero # " + heroArray[randomHero]+ " is too tanky.");
            } else {
                balanceHeroArray.push(randomHero);
                tankTank += heroArray[randomHero].zTankValue;
                carryTank += heroArray[randomHero].zCarryValue;
                supportTank += heroArray[randomHero].zSupportValue;
            }
        } else if (heroArray[randomHero].zCarryValue > 0) {
            console.log("hero # " + heroArray[randomHero] + " does too much damage.");
        } else if (tankTank < 1.5) {
            balanceHeroArray.push(randomHero);
            previousHero.push(randomHero);
            tankTank += heroArray[randomHero].zTankValue;
            carryTank += heroArray[randomHero].zCarryValue;
            supportTank += heroArray[randomHero].zSupportValue;
        } else if (heroArray[randomHero].zTankValue > 0) {
            console.log("hero # " + heroArray[randomHero] + " is too tanky.");
        } else {
            balanceHeroArray.push(randomHero);
            previousHero.push(randomHero);
            tankTank += heroArray[randomHero].zTankValue;
            carryTank += heroArray[randomHero].zCarryValue;
            supportTank += heroArray[randomHero].zSupportValue;
        }

        console.log("bottom of getBalance while loop.");
        if (loopBreakI > 40) {
            alert("current hero selection cannot find a final hero to fill. please rety");
            break;
        }
        loopBreakI++;
    }
    appendingHeroArray = balanceHeroArray;
    buttonI++;
    appendHeroes(appendingHeroArray);
};

// FUNCTION THAT GIVES HEROES VALUES FOR BALANCE ALGORITHM
function giveBalance() {
    heroArray.forEach(function (hero) {
        if (hero.roles.includes("Support")) {
            if (hero.roles.includes("Carry")) {
                if (hero.roles[0] === "Support") {
                    hero["zTankValue"] = 0;
                    hero["zSupportValue"] = 1;
                    hero["zCarryValue"] = .5;
                } else if (hero.roles[0] === "Carry") {
                    hero["zTankValue"] = 0;
                    hero["zSupportValue"] = .5;
                    hero["zCarryValue"] = 1;
                } else {
                    hero["zTankValue"] = 0;
                    hero["zSupportValue"] = .5;
                    hero["zCarryValue"] = .5;
                }
            } else if (hero.roles.includes("Durable")) {
                if (hero.roles[0] === "Support") {
                    hero["zTankValue"] = .5;
                    hero["zSupportValue"] = 1;
                    hero["zCarryValue"] = 0;
                } else if (hero.roles[0] === "Durable") {
                    hero["zTankValue"] = 1;
                    hero["zSupportValue"] = .5;
                    hero["zCarryValue"] = 0;
                } else {
                    hero["zTankValue"] = .5;
                    hero["zSupportValue"] = .5;
                    hero["zCarryValue"] = 0;
                }
            } else {
                hero["zTankValue"] = 0;
                hero["zSupportValue"] = 1;
                hero["zCarryValue"] = 0;
            }
        } else if (hero.roles.includes("Carry")) {
            if (hero.roles.includes("Durable")) {
                if (hero.roles[0] === "Carry") {
                    hero["zTankValue"] = .5;
                    hero["zSupportValue"] = 0;
                    hero["zCarryValue"] = .5;
                } else if (hero.roles[0] === "Durable") {
                    hero["zTankValue"] = 1;
                    hero["zSupportValue"] = 0;
                    hero["zCarryValue"] = .5;
                }
            } else {
                hero["zTankValue"] = 0;
                hero["zSupportValue"] = 0;
                hero["zCarryValue"] = 1;
            }
        } else if (hero.roles.includes("Durable")) {
            hero["zTankValue"] = 1;
            hero["zSupportValue"] = 0;
            hero["zCarryValue"] = 0;
        } else {
            hero["zTankValue"] = .25;
            hero["zSupportValue"] = .25;
            hero["zCarryValue"] = .25;
        }

    });
    console.log("heroArray has balance values");
};

// FUNCTION TO REMOVE HEROES FROM DOM
function removeHeroes() {
    //---------------------------
    // this is the portion that checks to see if the "random/balance" button has been pressed before and lets
    // js know to remove  

    $(".hero-selection").empty();

};

// FUNCTION TO APPEND HEROES TO DOM
function appendHeroes(heroesToAppend) {
    console.log("heres the herosToAppendArray: " + heroesToAppend);
    heroesToAppend.forEach(function (hero) {

        heroNameTag = heroArray[hero]["localized_name"];
        console.log("heroesNameTag: " + heroNameTag);
        heroAtt1Tag = heroArray[hero]["roles"][0];
        console.log("heroeAtt1Tag: " + heroAtt1Tag);
        heroAtt2Tag = heroArray[hero]["roles"][1];
        console.log("heroeAtt2Tag: " + heroAtt2Tag);
        heroAtt3Tag = heroArray[hero]["roles"][2];
        console.log("heroeAtt3Tag: " + heroAtt3Tag);

        newHero = `<tr class="hero-selection">
        <td><img src="./pics/a${hero}.png"></td>
        <td>${heroNameTag}</td>
        <td>${heroAtt1Tag}</td>
        <td>${heroAtt2Tag}</td>
        <td>${heroAtt3Tag}</td>
                        </tr>`;

        console.log("heres the $newHero: " + newHero);

        $(".hero-table").append(newHero);

        console.log()

    })

};

// INITIALIZING SCRIPT
init();