// initial variables
let heroArray = []; // array to hold data from API
let appendingHeroArray = []; //array that holds the specific ID's and data of heroes that will go on the DOM
let randomHero; //number that chooses what hero in the heroArray will be picked
let $newHero; //new hero object that creates the elements needed to be appened to the DOM
const min = 0; // min index number for hero Array
const max = 119; // max index number of hero Array


// DOM ELEMENTS

const $randomEl = document.getElementById("random-btn");
const $balanceEl = document.getElementById("balance-btn");
const $tableEl = document.querySelector("hero-table");

// EVENT LISTENERS

$randomEl.addEventListener("click", getRandom);
$balanceEl.addEventListener("click", getBalance);

// FUNCTIONS

// this function pulls in the data from the API and copies to the hero Array for use

function init() {
    $.ajax("https://api.opendota.com/api/heroes").then(function (data) {
        heroArray = data.map(a => Object.assign({}, a));;
        console.log("heroArray: " + heroArray);
    }, function (error) {
        console.log(error);
    });
}

//function to randomly pick 5 heroes from the heroArray

function getRandom() {
    const randomHeroArray = [];

    //---------------------------
    // this is the portion that checks to see if the random button has been pressed before and lets
    //the js know to remove  

    // if(randomI > 0){
    //     let $selectionRemove = document.querySelector("table");
    //     console.log("selectionRemove: " + $selectionRemove);
    //     let $heroListingEl = document.querySelector("hero-selection");
    //     console.log("newHero: " + $newHero);
    //     $newHero.remove();
    //     //$selectionRemove.removeChild($newHero);
    // }
    //---------------------------

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
    //randomI++;
    appendHeroes(appendingHeroArray);
}

//function to get a balanced team of heroes

function getBalance() {
    giveBalance();

}

function giveBalance() {
    heroArray.forEach(function (hero) {
        hero["tankValue"] = 1;
        hero["supportValue"] = .5;
        hero["carryValue"] = 0;

        console.log("updated hero: " + hero);

    });
}
// function to append heroes to DOM

function appendHeroes(heroesToAppend) {
    console.log("heres the herosToAppendArray: " + heroesToAppend);
    heroesToAppend.forEach(function (hero) {
        //const heroPicTag = ``; //document.createElement("td");
        // const heroNameTag = document.createElement("td");
        // const heroAtt1Tag = document.createElement("td");
        // const heroAtt2Tag = document.createElement("td");
        // const heroAtt3Tag = document.createElement("td");

        heroNameTag = heroArray[hero]["localized_name"];
        console.log("heroesNameTag: " + heroNameTag);
        heroAtt1Tag = heroArray[hero]["roles"][0];
        console.log("heroeAtt1Tag: " + heroAtt1Tag);
        heroAtt2Tag = heroArray[hero]["roles"][1];
        console.log("heroeAtt2Tag: " + heroAtt2Tag);
        heroAtt3Tag = heroArray[hero]["roles"][2];
        console.log("heroeAtt3Tag: " + heroAtt3Tag);

        $newHero = `<tr class="hero-selection">
        <td><img src="./pics/a0.png"></td>
        <td>${heroNameTag}</td>
        <td>${heroAtt1Tag}</td>
        <td>${heroAtt2Tag}</td>
        <td>${heroAtt3Tag}</td>
                        </tr>`;

        console.log("heres the $newHero: " + $newHero);

        $(".hero-table").append($newHero);



        console.log()

    })

}

// initializing script

init();