import { HfInference } from '@huggingface/inference'

const inputJokeBtn = document.getElementById("processJoke")
let joke = document.getElementById("joke")
let randomJoke = document.getElementById("randomJoke")
let setup = document.getElementById("setup")
let punchline = document.getElementById("punchline")

const hf = new HfInference("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")


// Hugging Face Inference API docs: https://huggingface.co/docs/huggingface.js/inference/README
let text = ""


// inputJokeBtn.addEventListener('click', async ()=> {
//   text = joke.value
//   console.log(text)
//   const response = await hf.textToSpeech({
//     inputs: text,
//     model: "espnet/kan-bayashi_ljspeech_vits"
//   })

//   const audioElement = document.getElementById('speech')
// const speechUrl = URL.createObjectURL(response)
// audioElement.src = speechUrl

//   console.log(response)
// })

///////////

var baseURL = "https://v2.jokeapi.dev";
var categories = ["Programming", "Misc", "Pun", "Spooky", "Christmas"];
var params = [
    "blacklistFlags=nsfw,religious,racist",
    "idRange=0-100"
];

var xhr = new XMLHttpRequest();
xhr.open("GET", baseURL + "/joke/" + categories.join(",") + "?" + params.join("&"));

xhr.onreadystatechange = async function() {
    if(xhr.readyState == 4 && xhr.status < 300) // readyState 4 means request has finished + we only want to parse the joke if the request was successful (status code lower than 300)
    {
        var randomJoke = JSON.parse(xhr.responseText);

        if(randomJoke.type == "single")
        {
            // If type == "single", the joke only has the "joke" property
            setup.textContent = randomJoke.joke
            const response = await hf.textToSpeech({
              inputs: setup.textContent,
              model: "espnet/kan-bayashi_ljspeech_vits"
            })
          
            const audioElement = document.getElementById('speech')
          const speechUrl = URL.createObjectURL(response)
          audioElement.src = speechUrl

            ;
        }
        else
        {
            // If type == "single", the joke only has the "joke" property
            setup.textContent = randomJoke.setup;
            punchline.textContent = randomJoke.delivery
            
        }
    }
    else if(xhr.readyState == 4)
    {
        alert("Error while requesting joke.\n\nStatus code: " + xhr.status + "\nServer response: " + xhr.responseText);
    }
};

xhr.send();