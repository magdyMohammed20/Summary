/*
(1) Avoid Global Variables
------------------------------------------------------------------------------------------
==> This includes all data types, objects, and functions.
    Global variables and functions can be overwritten by other scripts By Using (window) Keyword

(2) Always Declare Local Variables
-----------------------------------------------------------------------------------------
==> All variables used in a function should be declared as local variables.
    Local variables must be declared with the var keyword, otherwise they will become global variables.

==> Strict mode does not allow undeclared variables.

(3) Declarations on Top
----------------------------------------------------------------------------------------
==> Give cleaner code
    Provide a single place to look for local variables
    Make it easier to avoid unwanted (implied) global variables
    Reduce the possibility of unwanted re-declarations

          var fName, lName;

          fName = "Magdy";
          lName = "Mohammed";

==> This also goes for loop variables:
________________________________________

            var x;
            for(x = 0; x <= 10; x++){.....}

==> By default, JavaScript moves all declarations to the top (JavaScript Hoisting).

(4) Initialize Variables
--------------------------------------------------------------------------------------
==> It is a good coding practice to initialize variables when you declare them
==> Give cleaner code
    Provide a single place to initialize variables
    Avoid undefined values

                  var fName = "Magdy",
                      lName = "Mohammed";

(5) Never Declare Number, String, or Boolean Objects
--------------------------------------------------------------------------------------
==> Declaring these types as objects, slows down execution speed, and produces nasty side effects

(6) Don't Use new Object()
--------------------------------------------------------------------------------------

==> Use {} instead of new Object()
________________________________________

                        var x = {};

==> Use "" instead of new String()
________________________________________

                        var x = "";

==> Use 0 instead of new Number()
________________________________________

                        var x = 0;

==> Use false instead of new Boolean()
________________________________________

                        var x = false;

==> Use [] instead of new Array()
________________________________________

                        var x = [];

==> Use /()/ instead of new RegExp()
________________________________________

                        var x = /()/;

==> Use function (){} instead of new Function()
________________________________________

                        var x = function(){};

(7) Beware of Automatic Type Conversions
---------------------------------------------------------------------------------------
==> JavaScript is loosely typed. A variable can contain different data types, and a
    variable can change its data type

                          var x = "hellow";
                          x = 10;

(8) When doing mathematical operations, JavaScript can convert numbers to strings
---------------------------------------------------------------------------------------

                        var x = 10 + 5 ;  // Number (15)
                        var x = 5 + "5";  // String ("55")
                        var x = "5" + 5;  // String ("55")
                        var x = 10 - 5;   // Number (5)
                        var x = 10 - "5"; // Number (5)
                        var x = "10" - 5; // Number (5)
                        var x = 5 - "x";  // Number (NaN)

==> Subtracting a string from a string, does not generate an error but returns NaN (Not a Number):
________________________________________

                    console.log("Magdy" - "Mohammed"); // Return NaN

(9) Use === Comparison
--------------------------------------------------------------------------------------
==> The == comparison operator always converts (to matching types) before comparison.

==> The === operator forces comparison of values and type:

                      0 == "";        // true
                      1 == "1";       // true
                      1 == true;      // true

                      0 === "";       // false
                      1 === "1";      // false
                      1 === true;     // false

(10) Use Parameter Defaults
-------------------------------------------------------------------------------------
==> If a function is called with a missing argument, the value of the missing argument is set to undefined.
    Undefined values can break your code. It is a good habit to assign default values to arguments.

              function magdy(x, y){
                return x + y;
              }

              console.log(magdy(10)); // Return NaN

              ===========================

              function magdy(x, y) {
                if (y === undefined) {
                  y = 0;
                }
                return x + y;
              }

              console.log(magdy(10)); // Return 10

==> ECMAScript 2015 allows default parameters in the function call:
___________________________________________________________________

        function magdy(a = 1, b = 2){......}


(11) End Your Switches with Defaults
-------------------------------------------------------------------------------------------

        var x = 10;

        switch(x){
          case 0:
            console.log("0");
            break;

          case 10:
            console.log("10");
            break;

          default:
              console.log("No");
        }


(12) Avoid Using eval()
---------------------------------------------------------------------------------
==> The eval() function is used to run text as code. In almost all cases, it should not be necessary to use it.
    Because it allows arbitrary code to be run, it also represents a security problem.


*/


var x = 10;

switch(x){
  case 0:
    console.log("0");
    break;

  case 10:
    console.log("10");
    break;

  default:
      console.log("No");
}
