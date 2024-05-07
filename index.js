import { HfInference } from '@huggingface/inference'

const inputJokeBtn = document.getElementById("processJoke")
let joke = document.getElementById("joke")
let randomJoke = document.getElementById("randomJoke")
const hf = new HfInference("")


// Hugging Face Inference API docs: https://huggingface.co/docs/huggingface.js/inference/README
let text = ""


inputJokeBtn.addEventListener('click', async ()=> {
  const url = 'https://v2.jokeapi.dev/joke/Any?type=single&contains=weather'; // URL for JokeAPI
fetch(url)
  .then(response => response.json()) // parse the response as JSON
  .then(data => console.log(data.joke)) // log the joke to the console
  .catch(error => console.log('Error:', error)); // log any errors to the console
  text = joke.value
  console.log(text)
  const response = await hf.textToSpeech({
    inputs: text,
    model: "espnet/kan-bayashi_ljspeech_vits"
  })

  const audioElement = document.getElementById('speech')
const speechUrl = URL.createObjectURL(response)
audioElement.src = speechUrl

  console.log(response)
})



