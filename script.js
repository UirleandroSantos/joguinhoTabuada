let number1;
let number2;

function generateQuestion(){
    let operations = Math.floor(Math.random() * 4);

    // Gerando number1 e number2
    number1 = Math.floor(Math.random() * 9) + 1;
    number2 = Math.floor(Math.random() * 9) + 1;

    // Se a operação for subtração ou divisão e number1 for menor que number2, troque os valores
    if ((operations === 1 || operations === 3) && number1 < number2) {
        let temp = number1;
        number1 = number2;
        number2 = temp;
    }

    let questionText = "";
    let questionTextFormated = "";
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
            questionText = `Quanto é ${number1} / ${number2} ?`;
            correctAnswer = number1 / number2;
            break;

        default:
            break;
    }

    document.querySelector("#question").innerHTML = questionText;
    document.querySelector("#answer").focus();
    document.querySelector("#answer").value = "";
}
generateQuestion();

function checkAnswer(){
    let userAnswer = parseInt(document.querySelector("#answer").value);
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
    if(questionText.includes("/")){
        correctAnswer = number1 / number2;
    }

    function feedback(userAnswer, correctAnswer){
        let result = document.createElement("div");
        let resultText = document.createElement("span");
        resultText.textContent = userAnswer;
        
        if(userAnswer == correctAnswer){
            resultText.style.color = 'green';
            resultText.innerHTML = `Resposta correta: ${correctAnswer}`
        } else {
            resultText.style.color = 'red';
            resultText.innerHTML = `Resposta errada: ${userAnswer}`
            window.location.href = './erro.html';
        }
        
        result.appendChild(resultText);
        document.querySelector("#results").appendChild(result);
    }
    
    
    feedback(userAnswer, correctAnswer);
    generateQuestion();
}
function backToHomePage(){
    window.location.href = './index.html'
}

function handleKeyDown(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Impede o comportamento padrão do Enter (como enviar formulário)
        document.querySelector("button").click(); // Simula um clique no botão "Responder"
    }
}