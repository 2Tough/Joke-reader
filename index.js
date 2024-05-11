import { HfInference } from "@huggingface/inference";

const inputJokeBtn = document.getElementById("processJoke");
let joke = document.getElementById("joke");
let randomJokeBtn = document.getElementById("randomJoke");
let setup = document.getElementById("setup");
let punchline = document.getElementById("punchline");
let jokeTypesCheckBox = document.getElementsByClassName("jokeTypes");
let mainImage = document.getElementById("mainImage")


inputJokeBtn.addEventListener("click", () => {
  mainImage.src = './images/crocs.jpg'
  let randomJokeCategoriesArray = [];
  

  for (let i = 0; i < jokeTypesCheckBox.length; i++) {
    if (jokeTypesCheckBox[i].checked) {
      console.log(jokeTypesCheckBox[i].id);
      randomJokeCategoriesArray.push(jokeTypesCheckBox[i].id);
      randomJokeCategoriesArray = [...new Set(randomJokeCategoriesArray)];
    }
  
  }
  var baseURL = "https://v2.jokeapi.dev";

  var params = ["blacklistFlags=nsfw,religious,racist", "idRange=0-100"];

  
  var xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    baseURL +
      "/joke/" +
      randomJokeCategoriesArray.join(",") +
      "?" +
      params.join("&")
  );
console.log(xhr.open("GET","https://v2.jokeapi.dev/joke/Christmas"))

  xhr.onreadystatechange = async function () {
    if (xhr.readyState == 4 && xhr.status < 300) {
      // readyState 4 means request has finished + we only want to parse the joke if the request was successful (status code lower than 300)
      var randomJoke = JSON.parse(xhr.responseText);
      console.log(randomJoke)
      if (randomJoke.type == "single") {
        // If type == "single", the joke only has the "joke" property
        setup.textContent = "";
        punchline.textContent = "";
        setup.textContent = randomJoke.joke;
        const response = await hf.textToSpeech({
          inputs: setup.textContent,
          model: "espnet/kan-bayashi_ljspeech_vits",
        });
        
        const audioElementTwo = document.getElementById("punchlineAudio");
        audioElementTwo.style.display = "none"

        const audioElement = document.getElementById("speech");
        const speechUrl = URL.createObjectURL(response);
        audioElement.src = speechUrl;
      } else {

        // If type == "single", the joke only has the "joke" property

        const audioElementTwo = document.getElementById("punchlineAudio");
        audioElementTwo.style.display = "block"

        setup.textContent = randomJoke.setup;
        punchline.textContent = randomJoke.delivery;
        
        const responseOne = await hf.textToSpeech({
          inputs: setup.textContent,
          model: "espnet/kan-bayashi_ljspeech_vits",
        });
        
        const responseTwo = await hf.textToSpeech({
          inputs: punchline.textContent,
          model: "espnet/kan-bayashi_ljspeech_vits",
        });

        
        const audioElementOne = document.getElementById("speech");
        const speechUrlOne = URL.createObjectURL(responseOne);
        audioElementOne.src = speechUrlOne;

      
        const speechUrlTwo = URL.createObjectURL(responseTwo);
        audioElementTwo.src = speechUrlTwo;


      }
    } else if (xhr.readyState == 4) {
      alert(
        "Error while requesting joke.\n\nStatus code: " +
          xhr.status +
          "\nServer response: " +
          xhr.responseText
      );
    }
  };

  xhr.send();
});

const hf = new HfInference(apiKey);

// Hugging Face Inference API docs: https://huggingface.co/docs/huggingface.js/inference/README
let text = "";

randomJokeBtn.addEventListener("click", async () => {
  
  var baseURL = "https://v2.jokeapi.dev";

  var categories = ["Programming", "Misc", "Pun", "Spooky", "Christmas"];
  var params = ["blacklistFlags=nsfw,religious,racist", "idRange=0-100"];

  var xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    baseURL + "/joke/" + categories.join(",") + "?" + params.join("&")
  );

  xhr.onreadystatechange = async function () {
    if (xhr.readyState == 4 && xhr.status < 300) {
      // readyState 4 means request has finished + we only want to parse the joke if the request was successful (status code lower than 300)
      var randomJoke = JSON.parse(xhr.responseText);

      if (randomJoke.type == "single") {
        setup.textContent = "";
        punchline.textContent = "";
        // If type == "single", the joke only has the "joke" property
        setup.textContent = randomJoke.joke;
        const response = await hf.textToSpeech({
          inputs: setup.textContent,
          model: "espnet/kan-bayashi_ljspeech_vits",
        });

        const audioElementTwo = document.getElementById("punchlineAudio");
        audioElementTwo.style.display = "none"
        const audioElement = document.getElementById("speech");
        const speechUrl = URL.createObjectURL(response);
        audioElement.src = speechUrl;
      } else {
        
        // If type == "single", the joke only has the "joke" property
        
        setup.textContent = randomJoke.setup;
        punchline.textContent = randomJoke.delivery;

        console.log(punchline.textContent)

        const responseOne = await hf.textToSpeech({
          inputs: setup.textContent,
          model: "espnet/kan-bayashi_ljspeech_vits",
        });
        
        const responseTwo = await hf.textToSpeech({
          inputs: punchline.textContent,
          model: "espnet/kan-bayashi_ljspeech_vits",
        });

        console.log(responseTwo)
        const audioElementOne = document.getElementById("speech");
        const speechUrlOne = URL.createObjectURL(responseOne);
        audioElementOne.src = speechUrlOne;

        const audioElementTwo = document.getElementById("punchlineAudio");
        audioElementTwo.style.display = "block"
        const speechUrlTwo = URL.createObjectURL(responseTwo);
        audioElementTwo.src = speechUrlTwo;

      }
    } else if (xhr.readyState == 4) {
      alert(
        "Error while requesting joke.\n\nStatus code: " +
          xhr.status +
          "\nServer response: " +
          xhr.responseText
      );
    }
  };

  xhr.send();
});
