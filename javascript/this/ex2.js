function invokeMax(fn, num){
    let counter = 0;
    
    return function(){
		counter++;
        if(counter>num)return "Maxed out!";
        else
        {
        	let tosend = [].slice.call(arguments);
    		return(fn.apply(this,tosend));
        }
    }
}

function add(a,b){
        return a+b
    }

var addOnlyThreeTimes = invokeMax(add,3);
// console.log(addOnlyThreeTimes(1,2)); // 3
// console.log(addOnlyThreeTimes(2,2)); // 4
// console.log(addOnlyThreeTimes(1,2)); // 3
// console.log(addOnlyThreeTimes(1,2)); // "Maxed Out!"


/* 
Write a function called once which accepts two parameters, a function and a value for the keyword 'this'. Once should return a new function that can only be invoked once, with the value of the keyword this in the function set to be the second parameter.

Examples:

    function add(a,b){
        return a+b
    }

    var addOnce = once(add, this);
    addOnce(2,2) // 4
    addOnce(2,2) // undefined
    addOnce(2,2) // undefined
    
    function doMath(a,b,c){
        return this.firstName + " adds " + (a+b+c)
    }
    
    var instructor = {firstName: "Elie"}
    var doMathOnce = once(doMath, instructor);
    doMathOnce(1,2,3) // "Elie adds 6"
    doMathOnce(1,2,3) // undefined
    

*/

function once(fn, thisArg){
    let done = 0;
    return function(){
    	if(done===0)
    	{
    		let toSend = [].slice.call(arguments);
    		done++;
    		return fn.apply(thisArg,toSend);

    	}

    	else
    	{
    		return;
    	}
    }
}

function add(a,b){
        return a+b
    }

var addOnce = once(add, this);
// console.log(addOnce(2,2)); // 4
// console.log(addOnce(2,2)); // undefined
// console.log(addOnce(2,2)); // undefined


function doMath(a,b,c){
        return this.firstName + " adds " + (a+b+c)
    }
    
var instructor = {firstName: "Elie"};
var doMathOnce = once(doMath, instructor);
// console.log(doMathOnce(1,2,3)); // "Elie adds 6"
// console.log(doMathOnce(1,2,3)); // undefined


/* 
Write a function called bind which accepts a function and a value for the keyword this. Bind should return a new function that when invoked, will invoke the function passed to bind with the correct value of the keyword this. HINT - if you pass more than two parameters to bind, those parameters should be included as parameters to the inner function when it is invoked. You will have to make use of closure!

Examples:

    function firstNameFavoriteColor(favoriteColor){
        return this.firstName + "'s favorite color is " + favoriteColor
    }
    
    var person = {
        firstName: 'Elie'
    }
    
    var bindFn = bind(firstNameFavoriteColor, person);
    bindFn('green') // "Elie's favorite color is green"
    
    var bindFn2 = bind(firstNameFavoriteColor, person, 'blue');
    bindFn2('green') // "Elie's favorite color is blue" 
    
    function addFourNumbers(a,b,c,d){
        return a+b+c+d;
    }

    bind(addFourNumbers,this,1)(2,3,4) // 10
    bind(addFourNumbers,this,1,2)(3,4) // 10
    bind(addFourNumbers,this,1,2,3)(4) // 10
    bind(addFourNumbers,this,1,2,3,4)() // 10
    bind(addFourNumbers,this)(1,2,3,4) // 10
    bind(addFourNumbers,this)(1,2,3,4,5,6,7,8,9,10) // 10

*/

function bind2(fn, thisArg){
	let toSend = [].slice.call(arguments);
    toSend = toSend.slice(2,toSend.length);
    return fn.bind(thisArg,...toSend);
}

function bind(fn, thisArg){
    let outerArgs = [].slice.call(arguments,2);
    
    return function(){
        let innerArgs = [].slice.call(arguments);
        let allArgs = outerArgs.concat(innerArgs);
        return fn.apply(thisArg,allArgs)
    }
}

function firstNameFavoriteColor(favoriteColor){
        return this.firstName + "'s favorite color is " + favoriteColor
}
    
    var person = {
        firstName: 'Elie'
    }
    
    var bindFn = bind(firstNameFavoriteColor, person);
// console.log(bindFn('green')); // "Elie's favorite color is green"
    
var bindFn2 = bind(firstNameFavoriteColor, person, 'blue');
// console.log(bindFn2('green')); // "Elie's favorite color is blue" 
    
    function addFourNumbers(a,b,c,d){
        return a+b+c+d;
    }

// console.log(bind(addFourNumbers,this,1)(2,3,4)) // 10
// console.log(bind(addFourNumbers,this,1,2)(3,4)) // 10
// console.log(bind(addFourNumbers,this,1,2,3)(4)) // 10
// console.log(bind(addFourNumbers,this,1,2,3,4)()) // 10
// console.log(bind(addFourNumbers,this)(1,2,3,4)) // 10
// console.log(bind(addFourNumbers,this)(1,2,3,4,5,6,7,8,9,10)) // 10


/* 
Write a function called flip which accepts a function and a value for the keyword this. Flip should return a new function that when invoked, will invoke the function passed to flip with the correct value of the keyword this and all of the arguments passed to the function REVERSED. HINT - if you pass more than two parameters to flip, those parameters should be included as parameters to the inner function when it is invoked. You will have to make use of closure! 

Flip should return a new function that when invoked takes the correct number of required arguments to that function which are then reversed. HINT - you will need to use the .length property on functions to figure out the correct amount of arguments. For example:

flip(subtractFourNumbers,this,11,12,13,14,15)(1,2,3,4,5,6,7,8,9,10) 




Examples:

    function personSubtract(a,b,c){
        return this.firstName + " subtracts " + (a-b-c);
    }
    
    var person = {
        firstName: 'Elie'
    }
    
    var flipFn = flip(personSubtract, person);
    flipFn(3,2,1) // "Elie subtracts -4"
    
    var flipFn2 = flip(personSubtract, person, 5,6);
    flipFn2(7,8). // "Elie subtracts -4"
    
    function subtractFourNumbers(a,b,c,d){
        return a-b-c-d;
    }

    flip(subtractFourNumbers,this,1)(2,3,4) // -2
    flip(subtractFourNumbers,this,1,2)(3,4) // -2
    flip(subtractFourNumbers,this,1,2,3)(4) // -2
    flip(subtractFourNumbers,this,1,2,3,4)() // -2
    flip(subtractFourNumbers,this)(1,2,3,4) // -2
    flip(subtractFourNumbers,this,1,2,3)(4,5,6,7) // -2
    flip(subtractFourNumbers,this)(1,2,3,4,5,6,7,8,9,10) // -2
    flip(subtractFourNumbers,this,11,12,13,14,15)(1,2,3,4,5,6,7,8,9,10) // -22

*/


function flip(fn, thisArg){
    
}