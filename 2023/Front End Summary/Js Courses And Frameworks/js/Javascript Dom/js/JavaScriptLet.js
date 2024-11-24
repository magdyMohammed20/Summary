/* JavaScript Let */

/*

(1) ES2015 introduced two important new JavaScript keywords: let and const.

(2) These two keywords provide Block Scope variables (and constants) in JavaScript.

(3) Before ES2015, JavaScript had only two types of scope: Global Scope and Function Scope. 

(4) Global Scope
-----------------------------------------------------------------------
==> Variables declared Globally (outside any function) have Global Scope.

        var x;

        function magdy(){
            x = 10;
            console.log(x);
        }

(5) Function Scope
-----------------------------------------------------------------------
==> Variables declared Locally (inside a function) have Function Scope.

        function magdy(){
            var x = 10;
            console.log(x);
        }
        
(6) JavaScript Block Scope
----------------------------------------------------------------------
==> Variables declared with the var keyword can not have Block Scope.
==> Variables declared inside a block {} can be accessed from outside the block.

        {
            var x = 10;
        }

        console.log(x); // Return 10


(7) Variables declared with the let keyword can have Block Scope.
-----------------------------------------------------------------
==> Variables declared inside a block {} can not be accessed from outside the block:

        {
            let x = 10;
        }

        console.log(x); // Return x is Not Defined

(8) Redeclaring Variables
----------------------------------------------------------------
==> Redeclaring a variable using the var keyword can impose problems.

==> Redeclaring a variable inside a block will also redeclare the variable outside the block:

        var x = 10;

        {
            var x = 30;
        }

        console.log(x); // Return 30
        
        
==> Redeclaring a variable using the let keyword can solve this problem.
____________________________________

--> Redeclaring a variable inside a block will not redeclare the variable outside the block:

        var x = 10;

        {
            let x = 2; // In This Block X = 2
            console.log("x in Block Scope = "+x);
        }

        console.log("x Outside Scope = "+x); // Here X = 10
        
(9) Browser Support
--------------------------------------------------------------------
==> The let keyword is not fully supported in Internet Explorer 11 or earlier.


(10) Loop Scope
-------------------------------------------------------------------
        
        var i = 5;
        for (var i = 0; i < 10; i++) {
            // some statements
        }
        // Here i is 10
        
        =================
        
        let i = 5;
        for (let i = 0; i < 10; i++) {
            // some statements
        }
        // Here i is 5
        

(11) Function Scope
-------------------------------------------------------------------
==> Variables declared with var and let are quite similar when declared inside a function.
They will both have Function Scope

        function myFunction() {
            var carName = "Volvo";   // Function Scope
        }
        
        ========================
        
        function myFunction() {
            let carName = "Volvo";   // Function Scope
        }
        
(12) Global Scope
-----------------------------------------------------------------
==> Variables declared with var and let are quite similar when declared outside a block.
They will both have Global Scope:

        var x = 10;
        
        let y = 20;
        
        
(13) Global Variables in HTML
------------------------------------------------------------------
==> With JavaScript, the global scope is the JavaScript environment.
In HTML, the global scope is the window object.
Global variables defined with the var keyword belong to the window object

        var x = 10;

        document.write(window.x); // Return 10
        
        
==> Global variables defined with the let keyword do not belong to the window object:
____________________________________________

        let x = 10;

        document.write(window.x); // Return undefined
        
(14) Redeclaring
------------------------------------------------------------------------

==> Redeclaring a JavaScript variable with var is allowed anywhere in a program:
_________________________________
    
        var x = 10;
        
        var x = 20;
        
==> Redeclaring a var variable with let, in the same scope, or in the same block, is not allowed:
_________________________________
    
    var x = 10;

    {
        let x = 13;
        let x = 20;  // Return Identifier 'x' has already been declared
    }
    
    =============
    
    var x = 10;

    let x = 2;   // Return Identifier 'x' has already been declared
    
    ============
    
    var x = 10;

    {
        let x = 13;
        var x = 20;   // Return Identifier 'x' has already been declared
    }
    

==> Redeclaring a variable with let, in another scope, or in another block, is allowed:
_________________________________

    var x = 10;   // Allowed

    {
        let x = 13; // Allowed
    }

    {
        let x = 20; // Allowed
    }
    
    
(15) Hoisting
-------------------------------------------------------------------------
==> Variables defined with var are hoisted to the top

        x = 10;

        console.log(x);

        var x;
        
==> Variables defined with let are not hoisted to the top
_______________________________
--> Using a let variable before it is declared will result in a ReferenceError.
The variable is in a "temporal dead zone" from the start of the block until it is declared

        x = 10;

        console.log(x);

        let x; // Return Uncaught ReferenceError: x is not defined
*/

x = 10;

console.log(x);

let x; // Return Uncaught ReferenceError: x is not defined