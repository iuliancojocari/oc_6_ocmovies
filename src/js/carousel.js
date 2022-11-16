const url = 'http://localhost:8000/api/v1/titles/'
async function getBestMovies(skip, movies = 7, pagesize = '7') {
  try {
    const response = await fetch(
      url + '?sort_by=-imdb_score&page_size=' + pagesize
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
    alert(error)
    console.log(error)
  }
}

async function createCarousel(skip = 0) {
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
  title.classList.add('category-title')
  carousel.appendChild(title)

  // create carousel container and class carousel container
  let carouselContainer = document.createElement('div')
  carouselContainer.classList.add('carousel-container')

  // create carousel content
  let carouselContent = document.createElement('div')
  carouselContent.classList.add('carousel-content')

  let moviesData = await getBestMovies(skip)

  for (movie of moviesData) {
    console.log(movie)
    // create carousel card
    let card = document.createElement('div')
    card.classList.add('card')

    // create image element
    let image = document.createElement('img')
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
  carouselContainer.appendChild(nextButton)

  // left button
  const previousButton = document.createElement('button')
  previousButton.innerHTML = '<i class="bi bi-chevron-left"></i>'
  previousButton.classList.add('btn')
  previousButton.classList.add('left')
  previousButton.addEventListener('click', () => {
    carouselContent.scrollLeft -= 272
  })
  carouselContainer.appendChild(previousButton)

  carouselContainer.appendChild(carouselContent)

  carousel.appendChild(carouselContainer)
  section.appendChild(carousel)
}

window.addEventListener('load', function () {
  createCarousel((skip = 1))
})
