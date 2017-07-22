$(function() {
	var algebra = new algebraClass();
	try {
		alert(algebra.calculate("20+x=2"))
	}
	catch (e) {
		console.log(e.toString());
	}
});

var algebraClass = function(){};

algebraClass.prototype = {

	isNumeric: function (number) {
		//As of January 17th, 2015, this is how jQuery does their isNumeric
		//Therefore, it is used here as jQuery is a somewhat Standard Javascript
		//Library
		return !isNaN(parseFloat(number)) && isFinite(number);
	},
	//Requires that the string entered can be solved purely by the left side,
	//and has integer based solution.
//No varibles on right side of the equasion.
	//Also requires that there exist only one variable.
	//Variable must also be beside the "=" sign.
	calculate: function(equasion) {
		//Replace any negatives with the proper mathmatical logic: "Add a negative"
		var replaceNegatives = equasion.replace("\-","\+\-");
		//Split the string on the additions
		var additionSplit = replaceNegatives.split("+");
		var sum = 0;
		//For each value on the right side, with exception of the variable,
		//Sum their values.
		for (var i = 0; i < additionSplit.length-1; i++) {
			sum += (parseInt(additionSplit[i]) * -1);
		}
		//Split the equasion into its two parts.
		//Ex. x=2 becomes [0] => x, [1] => 2
		var rightSideSplit = additionSplit[additionSplit.length-1].split("=");
		//Add the sum to the right side of the equasion.
		var solution = parseInt(rightSideSplit[rightSideSplit.length-1]) + parseInt(sum);
		//Remove any signs on the variable before output, and return solution
		return rightSideSplit[0].replace("\+","").replace("\-","") + " = " + solution;
	},
};
