const question = document.querySelector('#questao')
const choices = Array.from(document.querySelectorAll('.textoDeEscolha'))
const progressText = document.querySelector('#textoDeProgresso')
const scoreText = document.querySelector('#pontos')
const progressBarFull = document.querySelector('#barraCompletaDeProgresso')

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Qual foi o número aproximado de mortos por COVID-19 no Brasil?',
        choice1: '200 mil pessoas',
        choice2: '600 mil pessoas',
        choice3: '550 mil pessoas',
        choice4: '350 mil pessoas',
        answer: 2, 
    },
    {
        question: 'Qual foi o número aproximado de mortos por COVID-19 no mundo?',
        choice1: '5 milhões de pessoas',
        choice2: '2 milhões de pessoas',
        choice3: '10 milhões de pessoas',
        choice4: '7 milhões de pessoas',
        answer: 1, 
    },
    {
        question: 'Qual foi o país do mundo com mais mortos por COVID-19 no mundo?',
        choice1: 'Brasil',
        choice2: 'India',
        choice3: 'Estados Unidos',
        choice4: 'Reino Unido',
        answer: 3, 
    },
    {
        question: 'Em que país apareceu os primeiros casos de COVID-19?',
        choice1: 'China',
        choice2: 'Russia',
        choice3: 'Japão',
        choice4: 'Austrália',
        answer: 1, 
    },
    {
        question: 'Qual órgão público brasileiro está responsável por distribuir as vacinas para população?',
        choice1: 'SUS',
        choice2: 'Minha Casa Minha Vida',
        choice3: 'BDNS',
        choice4: 'Câmara Municipal',
        answer: 1, 
    },
    {
        question: 'Qual maneira essencial de evitar o COVID-19, além da vacinação?',
        choice1: 'Beber muita água',
        choice2: 'Frequentar ambientes cheios',
        choice3: 'Correr',
        choice4: 'Usar máscara',
        answer: 4, 
    },
    {
        question: 'O que significa a expressão "lockdown"?',
        choice1: 'Uma imposição do Estado, aonde os comércios devem ser fechados por um determinado período',
        choice2: 'Uma iniciativa privada, aonde os comérceios devem ser fechados por um motivo específico',
        choice3: 'Um projeto social, aonde empresas estatais e privadas dividem uma parcela do mercado',
        choice4: 'Uma imposição das empresas, aonde os comércios devem ser fechados por um determinado período',
        answer: 1, 
    },
    {
        question: 'Qual é a vacina 100% nacional?',
        choice1: 'Astrazenica',
        choice2: 'Pfizer',
        choice3: 'Jensen',
        choice4: 'ButanVac',
        answer: 4, 
    },
    {
        question: 'Qual foi o número total aproximado de casos de COVID-19 no Brasil?',
        choice1: '19 milhões de pessoas',
        choice2: '17 milhões de pessoas',
        choice3: '21 milhões de pessoas',
        choice4: '25 milhões de pessoas',
        answer: 3, 
    },
    {
        question: 'Ao chegar da rua, qual a primeira ação que uma pessoa deve tomar?',
        choice1: 'Comer',
        choice2: 'Abraçar os familiares',
        choice3: 'Lavar as mãos',
        choice4: 'Assistir televisão',
        answer: 3, 
    }
]

const SCORE_POINTS = 10
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e =>{
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS) 
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()