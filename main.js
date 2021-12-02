let API_KEY = 'dcea1fd7b3e65d34387ad6de7ef9cc5e'
let x1 = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`
let x2 = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
let x3 = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
let append = document.querySelector('.append')
let btn = document.querySelector('.btn')
let search = document.querySelector('#search')
let min = document.querySelector('#min')
let max = document.querySelector('#max')
let score = document.querySelector('#score')
let btns = document.querySelector('.btns')
let btns1 = document.querySelector('.btns1')
let btns2 = document.querySelector('.btns2')
let header_inner = document.querySelector(".header-inner")
let orqaga = document.querySelector('.prev')
let oldinga = document.querySelector('.next')
let peg = document.querySelector('.title')
let aa = x2 + `&page=${1}`


function create (...array){
    return array.map(el=>{
        return document.createElement(el)
    })
}
async function renderb1 (api,min1,max1,search1,score1){
    append.innerHTML = null
    const response = await fetch(api)
    const b = await response.json()
    let t = await b.results
    for (let i of t){
        const[div1,img,div2,h3,span1,span2] = create('div','img','div','h3','span','span')
        let ism = await i.release_date
        let ism1 = ism.split('-')
        let mn1 = min1 || ism1[0]
        let mx1 = max1 || ism1[0]
        let sear =  await i.title
        search1 = search1 || await i.title
        let sc = score1 || await i.vote_average
        let oo = await i.vote_average
        let r = await i.poster_path
        if(mn1<=ism1[0] && mx1>=ism1[0]){
            // console.log('1')
            if(sc<=oo){
                // console.log('2')
                if(sear.toLowerCase().includes(search1.toLowerCase())){
                    console.log('3')
                    let f = ism1.join('-')

                    span2.textContent = f
                    span1.textContent = await i.vote_average
                    h3.textContent = await i.title
                    img.src = 'https://image.tmdb.org/t/p/w500' + r
                    div1.className = "movie";
                    span1.className = "orange"
                    div2.className = "movie-info"
                    
                    span2.className = "date"
                    div1.append(img,div2,span2)
                    div2.append(h3,span1)
                    console.log(i)
                    append.append(div1)
                }
            }
            
        } 
        
    }
}
async function renderb (x3){
    append.innerHTML = null
    const response = await fetch(x3)
    const b = await response.json()
    let t = await b.results
    for (let i of t){
        const[div1,img,div2,h3,span1,span2] = create('div','img','div','h3','span','span')

        div1.className = "movie";
        div2.className = "movie-info"
        span1.className = "orange"
        span2.className = "date"

        let r = await i.poster_path
        span2.textContent = await i.release_date
        span1.textContent = await i.vote_average
        h3.textContent = await i.title
        img.src = `https://image.tmdb.org/t/p/w500` + r

        div2.append(h3,span1)
        div1.append(img,div2,span2)
        append.append(div1)
    }
}
btn.onclick = async event =>{
    event.preventDefault()
    let min1 = min.value
    let max1 = max.value
    let search1 = search.value
    let score1 = score.value
    console.log(min1,max1,search1,score1)
    renderb1(aa,min1,max1,search1,score1)
}
btns.onclick = async event =>{
    aa = x3 + `&page=${1}`
    renderb(x3)
}
btns1.onclick = async event =>{
    aa = x2 + `&page=${1}`
    renderb(x2)
}
btns2.onclick = async event =>{
    aa = x1 + `&page=${1}`
    renderb(x1)
}
orqaga.onclick = async event =>{
    
    let x = +peg.textContent
    if(--x==0) x = 1
    peg.textContent = x
    aa = aa + `&page=${x}`
    renderb(aa)
}
oldinga.onclick = () =>{
    let x = +peg.textContent
    x +=1
    peg.textContent = x
    aa = aa + `&page=${x}`
    renderb(aa)
}
renderb(x2)
