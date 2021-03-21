// initial variables
let heroArray = [];
let appendingHeroArray = [];
let heroTagI = 0;
let randomHero;
let buttonI = 0;
let $newHero;
const min = 0;
const max = 119;
const $randomEl = document.getElementById("random-btn");
console.log("randomEl: " + $randomEl);
const $balanceEl = document.getElementById("balance-btn");
const $tableEl = document.querySelector("hero-table");
console.log("$tableEl: " + $tableEl);
// event listeners

$randomEl.addEventListener("click", getRandom);
//$balanceEl.addEventListener("click", getBalance());
// functions

// this function pulls in the data from the API and copies to the hero Array for use
function init() {
    $.ajax("https://api.opendota.com/api/heroes").then(function (data) {
        // console.log("Heres the data: " +data);
        heroArray = data;
        console.log("heroArray: " + heroArray);
    }, function (error) {
        console.log(error);
    });
}

//function to randomly pick 5 heroes from the heroArray

function getRandom() {
    const randomHeroArray =[];
    // if(randomI > 0){
    //     let $selectionRemove = document.querySelector("table");
    //     console.log("selectionRemove: " + $selectionRemove);
    //     let $heroListingEl = document.querySelector("hero-selection");
    //     console.log("newHero: " + $newHero);
    //     $newHero.remove();
    //     //$selectionRemove.removeChild($newHero);
        
    // }
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
    for (let i = 0; i < 5; i++) {
        console.log("heres i: " + i);

    }
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

        if(buttonI > 0) {
            $(".hero-table").remove("hero-selection");
        }
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
    buttonI++;

}

// initializing script

init();