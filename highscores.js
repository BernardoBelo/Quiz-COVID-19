const highScoresList = document.querySelector('#listaDeMaioresPontuadores')
const highScores = JSON.parse(localStorage.getItem('maioresPontuacao')) || []

highScoresList.innerHTML = 
highScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`
}).join('')