/*
(1) Accidentally Using the Assignment Operator
---------------------------------------------------------------------------------------
==> JavaScript programs may generate unexpected results if a programmer accidentally
    uses an assignment operator (=), instead of a comparison operator (==) in an if statement.

-----------------------------------------------------------------
Notes : An assignment always returns the value of the assignment.
-----------------------------------------------------------------

(2) Expecting Loose Comparison
--------------------------------------------------------------------------------------

==> In regular comparison, data type does not matter. This if statement returns true
__________________________________________
              var x = 10,
                  y = "10";

              if(x == y) {
                console.log("X Equal Y"); // Return X Equal Y
              }
              else{
                console.log("X Not Equal Y");
              }

==> In strict comparison, data type does matter. This if statement returns false:
__________________________________________

              var x = 10,
                  y = "10";

              if(x === y) {
                console.log("X Equal Y");
              }
              else{
                console.log("X Not Equal Y"); // Return X Not Equal Y
              }


==> It is a common mistake to forget that switch statements use strict comparison
__________________________________________

            switch(num){
              case "10":
                console.log("String");
                break;

              case 10:
                  console.log("Num");  // Return "Num"
                  break;

              default:
                    console.log("Hellow");
                    break;
            }

(3) Confusing Addition & Concatenation
------------------------------------------------------------------------------------------
==> Addition is about adding numbers.
    Concatenation is about adding strings.
    In JavaScript both operations use the same + operator.
    Because of this, adding a number as a number will produce
    a different result from adding a number as a string


(4) Misunderstanding Floats
-----------------------------------------------------------------------------------------
==> All numbers in JavaScript are stored as 64-bits Floating point numbers (Floats).

              var x = 0.1;
              var y = 0.2;
              var z = (x * 10 + y *10) / 10;
              document.write(z); // Return 0.3

              ======================

              var x = 0.1;
              var y = 0.2;
              console.log(x + y); // return 0.30000000000000004


(5) Breaking a JavaScript String
----------------------------------------------------------------------------------------
==> JavaScript will allow you to break a statement into two lines:
__________________________________________

              document.getElementById("Magdy").InnerHTNL =
              "Hellow world";

==> But, breaking a statement in the middle of a string will not work:
__________________________________________

              document.getElementById("c").innerHTML = "Hellow
              World";  // Return SyntaxError

==> You must use a "backslash" if you must break a statement in a string:
__________________________________________

              console.log("Hellow \
              World"); // Return "Hellow World"

(6) Misplacing Semicolon
----------------------------------------------------------------------------------------

==> Because of a misplaced semicolon, this code block will execute regardless of the value of x
__________________________________________

              var x = 10;

              if(x == 11); {
                console.log("Hellow"); // Return "Hellow"
              }


(7) Breaking a Return Statement
------------------------------------------------------------------------------------------

==> It is a default JavaScript behavior to close a statement automatically at the end of a line.
    Because of this, these two examples will return the same result:
__________________________________________

              var x = 10;
              console.log(x);

            ======================

              var x = 10
              console.log(x)

            ======================
            ==> JavaScript will also allow you to break a statement into two lines.
                Because of this, This example will also return the same result

                var
                x = 10;
                console.log(x);

==> But, what will happen if you break the return statement in two lines like this:
__________________________________________

              function magdy(){
                return
                "Hellow";
              }

              console.log(magdy()); // Return undefined


--------------------------------------------------------------------
Notes : This 2 Codes Are Equal (As Js Think That return Is Lonely [Complete Statement])

            function magdy(){
              return
              "Hellow";
            }

            console.log(magdy()); // Return undefined

            ========================

            function magdy(){
              return;
              "Hellow";
            }

            console.log(magdy()); // Return undefined

Notes : Never break a return statement.
------------------------------------------------------------------

(8) Accessing Arrays with Named Indexes
--------------------------------------------------------------------------------------------------
==> Many programming languages support arrays with named indexes.
    Arrays with named indexes are called associative arrays (or hashes).
    JavaScript does not support arrays with named indexes.
    In JavaScript, arrays use numbered indexes


==> In JavaScript, objects use named indexes.
    If you use a named index, when accessing an array, JavaScript will redefine the array to a standard object.
    After the automatic redefinition, array methods and properties will produce undefined or incorrect results
__________________________________________

            var p = [];

            p.fName = "Magdy";
            p.lName = "Mohammed";

            console.log(p.length); // Return 0
            console.log(p[0]); // Return undefined


(9) Ending Definitions with a Comma
---------------------------------------------------------------------------------------------
==> Trailing commas in object and array definition are legal in ECMAScript 5.

          var x = {fName : "Magdy",lName:"Mohammed",};

          var y = [1,2,3,4,];

-------------------------------------------------
Notes :

WARNING !!

Internet Explorer 8 will crash.

JSON does not allow trailing commas.

-------------------------------------------------

(10) Undefined is Not Null
------------------------------------------------------------------------------------------

==> JavaScript objects, variables, properties, and methods can be undefined.
==> In addition, empty JavaScript objects can have the value null.

==> This can make it a little bit difficult to test if an object is empty.
You can test if an object exists by testing if the type is undefined
__________________________________________

        console.log(typeof o === "undefined"); // Return true

==> But you cannot test if an object is null, because this will throw an error if the object is undefined:
__________________________________________

          var x;

          if(x===null){
            console.log("NULL");
          }

==> Because of this, you must test for not undefined before you can test for not null:
__________________________________________

      if (typeof myObj !== "undefined" && myObj !== null)


(11) Expecting Block Level Scope
-----------------------------------------------------------------------------------------
==> JavaScript does not create a new scope for each code block.
It is true in many programming languages, but not true in JavaScript.
This code will display the value of i (10), even OUTSIDE the for loop block

        for(var i = 1; i<=10; i++){

        }
        console.log(i); // Return 10
*/


for(var i = 1; i<=10; i++){

}
console.log(i); // Return 10
