import 'shoelace-css/dist/shoelace.css'
import './main.css'
import request from 'superagent'

getID('submit-button').addEventListener('click', event => {
  event.preventDefault()
  submitSearch()
})

getID('song-list-parent').addEventListener('click', function (event) {
  if (event.target && event.target.classList.contains('single-result')) {
    getID('song-audio').src = event.target.dataset.previewUrl
    getID('song-audio').play()
  }
})

function submitSearch () {
  getID('song-list-parent').innerHTML = ''

  let searchTerms = getID('input_field').value.replace(' ', '+').trim()
  request.get(`https://itunes.apple.com/search?term=${searchTerms}`)
    .then(response => JSON.parse(response.text))
    .then(body => {
      let results = (body.results)
      for (let result of results) {
        songDOM(result)
      }
    })
}

function getID (id) {
  return document.getElementById(id)
}

function songDOM (song) {
  let list = getID('song-list-parent')
  let songLi = createElement('li')
  songLi.dataset.previewUrl = song.previewUrl
  songLi.classList.add(`single-result`)

  songLi.innerHTML = `<h4>${song.artistName}</h4><img src = "${song.artworkUrl100}"/><p>${song.trackName}</p>`

  return list.appendChild(songLi)
}

function createElement (element) {
  return document.createElement(element)
}
