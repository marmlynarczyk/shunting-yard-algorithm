function evaluate(string){
	if(string.match(/^-/)){
		string=string.replace(/^-/,"0-");
	}
	
	function equal(string){
		string = string.replace(/\s/g,"");
		if(checkBrackets(string)||checkForBadInput(string)){
			throw 'BAD STRING';
		}
		return evaluateRPN(reversePolish(string));
	}

	function checkBrackets(string){
		let counter = 0;
		for(let c =0;c<string.length;++c){
			if(string[c]=='(') ++counter;
			if(string[c]==')') --counter;
			if(counter<0) break;
		}
		if(counter===0){
			return false;
		}
		return false;
	}

	function checkForBadInput(string){
		if(string.match(/[^\d*/+-^()]/g)){
			return true;
		}
		return false;
	}

	let precedenceOf = {
	  "^": 4,
	  "*": 3,
	  "/": 3,
	  "%": 3,
	  "+": 2,
	  "-": 2,
	  "(": 1
	};

	function reversePolish(string){
		let stack = [];
		let numbers = [];
		let temp = '';
		
		for(let c = 0;c<string.length;++c){		
			if((parseInt(string[c],10))>=0){
				temp += string[c];
				if(!((parseInt(string[(c+1)],10))>=0)){
					numbers.push(temp);
					temp = '';
				}
			}else{
				toStack(string[c]);
			}
		}

		while(stack.length){
			numbers.push(stack.pop());
		}

		function toStack(string){		
			let t =""
			if(stack.length==0){
				stack.push(string);
				return;
			}
			if(string=='('){
				stack.push(string);
				return;
			}
			if(string==')'){
				do{
					t = stack.pop();
					if(t=='('){
						t=null;
					}else{
						numbers.push(t);
					}
				}while(t)
				return;
			}else{
				
				if(precedenceOf[string]>precedenceOf[(stack[(stack.length-1)])]){
					stack.push(string);
				}else {			
					numbers.push(stack.pop());
					toStack(string);
				}
			}
		}
		return numbers.map(function(value){
			if(parseInt(value,10)>=0){
				return parseInt(value,10);
			}
			return value; 
		})
	}

	function evaluateRPN(array){
		let stack = [];
		let minusOne = null;
		for(let c =0;c<array.length;++c){			
			if(typeof(array[c])=='number'){
				stack.push(array[c]);
			}else{
				minusOne = stack.pop();
				minusTwo = stack.pop();
				switch(array[c]){
					case '+':
					stack.push(minusTwo + minusOne);
					break;
					case '*':
					stack.push(minusTwo * minusOne);
					break;
					case '-':
					stack.push(minusTwo - minusOne);
					break;
					case '/':
					stack.push(minusTwo / minusOne);
					break;
					case '^':
					stack.push(Math.pow(minusTwo,minusOne));
					break;
				}
			}
		}
		return(stack[0]);
	}
	return equal(string)
}

