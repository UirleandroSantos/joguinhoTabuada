let number1;
let number2;
let correctAnswers = [];
let wrongAnswers = [];
let showsCorrectAnswer = document.querySelector("#seeAnswer");
let rightAnswer = document.querySelector(".rightAnswer");
let results = document.querySelector("#results")

function saveCorrectAnswers() {
    localStorage.setItem('correctAnswers', JSON.stringify(correctAnswers));
}

function clearGameData() {
    correctAnswers = [];
    wrongAnswers = [];
    localStorage.removeItem('correctAnswers');
}

function generateQuestion(){
    let operations = Math.floor(Math.random() * 4); // Atualizado para incluir divisão

    // Gerando number1 e number2
    number1 = Math.floor(Math.random() * 9) + 1;
    number2 = Math.floor(Math.random() * (9 - 1) + 1); // Garantindo que number2 seja diferente de zero

    // Se a operação for subtração ou divisão e number1 for menor que number2, troque os valores
    if ((operations === 1 || operations === 3) && number1 < number2) {
        let temp = number1;
        number1 = number2;
        number2 = temp;
    }

    let questionText = "";
    let correctAnswer;

    switch (operations){
        case 0:
            questionText = `Quanto é ${number1} + ${number2} ?`;
            correctAnswer = number1 + number2;
            break;
        
        case 1:
            questionText = `Quanto é ${number1} - ${number2} ?`;
            correctAnswer = number1 - number2;
            break;

        case 2:
            questionText = `Quanto é ${number1} x ${number2} ?`;
            correctAnswer = number1 * number2;
            break;

        case 3:
            questionText = `Quanto é ${number1} ÷ ${number2} ?`;
            correctAnswer = number1 / number2;
            break;

        default:
            break;
    }

    let savedAnswers = localStorage.getItem('correctAnswers');
    if (savedAnswers) {
        correctAnswers = JSON.parse(savedAnswers);
    }

    document.querySelector("#question").innerHTML = questionText;
    document.querySelector("#answer").focus();
    document.querySelector("#answer").value = "";
}

function checkAnswer(){
    let userAnswer = parseFloat(document.querySelector("#answer").value);
    let questionText = document.querySelector("#question").innerText;
    let correctAnswer;

    if(questionText.includes("+")){
        correctAnswer = number1 + number2;
    }
    if(questionText.includes("-")){
        correctAnswer = number1 - number2;
    }
    if(questionText.includes("x")){
        correctAnswer = number1 * number2;
    }
    if(questionText.includes("÷")){
        correctAnswer = number1 / number2;
    }

    function feedback(userAnswer, correctAnswer){
        let result = document.createElement("div");
        let resultText = document.createElement("span");
        resultText.textContent = userAnswer;
    
        let displayText;
    
        if(questionText.includes("+")){
            displayText = `Resposta Certa: ${number1} + ${number2} = ${userAnswer}`;
        }
        if(questionText.includes("-")){
            displayText = `Resposta Certa: ${number1} - ${number2} = ${userAnswer}`;
        }
        if(questionText.includes("x")){
            displayText = `Resposta Certa: ${number1} x ${number2} = ${userAnswer}`;
        }
        if(questionText.includes("÷")){
            displayText = `Resposta Certa: ${number1} ÷ ${number2} = ${userAnswer}`;
        }
        
        if(userAnswer == correctAnswer){
            resultText.style.color = 'green';
            correctAnswers.push(correctAnswer);
            results.style.display = "flex";
            showsCorrectAnswer.style.display = 'none';
            rightAnswer.style.display = 'none';
            saveCorrectAnswers(); // Salva a resposta correta no armazenamento local
        } else {
            showsCorrectAnswer.style.display = 'flex';
            resultText.style.color = 'red';
            wrongAnswers.push(userAnswer);
    
            displayText = displayText.replace("Certa", "Errada");
    
            rightAnswer.textContent = `Resposta correta seria: ${correctAnswer}`;

            if(wrongAnswers.length >= 3){
                window.location.href = './erro.html';
            }
        }
    
        resultText.innerHTML = displayText;
    
        result.appendChild(resultText);
        document.querySelector("#results").appendChild(result);
        
        if(correctAnswers.length > 9){
            window.location.href = './acerto.html';
        } else {
            generateQuestion(); // Gerar a próxima pergunta após exibir o resultado
        }
    }
    
    
    feedback(userAnswer, correctAnswer);
}

function seeAnswer(){
    rightAnswer.style.display = "flex";
}

function backToHomePage(){
    window.location.href = './index.html';
}

function handleKeyDown(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Impede o comportamento padrão do Enter (como enviar formulário)
        document.querySelector("button").click(); // Simula um clique no botão "Responder"
    }
}

clearGameData(); // Limpa os dados do jogo ao iniciar
generateQuestion(); // Chamar a função para gerar a primeira pergunta ao carregar a página

showsCorrectAnswer.addEventListener("click", seeAnswer);
