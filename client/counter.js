export function setupCounter(element) {
  let counter = 0
  element.addEventListener('click', () => setCounter(counter + 1))
  const setCounter = (count) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }
  setCounter(0)
}

export function newCounter(element){
  let counter = 0
  element.innerHTML = `count is ${counter}`
  element.addEventListener('click', incCount)
  function incCount(){
    counter++
    element.innerHTML = `count is ${counter}` 
  }
}

export function onlyCounter(element){
  element.addEventListener('click', incCount)
  let count  = document.getElementById('count')
  function incCount(){
    count.innerText = parseInt(count.innerText) + 1
  }
}