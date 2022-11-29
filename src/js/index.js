const url = 'http://localhost:8000/api/v1/titles/'

async function getBestMovie() {
  let bestMovie = document.querySelector('.best-movie')

  let bestMovieDesc = document.querySelector('.best-movie__desc')
  let movieTitle = document.createElement('h1')
  movieTitle.classList.add('best-movie__title')

  let bestMovieCover = document.createElement('div')
  bestMovieCover.classList.add('best-movie__cover')

  let img = document.createElement('img')
  let desc = document.createElement('p')

  try {
    const response = await fetch(url + '?sort_by=-imdb_score')

    if (response.ok) {
      const data = await response.json()
      movieTitle.innerHTML = data['results'][0]['title']
      bestMovieDesc.insertBefore(movieTitle, bestMovieDesc.firstChild)

      img.src = data['results'][0]['image_url']

      const descResponse = await fetch(data['results'][0]['url'])
      const descData = await descResponse.json()

      desc.innerHTML = descData['description']
      movieTitle.after(desc)

      let moreBestInfoBtn = document.getElementById('secondary-button')
      moreBestInfoBtn.addEventListener('click', () => {
        document.getElementById('modal').style.display = 'block'
        getMovieModal(data['results'][0]['id'])
      })

      bestMovieCover.appendChild(img)
      bestMovie.appendChild(bestMovieCover)
    }
  } catch (error) {
    console.log(error)
  }
}

async function getMovieModal(id) {
  try {
    const response = await fetch(url + id)

    if (response.ok) {
      const data = await response.json()

      document.getElementById('modal-cover').src = data['image_url']
      document.getElementById('modal-title').innerHTML = data['title']
      document.getElementById('modal-genre').innerHTML = data['genres']
      document.getElementById('modal-date').innerHTML = data['date_published']
      document.getElementById('modal-rating').innerHTML = data['rated']
      document.getElementById('modal-score').innerHTML =
        data['imdb_score'] + '/10'
      document.getElementById('modal-directors').innerHTML = data['directors']
      document.getElementById('modal-actors').innerHTML = data['actors']
      document.getElementById('modal-duration').innerHTML =
        data['duration'] + ' min'
      document.getElementById('modal-country').innerHTML = data['countries']
      document.getElementById('modal-results').innerHTML =
        data['worldwide_gross_income']
      document.getElementById('modal-synopsis').innerHTML =
        data['long_description']
    }
  } catch (error) {
    console.log(error)
  }
}

function openModal(id) {
  let modal = document.getElementById('modal')
  getMovieModal(id)
  modal.style.display = 'block'

  let close = document.getElementById('modal__close-btn')
  close.onclick = function () {
    modal.style.display = 'none'
  }
}

async function getBestMovies(category, skip, movies = 7, pagesize = '7') {
  try {
    const response = await fetch(
      url + '?sort_by=-imdb_score&page_size=' + pagesize + '&genre=' + category
    )

    if (response.ok) {
      const firstPageData = await response.json()
      let moviesData = Array(...firstPageData.results)
      if (skip > 0) {
        moviesData.splice(0, skip)
      }
      if (moviesData.length < movies) {
        let nextPageData = await (await fetch(firstPageData.next)).json()
        moviesData.push(
          ...Array(...nextPageData.results).slice(0, movies - moviesData.length)
        )
      }
      return moviesData
    }
  } catch (error) {
    console.log(error)
  }
}

async function createCarousel(category, categoryName, skip = 0) {
  // create section element with class categories
  let section = document.createElement('section')
  section.classList.add('categories')

  document.querySelector('.carousels').appendChild(section)

  // create container
  let carousel = document.createElement('div')
  carousel.classList.add('container')
  carousel.classList.add('first-carousel')

  // create title element with class category title
  let title = document.createElement('h2')
  title.innerHTML = categoryName + ' movies'
  title.classList.add('category-title')
  carousel.appendChild(title)

  // create carousel container and class carousel container
  let carouselContainer = document.createElement('div')
  carouselContainer.classList.add('carousel-container')

  // create carousel content
  let carouselContent = document.createElement('div')
  carouselContent.classList.add('carousel-content')

  let moviesData = await getBestMovies(category, skip)

  for (movie of moviesData) {
    // create carousel card
    let card = document.createElement('div')
    card.classList.add('card')

    // create image element
    let image = document.createElement('img')
    image.setAttribute('onclick', `openModal("${movie.id}")`)
    image.src = movie.image_url

    card.appendChild(image)
    carouselContent.appendChild(card)
  }

  // create carousel nav buttons
  // right button
  const nextButton = document.createElement('button')
  nextButton.innerHTML = '<i class="bi bi-chevron-right"></i>'
  nextButton.classList.add('btn')
  nextButton.classList.add('right')
  nextButton.addEventListener('click', () => {
    carouselContent.scrollLeft += 272
  })

  // left button
  const previousButton = document.createElement('button')
  previousButton.innerHTML = '<i class="bi bi-chevron-left"></i>'
  previousButton.classList.add('btn')
  previousButton.classList.add('left')
  previousButton.addEventListener('click', () => {
    carouselContent.scrollLeft -= 272
  })

  carouselContainer.appendChild(carouselContent)
  carouselContainer.appendChild(nextButton)
  carouselContainer.appendChild(previousButton)

  carousel.appendChild(carouselContainer)
  section.appendChild(carousel)
}

window.addEventListener('load', function () {
  getBestMovie()
  createCarousel((category = ''), (categoryName = 'Best'), (skip = 1))
  createCarousel((category = 'drama'), (categoryName = 'Drama'))
  createCarousel((category = 'family'), (categoryName = 'Family'))
  createCarousel((category = 'romance'), (categoryName = 'Romance'))
})
