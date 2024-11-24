/* JavaScript Use Strict */

/*

(1) "use strict"; Defines that JavaScript code should be executed in "strict mode".

(2) The "use strict" Directive
----------------------------------------------------------------
==> The "use strict" directive was new in ECMAScript version 5.

==> It is not a statement, but a literal expression, ignored by earlier versions of JavaScript.

==> The purpose of "use strict" is to indicate that the code should be executed in "strict mode".

==> With strict mode, you can not, for example, use undeclared variables.

==> All modern browsers support "use strict" except Internet Explorer 9 and lower

----------------------------------------------------------------------
Notes : 

You can use strict mode in all your programs. It helps you to write cleaner code, like preventing you from using undeclared variables.

"use strict" is just a string, so IE 9 will not throw an error even if it does not understand it.
----------------------------------------------------------------------

(3) Declaring Strict Mode
------------------------------------------------------------------------
==> Strict mode is declared by adding "use strict"; to the beginning of a script or a function.

        function hellow(){
    
            "use strict";
            x = 10;
            console.log(x); // Return ReferenceError: assignment to                              undeclared variable x
        }

        hellow();
        
        =========== Equal =============

        "use strict";
        function hellow(){

            x = 10;
            console.log(x); // Return ReferenceError: assignment to undeclared                          variable x
        }

(4) The "use strict"; Syntax
----------------------------------------------------------------------------
The syntax, for declaring strict mode, was designed to be compatible with older versions of JavaScript.

Compiling a numeric literal (4 + 5;) or a string literal ("John Doe";) in a JavaScript program has no side effects. It simply compiles to a non existing variable and dies.

So "use strict"; only matters to new compilers that "understand" the meaning of it.


(5) Why Strict Mode?
--------------------------------------------------------------------------
==> Strict mode makes it easier to write "secure" JavaScript.
==> Strict mode changes previously accepted "bad syntax" into real errors.
==> As an example, in normal JavaScript, mistyping a variable name creates a new global variable. In strict mode, this will throw an error, making it impossible to accidentally create a global variable.

==> In normal JavaScript, a developer will not receive any error feedback assigning values to non-writable properties. 

==> In strict mode, any assignment to a non-writable property, a getter-only property, a non-existing property, a non-existing variable, or a non-existing object, will throw an error.

(6) Not Allowed in Strict Mode
--------------------------------------------------------------------------
==> Using a variable, without declaring it, is not allowed
==> Using an object, without declaring it, is not allowed
==> Deleting a variable (or object) is not allowed.
____________________________
    
        "use strict";
        var x = 10;
        delete x; // Return Syntax Error
        
==> Deleting a function is not allowed.
___________________________

        "use strict";
        function x(){
            console.log("Hellow");
        }

        delete x;
        
==> Duplicating a parameter name is not allowed:
________________________________
        
        "use strict"; // Return SyntaxError: duplicate formal argument p1
        function x(p1,p1){
            console.log("Hellow");
        }
        
==> Octal numeric literals are not allowed:
________________________________

        "use strict"; 
        var x = 0101;
        console.log(x); // Return SyntaxError
        
==> Octal escape characters are not allowed:
_________________________________

       "use strict"; 
        var x = "\0101";
        console.log(x); // Return SyntaxError
        
==> Writing to a read-only property is not allowed

==> Writing to a get-only property is not allowed

==> Deleting an undeletable property is not allowed

==> The string "eval" cannot be used as a variable

==> The string "arguments" cannot be used as a variable

==> In function calls like f(), the this value was the global object. In strict mode, it is now undefined.

==>  Keywords reserved for future JavaScript versions can NOT be used as variable names in strict mode.

These are:
___________________________________

    implements
    interface
    let
    package
    private
    protected
    public
    static
    yield

*/


var eval = "Magdy";
