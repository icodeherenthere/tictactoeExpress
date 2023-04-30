let currentPlayer = 'x'
let xResult = 0
let oResult = 0

class Square {
  constructor(index) {
    this.index = index
    this.content = ""
  }
  changeContent(newContent) {
    if (this.content === '') {
      this.content = newContent
      document.getElementById(this.index).innerText = newContent
    } else {
      console.log('nope', this.index)
    }
  }
  getContent() {
    return this.content
  }
}
class Board {
  constructor() {
    this.gameOver = false
    this.squaresArr = []
    this.movesCount = 0
    for (let index = 0; index < 9; index++) {
      const square = new Square(index)
      this.squaresArr.push(square)
      document.getElementById(index).addEventListener('click', (event) => {
        console.log(`Player ${currentPlayer} clicked on square ${index} count ${this.movesCount}`)
        const currentSquare = this.squaresArr[index]
        if (currentSquare.getContent() === '' && this.gameOver === false) {
          currentSquare.changeContent(currentPlayer)
          this.checkWin()
          if (currentPlayer === 'x') {
            currentPlayer = 'o'
          } else {
            currentPlayer = 'x'
          }
          this.movesCount++
        }
      })
      // document.getElementById(index).addEventListener('keyup', (event) =>{
      //   console.log(event.target.value)
      // })
    }
  }

  checkWin() {
    if (this.checkSquaresEqual(0, 1, 2) ||
      this.checkSquaresEqual(0, 4, 8) ||
      this.checkSquaresEqual(0, 3, 6) ||
      this.checkSquaresEqual(1, 4, 7) ||
      this.checkSquaresEqual(2, 5, 8) ||
      this.checkSquaresEqual(3, 4, 5) ||
      this.checkSquaresEqual(6, 7, 8) ||
      this.checkSquaresEqual(6, 4, 2)) {
      alert(`${currentPlayer} win!`)

      this.gameOver = true
      console.log(`Winner ${currentPlayer} ${JSON.stringify(this.squaresArr)}`)

      fetch('/score', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          winner: currentPlayer
        })
      })
      .then(response => {
        window.location.reload(true)
      })

      
    }
  }
  
  checkSquaresEqual(a, b, c) { 
    if (this.squaresArr[a].getContent() === '') {
      return false
    }
    if (this.squaresArr[a].getContent() === this.squaresArr[b].getContent() && this.squaresArr[c].getContent() === this.squaresArr[a].getContent()) {
      return true
    } else {
      return false
    }
  }
  
}

const board = new Board()


// var thumbUp = document.getElementsByClassName("fa-thumbs-up");
// var thumbDown = document.getElementsByClassName("fa-thumbs-down");
// var trash = document.getElementsByClassName("fa-trash");

// Array.from(thumbUp).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const name = this.parentNode.parentNode.childNodes[1].innerText
//         const msg = this.parentNode.parentNode.childNodes[3].innerText
//         const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
//         fetch('messages/thumbUp', {
//           method: 'put',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//             'name': name,
//             'msg': msg,
//             'thumbUp':thumbUp
//           })
//         })
//         .then(response => {
//           if (response.ok) return response.json()
//         })
//         .then(data => {
//           console.log(data)
//           window.location.reload(true)
//         })
//       });
// });



// Array.from(thumbDown).forEach(function(element) {
//   element.addEventListener('click', function(){
//     const name = this.parentNode.parentNode.childNodes[1].innerText
//     const msg = this.parentNode.parentNode.childNodes[3].innerText
//     const thumbDown = parseFloat(this.parentNode.parentNode.childNodes[9].innerText)
//     const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
//     fetch('messages/thumbDown', {
//       method: 'put',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({
//         'name': name,
//         'msg': msg,
//         'thumbDown':thumbDown,
//         'thumbUp':thumbUp
//       })
//     })
//     .then(response => {
//       if (response.ok) return response.json()
//     })
//     .then(data => {
//       console.log(data)
//       window.location.reload(true)
//     })
//   });
// });

// Array.from(trash).forEach(function(element) {
//       element.addEventListener('click', function(){
//         const name = this.parentNode.parentNode.childNodes[1].innerText
//         const msg = this.parentNode.parentNode.childNodes[3].innerText
//         fetch('messages', {
//           method: 'delete',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             'name': name,
//             'msg': msg
//           })
//         }).then(function (response) {
//           window.location.reload()
//         })
//       });
// });
