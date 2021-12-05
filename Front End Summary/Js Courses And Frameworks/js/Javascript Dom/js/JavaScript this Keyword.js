/* The JavaScript this Keyword */

/*

(1) What is this?
-------------------------------------------------------------------------
==> The JavaScript this keyword refers to the object it belongs to

==> This has different values depending on where it is used.
______________________________

{1} In a method, this refers to the owner object.
{2} Alone, this refers to the global object.
{3} In a function, this refers to the global object.
{4} In a function, in strict mode, this is undefined.
{5} In an event, this refers to the element that received the event.
{6} Methods like call(), and apply() can refer this to any object.


(2) this in a Method
-----------------------------------------------------------------------
    
        var obj = {
            firstName : "Magdy",
            lastName  : "Mohammed",
            fullName  : function() {
                        return this.firstName +" "+this.lastName;
                } 
            }

            console.log(obj.fullName()); // Return "Magdy Mohammed"

(3) this Alone (In a browser window the Global object is [object Window]:)
-----------------------------------------------------------------------

        var x = this; // Return Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …}
        

(4)  In strict mode, when used alone, this also refers to the Global object [object Window]:
-----------------------------------------------------------

        "use strict";
        console.log(this); // Return Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …}
        

(5) this in a Function (Default)
----------------------------------------------------------------------
        
        function magdy(){
            return this;
        }

        console.log(magdy()); // Return Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …}
        
(6) this in a Function (Strict)
---------------------------------------------------------------------
==> JavaScript strict mode does not allow default binding.
So, when used in a function, in strict mode, this is undefined.

        function magdy(){
            "use strict";
            return this;
        }

        console.log(magdy()); // Return undefined
        
(7) this in Event Handlers
----------------------------------------------------------------------
==> In HTML event handlers, this refers to the HTML element that received the event

        <nav onclick="this.style.background='red'"></nav>
        
(8) Object Method Binding
----------------------------------------------------------------------        
        var o = {
            fName : "magdy",
            fullName : function(){ return this; }
        }

        console.log(o.fullName()); // Return {fName: "magdy", fullName: ƒ}
        
(9) Explicit Function Binding
----------------------------------------------------------------------
==> The call() and apply() methods are predefined JavaScript methods
    They can both be used to call an object method with another object as argument.
    
        
            var fuName = {
                fullName : function(){ return this.fName + " " + this.lName; }
            }

            var fuName2 = {
                fName : "magdy",
                lName : "mohammed"
            }

            console.log(fuName.fullName.call(fuName2)); // Return "magdy mohammed"
*/