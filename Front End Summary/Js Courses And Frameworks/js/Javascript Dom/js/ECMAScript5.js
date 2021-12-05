/*
(1) ECMAScript 5 is also known as ES5 and ECMAScript 2009
    This chapter introduces some of the most important features of ES5.


(2) ECMAScript 5 Features
------------------------------------------------------------------------------------------

==> These were the new features released in 2009
__________________________
The "use strict" Directive
String.trim()
Array.isArray()
Array.forEach()
Array.map()
Array.filter()
Array.reduce()
Array.reduceRight()
Array.every()
Array.some()
Array.indexOf()
Array.lastIndexOf()
JSON.parse()
JSON.stringify()
Date.now()
Property Getters and Setters
New Object Property Methods

(3) ECMAScript 5 Syntactical Changes
-----------------------------------------------------------------------------------------
Property access [ ] on strings
Trailing commas in array and object literals
Multiline string literals
Reserved words as property names


(4) String.trim()
---------------------------------------------------------------------------------------
==>  removes whitespace from both sides of a string

        var x = "                                   Hellow World";

        console.log(x.trim()); // Return "Hellow World"

(5) Array.isArray()
--------------------------------------------------------------------------------------
==> Checks whether an object is an array.

        var x = ["Magdy", "Mohammed"];
        console.log(Array.isArray(x)); // Return true


(6) Array.forEach()
------------------------------------------------------------------------------------
==> calls a function once for each array element.

        function magdy(value){
          console.log(value);
        }
        var x = [1, 2, 3, 4];

        x.forEach(magdy); // Return 1 2 3 4

        ==================================
        var x = [1,2,3,4];

        x.forEach(function(value){
          console.log(value);
        });

(7) Array.map()
----------------------------------------------------------------------------------
==> creates a new array with the results of calling a provided function on every
    element in the calling array.

            var x = [1,2,3,4];

            var y = x.map(magdy); // Return 2 4 6 8

            function magdy(value){
              console.log(2 * value);
            }
            ====================================
            var x = [1,2,3,4];

            var y = x.map(function magdy(value){
              console.log(2 * value);
            }); // Return 2 4 6 8

(8) Array.filter()
------------------------------------------------------------------------------------
==> creates a new array with all elements that pass the test implemented
    by the provided function.

    var x = [10,20,23,27,30];

    function magdy(value){
      console.log(value % 2 == 0)
    }

    var y = x.filter(magdy); // Return true true false false true

    =============================================

    var x = [10,20,23,27,30];

    var y = x.filter(function magdy(value){
      console.log(value % 2 == 0)
    }); // Return true true false false true

(9) Array.reduce()
------------------------------------------------------------------------------------
==>  executes a reducer function (that you provide) on each member of the array
     resulting in a single output value.

     var x = [1,2,3,4,5];

     function magdy(total,value){
        return total + value;
     }

     var sum = x.reduce(magdy);

     console.log(sum); // Return 15

(10) Array.reduceRight()
-----------------------------------------------------------------------------------
==> The order for reduce is from left to right, and it's from right to left for reduceRight,

        var x = ["1","2","3","4","5"];

        function magdy(tot,val){
          return tot + val;
        }

        var sum = x.reduceRight(magdy);

        console.log(sum); // Return "54321"

(11) Array.every()
---------------------------------------------------------------------------------
==>  checks if all array values pass a test

          var x = [10, 13, 14, 16, 18, 19];

          function magdy(value){
            return value % 2 == 0;
          }

          var y = x.every(magdy);

          console.log(y); // Return false

          ===============================

          var x = [10, 14, 16, 18];

          function magdy(value){
            return value % 2 == 0;
          }

          var y = x.every(magdy);

          console.log(y); // Return true

(12) Array.some()
----------------------------------------------------------------------------------
==> checks if some values Pass The Test

          var x = [10, 14, 16, 18];

          function magdy(value){
            return value >= 18;
          }

          var y = x.some(magdy);

          console.log(y); // Return true
          =================================
          var x = [10, 14, 16, 18];

          function magdy(value){
            return value > 18;
          }

          var y = x.some(magdy);

          console.log(y); // Return False

(13) Array.indexOf()
---------------------------------------------------------------------------------
==> Search an array for an element value and returns its position.

          var x = [10, 14, 16, 18];

          var index = x.indexOf(14);

          console.log(index); // Return 1
          =============================
          var x = [10, 14, 16, 18];

          var index = x.indexOf(19);

          console.log(index); // Return -1

(14) Array.lastIndexOf()
---------------------------------------------------------------------------------
==> is the same as Array.indexOf(), but searches from the end of the array.

            var x = [10, 14, 16, 18, 14];

            var index = x.lastIndexOf(14);

            console.log(index); // Return 4

(15) JSON.parse() [The JavaScript function JSON.parse() is used to convert the text into a JavaScript object]
---------------------------------------------------------------------------------
==> A common use of JSON is to receive data from a web server.
Imagine you received this text string from a web server:
___________________________

            var x = '{"name":"Magdy", "salary":"10000", "age":"22"}';

            var obj = JSON.parse(x);

            console.log(obj.name); // Return magdy

(16) JSON.stringify()
--------------------------------------------------------------------------------
==> Use the JavaScript function JSON.stringify() to convert Object into a string.

            var x = {"Name":"Mohammed", "Age":20};

            var y = JSON.stringify(x);

            console.log(y); // Return '{"Name":"Mohammed","Age":20}'
            console.log(typeof y); // Return String

(17) Date.now()
---------------------------------------------------------------------------------
==> returns the number of milliseconds since zero date (January 1. 1970 00:00:00 UTC).
==> Date.now() returns the same as getTime() performed on a Date object.


        console.log(Date.now());

(18) Property Getters and Setters
---------------------------------------------------------------------------------
        var x = {
          fName : "Magdy",
          lName : "Mohammed",
          get fullName(){ return this.fName + " " + this.lName; }
        }

        //  Display data from the object using a getter
        console.log(x.fullName); // Return "Magdy Mohammed"
===============================================
          var x = {
            fName   : "Magdy",
            lName   : "Mohammed",
            language: "EN",
            get lang(){ return this.language; },
            set lang(value){ this.language = value; }
          }

          x.lang = "FR";

          console.log(x.lang); // Return Fr

(19) New Object Property Methods
------------------------------------------------------------------------------------
==> Object.defineProperty() is a new Object method in ES5.
It lets you define an object property and/or change a property's value and/or metadata.

            var x = {
              fName   : "Magdy",
              lName   : "Mohammed",
              language: "EN"
            }

            Object.defineProperty(x,"language",{
              value : "Fr",
              writable: true, // true if and only if the value associated with the property may be changed with an assignment operator. (Defaults to false.)
              enumerable: false, // true if and only if this property shows up during enumeration of the properties on the corresponding object.
              configurable: false // true if and only if the type of this property descriptor may be changed and if the property may be deleted from the corresponding object.

            });


            document.write(x.language); // return Fr


==>  is the same code, except it hides the language property from enumeration
------------------------------------------------------------------------------

              var x = {
                fName   : "Magdy",
                lName   : "Mohammed",
                language: "EN"
              }

              Object.defineProperty(x,"language",{
                value : "Fr",
                writable: true,
                enumerable: false,
                configurable: true

              });


              for(var y in x ){
                console.log(x[y]);  // Return "Magdy" , "Mohammed"
              }

(20) Property Access on Strings
--------------------------------------------------------------------------------------
==> The charAt() method returns the character at a specified index (position) in a string:

              var x = "Magdy";

              console.log(x.charAt(1)); // Return "a"

(21) ECMAScript 5 allows property acces on strings:
-----------------------------------------------------------------------------------------

              var x = "Hellow";

              console.log(x[2]); // Return "L"


(22) Trailing Commas
-----------------------------------------------------------------------------------------
==> ECMAScript 5 allows trailing commas in object and array definitions:

                var x = [1,2,3,];

                for(var y in x){
                  console.log(x[y]);  // Return 1,2,3
                }

(23) Strings Over Multiple Lines
----------------------------------------------------------------------------------------
                var x = "Hellow \
                World";

                console.log(x); // Return Hellow World


==> A safer way to break up a string literal, is to use string addition
__________________________

                var x = "Hellow " +
                "World";

                console.log(x); // Return Hellow World


(24) Reserved Words as Property Names
----------------------------------------------------------------------------------------
==> ECMAScript 5 allows reserved words as property names:

              var x = {fName:"Magdy", var:20};

              console.log(x.var);  // return 20
*/
