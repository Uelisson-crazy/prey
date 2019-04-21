(function () {
	 const classification = document.querySelector('[data-alpha-pos="class"]')
const classList = {
  "1": "Action",
  "2": "Adventure",
  "3": "Animation",
  "4": "Comedy",
  "5": "Crime",
  "6": "Documentary",
  "7": "Drama",
  "8": "Family",
  "9": "Fantasy",
  "10": "History",
  "11": "Horror",
  "12": "Music",
  "13": "Mystery",
  "14": "Romance",
  "15": "Science Fiction",
  "16": "TV Movie",
  "17": "Thriller",
  "18": "War",
  "19": "Western"
}

  const BASE_URL = 'https://uelisson-bs.github.io'
  const INDEX_URL = BASE_URL + '/Hanok-Project/bet/movies.json'
  const INDEX_URL2 = BASE_URL + '/Hanok-Project/assets/AH-List/Post-id/'
  const POSTER_URL = 'https://'
  const dataPanel = document.querySelector('[data-movie-list]')
  let data = []
  const data = []

  const searchBtn = document.getElementById('submit-search')
  const searchInput = document.getElementById('search')

  const pagination = document.getElementById('pagination')
  const ITEM_PER_PAGE = 8
  
  const listModel = document.getElementById("btn-listModel")
  const cardModel = document.getElementById("btn-cardModel")
  
  // 設定一個判斷Model的Boolean
  let isListModel = false
  // 將頁數預設在第一頁
  let page = 1

  const dataPanel = document.getElementById('data-panel')
  

// 取分類資料
for (let list in classList) {
  let classdata = `
    <li class="nav-item">
      <a class="nav-link" href="#">${classList[list]}</a>
    </li>
  `
  classification.innerHTML += classdata
}

// 分類list監聽
classification.addEventListener('click', function(event) {
  let link = document.querySelectorAll('.nav-link')
  for (let i = 0; i < link.length; i++) {
    link[i].classList.remove('active')
  }
  event.target.classList.add('active')
  let content = event.target.innerHTML
  let results = []
  results = data.filter(item => getGenresName(item.genres).match(content))
  displayDataList(results)
})

axios.get(INDEX_URL)
  .then(response => {
    data.push(...response.data.results)
    displayDataList(data)
})
.catch(error => console.log(error))

  axios.get(INDEX_URL).then((response) => {
    data.push(...response.data.results)
    console.log(data)
    getTotalPages (data)
    getPageData(1, data)
  }).catch((err) => console.log(err))

  function displayDataList (data) {
    let htmlContent = ''
    if (isListModel === false) {
      data.forEach(function (item, index) {
        htmlContent += `
          <div class="col-sm-3">
            <div class="card mb-2 size">
              <img class="card-img-top" src="${POSTER_URL}${item.image}" alt="Card image cap" data-toggle="modal" data-target="#show-movie-modal">
              <img class="lith" src="${POSTER_URL}${item.image2}">
              <div class="card-body movie-item-body ">
                <h6 class="card-title">${item.titulo}</h5>
              </div>
              <div class="card-footer">
                <button class="btn btn-info btn-show-movie" data-toggle="modal" data-target="#show-movie-modal" data-id="${item.id}">Mais Informação</button>
               <!--<button class="btn btn-primary btn-add-favorite" data-id="${item.id}">+</button>-->
              </div>
            </div>
          </div>
        `
      })
    } else if (isListModel === true) {
      data.forEach(function (item, index) {
        htmlContent += `
          <div class="container">
            <div class="row size">
              <div class="col-9">
                <h5>${item.titulo}</h5>
              </div>
              <div class="col-3 card-footer">
                <button class="btn btn-info btn-show-movie" data-toggle="modal" data-target="#show-movie-modal" data-id="${item.id}">Mais Informação</button>
                <!-- favorite button btn-primary --> 
               <!-- <button class = "btn btn-info btn-add-favorite" data-id ="${item.id}" > + </button>--> 
              </div>
            </div>
          </div>
      `
      })
   }
    dataPanel.innerHTML = htmlContent
 }    
	
function getGenresName (item) {
 let genresName = []
 for (let i = 0; i < item.length; i++) {
   let value = classList[item[i]]
   genresName.push(value)
 }
 return genresName.join(' ')
}
  


  function showMovie (id) {
    // get elements
    const modalTitle = document.getElementById('show-movie-title')
    const modalImage = document.getElementById('show-movie-image')
    const modalDate = document.getElementById('show-movie-date')
	const modalGenero = document.getElementById('show-movie-genero')
	const modalFansub = document.getElementById('show-movie-fansub')
	const modalQuality = document.getElementById('show-movie-quality')
	const modalPage = document.getElementById('show-movie-page')
    const modalDescription = document.getElementById('show-movie-description')

    // set request url
    const url = INDEX_URL2 + id + '.json'
    console.log(url)

    // send request to show api
    axios.get(url).then(response => {
		var arr = [ 'a', 'b', 'c'];
arr.push('d'); // insert as last item
console.log(arr); // ['a', 'b', 'c', 'd']
console.log(arr.pop()); // remove last item
console.log(arr); // ['a', 'b', 'c'
      const data = response.data.results
      console.log(data)

      // insert data into modal ui
      modalTitle.textContent = data.titulo
      modalImage.innerHTML = `<img src="${POSTER_URL}${data.image}" class="img-fluid" alt="Responsive image">`
      modalDate.textContent = `${data.ano}`
	  modalGenero.textContent = `${data.genero}`
	  modalFansub.textContent = `${data.fansub}`
	  modalQuality.textContent = `${data.qualidade}`
	  modalPage.innerHTML = `${data.page}`
      modalDescription.textContent = `${data.sinopse}`
    })
  }


  function getTotalPages (data) {
    let totalPages = Math.ceil(data.length / ITEM_PER_PAGE) || 1
    let pageItemContent = ''
    for (let i = 0; i < totalPages; i++) {
      pageItemContent += `
        <li class="page-item">
          <a class="page-link" href="javascript:;" data-page="${i + 1}">${i + 1}</a>
        </li>
      `
    }
    pagination.innerHTML = pageItemContent
  }

  let paginationData = []

  function getPageData (pageNum, data) {
    paginationData = data || paginationData
    let offset = (pageNum - 1) * ITEM_PER_PAGE
    let pageData = paginationData.slice(offset, offset + ITEM_PER_PAGE)
    console.log(pageData)
    displayDataList(pageData)
  }

  function addFavoriteItem(id) {
    const list = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
    const movie = data.find(item => item.id === Number(id));

    if (list.some(item => item.id === Number(id))) {
      alert(`${movie.title} is already in your favorite list.`);
    } else {
      list.push(movie);
      alert(`Added ${movie.title} to your favorite list!`);
    }
    localStorage.setItem("favoriteMovies", JSON.stringify(list));
  }
  
  
  // set all eventListen
  
  // listen to show-movie button
  dataPanel.addEventListener('click', (event) => {
    if (event.target.matches('.btn-show-movie')) {
      showMovie(event.target.dataset.id)
    } else if (event.target.matches('.btn-add-favorite')) {
      addFavoriteItem(event.target.dataset.id)
    }
  })

  // listen to search btn click event
  searchBtn.addEventListener('click', event => {
    let results = []
    event.preventDefault()
    const regex = new RegExp(searchInput.value, 'i')

    results = data.filter(movie => movie.title.match(regex))
    console.log(results)
    getTotalPages(results)
    getPageData(1, results)
  })
  
  //listen to viewbox  
  cardModel.addEventListener("click", event => {
    if (event.target.matches("#btn-cardModel")) {
      listModel.classList.remove('hover-color-change')
      cardModel.classList.add('hover-color-change')
      isListModel = false //cardModel是預設
      getPageData(page)
    }
  })
  
  listModel.addEventListener("click", event => {
    if (event.target.matches("#btn-listModel")) {
      cardModel.classList.remove('hover-color-change')
      listModel.classList.add('hover-color-change')
      isListModel = true
      getPageData(page)
    }
  })
  // listen to pagination click event
  pagination.addEventListener('click', event => {
    console.log(event.target.dataset.page)
    page = event.target.dataset.page //保留當前頁面
    if (event.target.tagName === 'A') {
      getPageData(event.target.dataset.page)
    }
  })
})()
