//alert("it works");
var maxNum = 9;
	var multiplyMode = 1;
	var currentScore = 0;
	var maxScore = 0;
	var scoreGoal = 50;
	var corrects = 0;
	var incorrects = 0;
	var res = 0;
	
	
$().ready(function() {
	
	
	console.log(corrects);
	
	//alert("wow!");
	
	//Прячем уведомления
	$("#alertSuccess").hide();
	$("#alertDanger").hide();
	$("#mainRow").hide();
	$("#settingsRow").hide();
	$("#recordButton").hide();
	
	//Обработчик кнопки начала тренировки
	let startButton = document.getElementById("startButton");
	startButton.addEventListener('click', function(event){
		maxNum = Number(document.getElementById("settingsMaxNumber").value);
		multiplyMode = Number(document.getElementById("settingsMultiplyMode").value);
		scoreGoal = Number(document.getElementById("settingsScoreGoal").value);
		if(Number.isInteger(scoreGoal)==false || scoreGoal == "") {
			scoreGoal = 50;
			console.log("scoreGoal set to 50");
		} 
		console.log(maxNum + " and " + multiplyMode);
		gameStart(maxNum, multiplyMode);
		answerInput.value = "";
		answerInput.focus();
		return maxNum, multiplyMode;
	});
	console.log(maxNum + " and " + multiplyMode);
	
	//Обработчик нажатия Enter при вводе ответа
	let answerInput = document.getElementById("answerInput");
	answerInput.addEventListener('keypress', function(event){
		//event.preventDefault();
		//console.log(event.code);
		if(event.code == 'Enter') {
			//alert("Enter pressed");
			let ans = Number(answerInput.value);
			checkAnswer(ans);
			res = renderTask(maxNum, multiplyMode);
			//console.log(res);
			//checkAnswer(res);
			answerInput.focus();
			answerInput.value = "";
			if(currentScore >= scoreGoal) {
				$('#winModal').modal('show');
				$('#winInformerModal').html(renderResultsAtFinish());
			}
			//console.log(scoreGoal);
		}
		
	});
	
	//Обработчик Кнопки "Ответ"
	let submitButton = document.getElementById("submitButton");
	submitButton.addEventListener('click', function(){
		let ans = Number(answerInput.value);
			checkAnswer(ans);
			res = renderTask(maxNum, multiplyMode);
			//console.log(res);
			//checkAnswer(res);
			answerInput.focus();
			answerInput.value = "";
			if(currentScore >= scoreGoal) {
				$('#winModal').modal('show');
				$('#winInformerModal').html(renderResultsAtFinish());
			}
	});
	
	//Обработчик кнопки Сброс
	let resetButton = document.getElementById("resetButton");
	resetButton.addEventListener('click', function(){
		gameReset();
	});
	
	
	//Обработчик кнопки Сохранить в модальном окне настроек
	let settingsSave = document.getElementById("settingsSave");
	settingsSave.addEventListener('click', function(){
		maxNum = document.getElementById("settingsMaxNumberModal").value;
		multiplyMode = document.getElementById("settingsMultiplyModeModal").value;
		scoreGoal = document.getElementById("settingsScoreGoalModal").value;
		console.log("scoreGoal is " + scoreGoal);
		if(Number.isInteger(scoreGoal) === false || scoreGoal === "") {
			scoreGoal = 50;
			console.log("scoreGoal set to 50");
		}
		console.log(maxNum + " and " + multiplyMode);
		res = renderTask(maxNum, multiplyMode);
		answerInput.focus();
		answerInput.value = "";
	});
	
	//Обработчик кнопки "Новая тренировка в модальном окне завершения тренировки"
	let newGameModal = document.getElementById("newGameModal");
	newGameModal.addEventListener('click', function(){
		gameReset();
	});
	//let res = renderTask(maxNum, multiplyMode);
	//console.log(res);
});



function renderTask(maxNum, multiplyMode) {
	let a, b;
	
	if(multiplyMode == "1") {
		a = maxNum;
	} else {
		a = Math.floor(maxNum*Math.random());
	}
	b = Math.floor(10*Math.random());
	
	document.getElementById("taskField").innerHTML = "<h3>" + a + " x " + b + "</h3>";
	answerInput.value = "";
	res = a * b;
	return res;
	
	//console.log(a + " and " + b);
}

function gameStart(maxNum, multiplyMode) {
	$("#startRow").hide(500);
	$("#mainRow").show(600);
	$("#settingsRow").show(600);
	res = renderTask(maxNum, multiplyMode);
	//console.log(res);
	$("#alertSuccess").show();
	$("#alertSuccess").html("<h3>Поехали!</h3>");
	$("#recordButton").show();
	answerInput.value = "";
	answerInput.focus();
	return res;
}

function checkAnswer(answer){
	console.log(answer);
	if(answer == res) {
		console.log("Ответ верный");
		corrects++;
		currentScore++;
		correctAnswer();
	} else {
		console.log("Ответ неверный");
		incorrects++;
		if(currentScore >= 2){
			currentScore -= 2;
		} else {
			currentScore = 0;
		}
		incorrectAnswer();
	}
	
	return corrects, incorrects, currentScore;
	//renderTask(maxNum, multiplyMode);
}

function correctAnswer() {
	$("#alertSuccess").removeClass();
	$("#alertSuccess").addClass("alert alert-success");
	$("#alertSuccess").html(renderResults(1));
}

function incorrectAnswer() {
	$("#alertSuccess").removeClass();
	$("#alertSuccess").addClass("alert alert-danger");
	$("#alertSuccess").html(renderResults(0));	
}

function gameReset() {
	currentScore = 0;
	maxScore = 0;
	scoreGoal = 100;
	corrects = 0;
	incorrects = 0;
	res = 0;
	$("#mainRow").hide(500);
	$("#settingsRow").hide(500);
	$("#alertSuccess").hide();
	$("#startRow").show(700);
}

function renderResults(isSuccess){
	let zombiesTime = Math.floor(currentScore/5);
	if(isSuccess == 1) {
		return results = "<h3>Ответ правильный!!!</h3> <p>Правильных ответов: " 
		+ corrects + " | Неправильных ответов: " 
		+ incorrects + " | Набрано очков: " 
		+ currentScore + "/" 
		//+ scoreGoal + " | Набрано минут для игры <h3>Набрано минут для игры в Зомби: "
		//+ zombiesTime + "</h3></p>";
		+ scoreGoal + "</p>";
	} else return results = "<h3>Ошибка!</h3><p>Правильных ответов: " 
		+ corrects + " | Неправильных ответов: " 
		+ incorrects + " | Набрано очков: " 
		+ currentScore + "/" 
		+ scoreGoal + "</p>";
}

function renderResultsAtFinish() {
	let eff = Math.floor(corrects/(corrects + incorrects)*100);
	return results = "<h3>Ты молодец!</h3>"
	+ "<p>Набрано очков: " + currentScore + "</p>"
	+ "<p>Правильных ответов: " + corrects + "</p>"
	+ "<p>неправильных ответов: " + incorrects + "</p>"
	+ "<p>Результативность : " + eff + "%</p>";
}
