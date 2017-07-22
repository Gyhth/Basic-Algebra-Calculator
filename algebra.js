$(function() {
  var algebra = new algebraClass();
  try {
    alert(algebra.calculate("20.25+x=2.35"))
  } catch (e) {
    console.log(e.toString());
  }
});

var algebraClass = function() {};

algebraClass.prototype = {

  isNumeric: function(number) {
    //As of January 17th, 2015, this is how jQuery does their isNumeric
    //Therefore, it is used here as jQuery is a somewhat Standard Javascript
    //Library
    return !isNaN(parseFloat(number)) && isFinite(number);
  },
  //Requires that the string entered can be solved purely by the left side.
  //No varibles on right side of the equasion.
  //Also requires that there exist only one variable.
  //Variable must also be beside the "=" sign.
  calculate: function(equasion) {
    //Replace any negatives with the proper mathmatical logic: "Add a negative"
    var replaceNegatives = equasion.replace("\-", "\+\-");
    //Split the string on the additions
    var additionSplit = replaceNegatives.split("+");
    var sum = 0;
    //For each value on the right side, with exception of the variable,
    //Sum their values.
    for (var i = 0; i < additionSplit.length - 1; i++) {
      sum += (parseFloat(additionSplit[i]) * -1);
    }
    //Split the equasion into its two parts.
    //Ex. x=2 becomes [0] => x, [1] => 2
    var rightSideSplit = additionSplit[additionSplit.length - 1].split("=");
		//If both our sum and the right side of the quasion have decimals, we parse them as a float
    if (sum.toString().includes(".") && rightSideSplit[rightSideSplit.length - 1].toString().includes(".")) {
      var solution = parseFloat(rightSideSplit[rightSideSplit.length - 1]) + parseFloat(sum);
    } else {
      //If the sum is a float (has a decimal), then we need to do special work
      if (sum.toString().includes(".")) {
        //Split the value at the decimal
        var splitSum = sum.toString().split(".");
        //Add the whole integers together, find how far the decimal portion is away from 1
        var solution = (parseFloat(rightSideSplit[rightSideSplit.length - 1]) + parseFloat(splitSum[0]) - (1 - parseFloat("." + splitSum[splitSum.length - 1])));
      } else {
        //If the decimal appears on the right side of the equasion
        if (rightSideSplit[rightSideSplit.length - 1].toString().includes(".")) {
          //Split the value at the decimal
          var splitRightSide = rightSideSplit[rightSideSplit.length - 1].toString().split(".");
          //Add the whole integers together, find how far the decimal portion is away from 1
          var solution = (parseFloat(splitRightSide[0]) + parseFloat(sum) - (1 - parseFloat("." + splitRightSide[splitRightSide.length - 1])));
        }
        //Solution has no decimals at any point, therefore is an Integer answer
        else {
          var solution = parseInt(rightSideSplit[rightSideSplit.length - 1]) + parseInt(sum);
        }
      }
    }
    //Remove any signs on the variable before output, and return solution
    return rightSideSplit[0].replace("\+", "").replace("\-", "") + " = " + solution;
  },
};
