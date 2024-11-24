/* JavaScript Scope */

/*

(1) Scope determines the accessibility (visibility) of variables.

(2) JavaScript Function Scope
------------------------------------------------------------------------

==> In JavaScript there are two types of scope:
__________________________________
{1} Local scope
{2} Global scope

(3) Variables defined inside a function are not accessible (visible) from outside the function. 

(4) Local JavaScript Variables
--------------------------------------------------------------------------
==> Variables declared within a JavaScript function, become LOCAL to the function.

==> Local variables have Function scope: They can only be accessed from within the function.

    function hellow(){
        var x = "Magdy";
        console.log(x); // This Is true Access
    }

    console.log(x); // This Is Wrong Access (Error)

(5) Since local variables are only recognized inside their functions, variables with the same name can be used in different functions.

(6) Local variables are created when a function starts, and deleted when the function is completed.

(7) Global JavaScript Variables
---------------------------------------------------------------------------
==> A variable declared outside a function, becomes GLOBAL.
==> A global variable has global scope: All scripts and functions on a web page can access it. 

            var carName;
            function hellow(){
                carName = "BMW";
                console.log(carName);
            }

            hellow();

(8) Automatically Global
----------------------------------------------------------------------------
==> If you assign a value to a variable that has not been declared, it will automatically become a GLOBAL variable

        function say(){
            carName = "Magdy";
        }

        say(); // You Must Call The Function First To Declare variable
        
        document.write(carName); // Here variable Become Global 
        

(9) Strict Mode
---------------------------------------------------------------------------
==> All modern browsers support running JavaScript in "Strict Mode".
==> Global variables are not created automatically in "Strict Mode".

(10) Global Variables in HTML
-------------------------------------------------------------------------
==> With JavaScript, the global scope is the complete JavaScript environment.
In HTML, the global scope is the window object. All global variables belong to the window object.
    
        var carName = "volvo";
        document.write(window.carName); // Here variable Become Global
        
(10) The Lifetime of JavaScript Variables
-------------------------------------------------------------------------
The lifetime of a JavaScript variable starts when it is declared.

Local variables are deleted when the function is completed.

In a web browser, global variables are deleted when you close the browser window (or tab), but remain available to new pages loaded into the same window.        

(11) Function Arguments
------------------------------------------------------------------------
Function arguments (parameters) work as local variables inside functions.
*/

  
