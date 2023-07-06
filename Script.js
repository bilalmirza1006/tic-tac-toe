const boxes = Array.from(document.getElementsByClassName('box'))
const resetBtn = document.getElementById('resetBtn')
resetBtn.addEventListener('click', reset)
const headerText = document.getElementById('header-text')
const areas = [null, null, null, null, null, null, null, null, null]
const o_text = "o"
const x_text = "x"
let currentPlayer = o_text
let winBoxesIds = []


function bindClickEvent() {
    boxes.forEach(box => {
        box.addEventListener('click', handleBoxClick)
    })
}
bindClickEvent()

function handleBoxClick(e) {
    if (winBoxesIds.length > 0) {
        return
    }
    // alert(e.target.id)
    const id = e.target.id
    if (!areas[id]) {
        areas[id] = currentPlayer
        e.target.innerHTML = currentPlayer
        if (hasPlayerWon(currentPlayer)) {
            headerText.innerHTML = `${currentPlayer} has won !!`
            headerText.style.background = 'lightgreen'
            changeWinBoxesBg();
            return
        }
        currentPlayer = currentPlayer === o_text ? x_text : o_text
        return
    }
}
function hasPlayerWon(cPlayer) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (areas[a] === cPlayer && areas[b] === cPlayer && areas[c] === cPlayer) {
            winBoxesIds = [a, b, c];
            return true;
        }
    }

    // return false;
}



// function hasPlayerWon(cPlayer) {
//     // Check rows
//     for (let i = 0; i < 9; i += 3) {
//         if (areas[i] === cPlayer && areas[i + 1] === cPlayer && areas[i + 2] === cPlayer) {
//             winBoxesIds = [i, i + 1, i + 2];
//             return true;
//         }
//     }

//     // Check columns
//     for (let i = 0; i < 3; i++) {
//         if (areas[i] === cPlayer && areas[i + 3] === cPlayer && areas[i + 6] === cPlayer) {
//             winBoxesIds = [i, i + 3, i + 6];
//             return true;
//         }
//     }

//     // Check diagonals
//     if (areas[0] === cPlayer && areas[4] === cPlayer && areas[8] === cPlayer) {
//         winBoxesIds = [0, 4, 8];
//         return true;
//     }
//     if (areas[2] === cPlayer && areas[4] === cPlayer && areas[6] === cPlayer) {
//         winBoxesIds = [2, 4, 6];
//         return true;
//     }

//     return false;
// }

// function hasPlayerWon(cPlayer) {
//     if (areas[0] == cPlayer) {
//         if (areas[1] == cPlayer && areas[2] == cPlayer) {
//             winBoxesIds = [0, 1, 2]
//             return true
//         }
//         if (areas[4] == cPlayer && areas[4] == cPlayer) {
//             winBoxesIds = [0, 4, 8]
//             return true
//         }
//         if (areas[3] == cPlayer && areas[3] == cPlayer) {
//             winBoxesIds = [0, 3, 6]
//             return true
//         }
//     }
//     if (areas[4] == cPlayer) {
//         if (areas[1] == cPlayer && areas[7] == cPlayer) {
//             winBoxesIds = [4, 1, 7]
//             return true
//         }
//         if (areas[2] == cPlayer && areas[6] == cPlayer) {
//             winBoxesIds = [4, 2, 6]
//             return true
//         }
//         if (areas[3] == cPlayer && areas[5] == cPlayer) {
//             winBoxesIds = [4, 3, 5]
//             return true
//         }
//         if (areas[3] == cPlayer && areas[5] == cPlayer) {
//             winBoxesIds = [4, 3, 5]
//             return true
//         }

//     }
//     if (areas[8] == cPlayer) {
//         if (areas[7] == cPlayer && areas[6] == cPlayer) {
//             winBoxesIds = [8, 7, 6]
//             return true
//         }
//         if (areas[5] == cPlayer && areas[2] == cPlayer) {
//             winBoxesIds = [8, 5, 2]
//             return true
//         }
//         if (areas[0] == cPlayer && areas[4] == cPlayer) {
//             winBoxesIds = [8, 0, 4]
//             return true
//         }
//     }
//     return false
// }
function changeWinBoxesBg() {
    winBoxesIds.forEach(id => {
        boxes[id].style.background = 'lightgreen'
    })
    boxes.forEach(box => {
        box.style.cursor = 'not-allowed'
    })
}


function reset() {
    // alert()
    winBoxesIds = []
    areas.forEach((val, index) => {
        areas[index] = null
    })
    boxes.forEach(box => {

        box.innerHTML = ''
        box.style.background = ''
        box.style.cursor = 'pointer'
    })
    headerText.innerHTML = "Lets play .."
    headerText.style.background = ''
    currentPlayer = o_text
}

