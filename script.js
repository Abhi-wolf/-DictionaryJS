// const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/hello';

const result = document.querySelector('.result');
const searchBut = document.getElementById('btn');
let input = document.getElementById('input-field');
const heading = document.getElementById('heading');
let aud = document.getElementById('audio');
let volumeUp = document.querySelector('.titleAudio i');
// console.log(searchBut);
let audio




async function readData(word) {
    // let word = input.value;
    removeAllChilds(result);

    console.log(word);
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    // let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    let response = await fetch(url);

    if (response.status == 404) {
        console.log('not found');
        notFound(word);
        return;
    }

    else {
        let data = await response.json();
        console.log(data.title);
        console.log(data[0].meanings[0].definitions[0].definition);
        console.log(data[0].meanings.length);
        heading.textContent = word;



        // audio
        audio="";
        for (let i = 0; i < data[0].phonetics.length; i++) {
            // if (data[0].phonetics[0].audio) {
                audio = new Audio(data[0].phonetics[0].audio);
                console.log(data[0].phonetics[0].audio);
            // }
        }

        // if(audio=="") {
        //     console.log(empty);
        // }


        for (let j = 0; j < data.length; j++) {
            for (let i = 0; i < data[j].meanings.length; i++) {
                if (data[j].meanings[i].partOfSpeech == 'noun') {
                    display(data[j].meanings[i]);
                }
            }
        }

        for (let j = 0; j < data.length; j++) {
            for (let i = 0; i < data[j].meanings.length; i++) {
                if (data[j].meanings[i].partOfSpeech == 'verb') {
                    display(data[j].meanings[i]);
                }
            }
        }

        for (let j = 0; j < data.length; j++) {
            for (let i = 0; i < data[j].meanings.length; i++) {
                if (data[j].meanings[i].partOfSpeech == 'interjection') {
                    display(data[j].meanings[i]);
                }
            }
        }

        for (let j = 0; j < data.length; j++) {
            for (let i = 0; i < data[j].meanings.length; i++) {
                if (data[j].meanings[i].partOfSpeech == 'adjective') {
                    display(data[j].meanings[i]);
                }
            }
        }

        for (let j = 0; j < data.length; j++) {
            for (let i = 0; i < data[j].meanings.length; i++) {
                if (data[j].meanings[i].partOfSpeech == 'adverb') {
                    display(data[j].meanings[i]);
                }
            }
        }
    }
}



function display(data) {
    let newDiv = document.createElement('div');
    newDiv.className = 'box';
    let partsOfspeech = document.createElement('h3');
    let meaning = document.createElement('p');
    let example = document.createElement('p');


    partsOfspeech.textContent = data.partOfSpeech;
    console.log(data.partOfSpeech);
    partsOfspeech.style.textTransform = "capitalize";
    meaning.textContent = data.definitions[0].definition;
    console.log(data.definitions[0].definition)

    if (data.definitions[0].example != undefined)
        example.textContent = "Example : " + data.definitions[0].example;
    newDiv.appendChild(partsOfspeech);
    newDiv.appendChild(meaning);
    newDiv.appendChild(example);

    result.appendChild(newDiv);
    console.log('inserted');
}

function removeAllChilds(parent) {
    while (parent.firstChild != null) {
        parent.removeChild(parent.firstChild);
    }
}

function notFound(word) {
    let nFou = document.createElement('div');
    nFou.className = "notFound";
    nFou.innerHTML = " '" + word + "' not found" + "<br>  Search for another word";
    // nFou.style="background: ";
    // nFou.style="font-size: 26px";
    // nFou.style="border: 2px solid red"
    result.appendChild(nFou);
}

volumeUp.addEventListener('click', () => {
    volumeUp.style.color = "#4D59FB";
    audio.play();
    setTimeout(() => {
        volumeUp.style.color = "#999";
    }, 800);
})

searchBut.addEventListener("click", () => {
    // removeAllChilds(result);
    console.log(input);
    console.log("value = ", input.value);
    let word = input.value.replace(/\s+/g, ' ');
    if (input.value) {
        readData(word);
    }

    else {
        let errorMsg = document.createElement('p');
        errorMsg.textContent = "Enter a valid word";
        errorMsg.style.color = "red";

        result.appendChild(errorMsg);
    }
    input.value = "";
});

input.addEventListener("keyup", (e) => {
    // removeAllChilds(result);
    // input.value="";
    let word = e.target.value.replace(/\s+/g, ' ');
    if (e.key == "Enter" && word) {
        readData(word);
        // input.textContent="";
        input.value = "";

    }
})


// by default
readData('hello');