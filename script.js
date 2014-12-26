var innerWrapper = document.getElementById("inner-wrapper");
var equals = document.getElementById("equals");
var display = document.getElementById("display");
var num1, num2, result;
var operator = "";

innerWrapper.addEventListener("click", buttonClick, false);
document.getElementById("c").addEventListener("click", resetCalculator, false);

function buttonClick(e) {
    if (e.target !== innerWrapper) {
    	if (e.target.className == "number") {
    		insertar(e);
    	} else if (e.target.className == "operator") {
    		getNumberFromDisplay();
    		if (num1 != null && num2 != null) {
    			performBackgroundOperation(e);
   			}
    		insertarOperador(e);
    	} else if (e.target.id == "equals" && num1 != null) {
    		getNumberFromDisplay();
    		enviarResultado(e);
    	}
    };
	console.log("Los numeros que tengo son: " + num1 + " y " + num2 + " y el operador es " + operator);
    e.stopPropagation();
    checkBug();
};

function enviarResultado(e) {
	if (operator == "+") {
		result = num1 + num2;
	} else if (operator == "-") {
		result = num1 - num2;
	} else if (operator == "÷") {
		result = num1 / num2;
	} else if (operator == "*") {
		result = num1 * num2;
	}
	if (e.target.className != "operator") {
		display.innerHTML = result;
	} else {
		display.innerHTML = e.target.value;
	}
	num1 = null;
	num2 = null;
}

function insertar(e) {
	if (display.innerHTML == result) {
		resetCalculator();
	}

	if (display.innerHTML == "0" || display.innerHTML == operator) {
		display.innerHTML = e.target.value;
	} else {
		display.innerHTML += e.target.value;
	};

}

function insertarOperador(e) {
	operator = e.target.value;
	display.innerHTML = operator;
};

function getNumberFromDisplay() {
	if (display.innerHTML != "+", display.innerHTML != "-", display.innerHTML != "*", display.innerHTML != "÷") {
		if (num1 == null) {
			num1 = parseFloat(display.innerHTML);
		} else if (num2 == null){
			num2 = parseFloat(display.innerHTML);
		}
	}
};

function performBackgroundOperation(e) {
	console.log("Los numeros que tengo son: " + num1 + " y " + num2);
	enviarResultado(e)
;	num1 = result;
	num2 = null;
}

function resetCalculator() {
	operator = "";
	num1 = null;
	num2 = null;
	result = null;
	display.innerHTML = "0";
}

/* Lo que pasa es que getNumberFromDisplay() corre vacía porque trata de guardar un operador como un nro entonces los números quedan en undefined, y por eso da NaN.*/

function checkBug() {
    if ((display.innerHTML == "NaN") && (document.getElementById("bug") == undefined)) {
		var div = document.createElement("div");
		div.setAttribute("id", "bug");
		var img = document.createElement("img");
		img.setAttribute("src", "img/happy-kitty.jpg");
		img.setAttribute("alt", "Happy kitty");
		img.setAttribute("height", "280");
		img.setAttribute("width", "400");
		img.setAttribute("class", "kitty");
		var h1 = document.createElement("h1");
		h1.innerHTML = "OK so you found the bug, <br> here's a kitty for your efforts."
		div.appendChild(h1);
		div.appendChild(img);
		document.body.appendChild(div);
		document.getElementById("bug").style.display = "block";
	}
}
