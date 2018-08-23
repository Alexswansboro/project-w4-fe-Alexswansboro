import 'shoelace-css/dist/shoelace.css'
import request from 'superagent'



getID('submit-button').addEventListener('click', event => {
  event.preventDefault()

  let searchTerms = getID('input_field').value.replace(' ', '+')
  request.get(`https://itunes.apple.com/search?term=${searchTerms}`)
    .then(response => JSON.parse(response.text))
    .then(body => {
      let results = (body.results)
      // console.log(results[0].trackName, 'results.result')
      for (let result of results) {
        console.log(result)
        songDOM(result)
      }
    })
})
function getID (id) {
  return document.getElementById(id)
}

function songDOM (song) {
  let list = getID('song-list-parent')
  let songLi = createElement('li')
  songLi.classList.add(`${song.trackId}`)
  songLi.innerHTML = `<h4>${song.trackName}</h4><p>${song.artistName}</p>``<img src = "${song.artworkUrl100}"/>`
  image.classList.add('image')
  image.
  return list.appendChild(songLi)
}

function createElement (element) {
  return document.createElement(element)
}
