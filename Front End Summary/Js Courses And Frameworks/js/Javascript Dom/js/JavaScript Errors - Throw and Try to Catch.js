/* JavaScript Errors - Throw and Try to Catch */

/*

(1) The try statement lets you test a block of code for errors.

(2) The catch statement lets you handle the error

(3) The throw statement lets you create custom errors.

(4) The finally statement lets you execute code, after try and catch, regardless of the result.

----------------------------------------------------------------
Notes : You Can Ommit Catch Block Or Finally Block But You Can't Ommit
        Try Block (At Least You Should Put Try With Catch Or Try With Finally)
---------------------------------------------------------------

(5) Syntax
---------------------------------------------------------------
                try{
                    // Block Of Code To try
                }catch(err){
                    // Block Of Code To Handle Errors
                }
                
(6) JavaScript Throws Errors
----------------------------------------------------------------
==> When an error occurs, JavaScript will normally stop and generate an error message.
The technical term for this is: JavaScript will  throw an exception (throw an error).

(7) JavaScript will actually create an Error object with two properties: name and message.

(8) The throw Statement
---------------------------------------------------------------------

==> The exception can be a JavaScript String, a Number, a Boolean or an Object
________________________________________________

    throw "Magdy";
    throw 10;
     
==> Throw Custom Exception
_______________________________________________
    
        var x = 10;
        var y = 0;

        try{

            if(y==0) throw "0 For Y Not Allowed Sir!!";
            else{
                var z = x / y;
                console.log(z);
            }
        }catch(err){
            console.log(err);
        }

(9) HTML Validation
-----------------------------------------------------------------------
==> Modern browsers will often use a combination of JavaScript and built-in HTML validation, using predefined validation rules defined in HTML attributes

    
    <input id="demo" type="number" min="5" max="10" step="1" />

(10) The finally Statement
-----------------------------------------------------------------------
==> The finally statement lets you execute code, after try and catch, regardless of the result

                try{
                    // Block Of Code For test
                }catch(err){
                    // Block Of Code For Handle Errors
                }
                finally{
                    // Block of Code To be Exceuted regardless of the result
                }
                
(11) The Error Object
----------------------------------------------------------------------
==> JavaScript has a built in error object that provides error information when an error occurs.
The error object provides two useful properties: name and message.

==> Error Object Properties
__________________________________

name : Sets Or Return Error Name
Message : 	Sets or returns an error message (a string)

==> Error Name Values
__________________________________

{1} EvalError	An error has occurred in the eval() function
________________________

==> Newer versions of JavaScript does not throw any EvalError. Use SyntaxError instead.


{2} RangeError	A number "out of range" has occurred
________________________

==> is thrown if you use a number that is outside the range of legal values.

    var num = 1;
    try{
        num.toPrecision(500);
    }catch(err){
        console.log(err); // return RangeError: "precision 500 out of range"
    }

    
{3} ReferenceError	An illegal reference has occurred
_______________________
==> is thrown if you use (reference) a variable that has not been declared

    var x, y;

    try{
        x = y + 1;

    }catch(err){
        console.log(err.name);
    }

{4} SyntaxError	A syntax error has occurred
______________________

    try{
        var 10x;
    }catch(err){
        console.log(err.name);
    }


{5} TypeError	A type error has occurred
______________________
==> is thrown if you use a value that is outside the range of expected types

    try{
        var x = 1;
        x.toUpperCase();
    }catch(err){
        console.log(err.name);
    }

{6} URIError((Uniform Resource Identifier) An error in encodeURI() has occurred
_______________________
==> is thrown if you use illegal characters in a URI function

    try{
        decodeURI('%%%');
    }catch(err){
        console.log(err.name);
    }
*/