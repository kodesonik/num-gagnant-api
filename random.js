 function getRandomNumberBetween(min,max, quantity){
     const numbers = []
     for(let i = 0; i < quantity; i++) {
         numbers.push(makeNumber(numbers, min, max))
    }
    return numbers
}

function makeNumber(array, min, max) {
    const num = Math.floor(Math.random()*(max-min+1)+min) 
    if (array.includes(num)){
        return makeNumber(array, min, max)
    } else {
       return num
    }
}

module.exports = getRandomNumberBetween