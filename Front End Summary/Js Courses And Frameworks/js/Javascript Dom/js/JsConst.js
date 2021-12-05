/* JavaScript Const */

/*

(1) ES2015 intoduced two important new JavaScript keywords: let and const.
Variables defined with const behave like let variables, except they cannot be reassigned
-----------------------------------------------------------------------

            const x = 10;

            x = 100; // This Will Give An Error

            console.log(x);

(2) Block Scope
----------------------------------------------------------------------
==> Declaring a variable with const is similar to let when it comes to Block Scope.

==> The x declared in the block, in this example, is not the same as the x declared outside the block:
__________________________________________

          var x = 10;

          {
            const x = 20;
            console.log("X From Inside The Block = "+ x );    // Return 20
          }

            console.log("X From Outside The Block = "+ x ); // Return 10

(3) Assigned when Declared
---------------------------------------------------------------------
==> JavaScript const variables must be assigned a value when they are declared

          const x = 10; // This Is True

          =================
          const y; // This Is False

          y = 20;

(4) Not Real Constants
---------------------------------------------------------------------
==> The keyword const is a little misleading.
It does NOT define a constant value. It defines a constant reference to a value.
Because of this, we cannot change constant primitive values (القيمة الابتدائية), but we can change
the properties of constant objects.


(5) Constant Objects can Change
--------------------------------------------------------------------
==> You can change the properties of a constant object:

          const car = { carName  : "Fiat", carColor : "Red", carModel : "3000" };

          // Change Constant Object Properties
          car.carName = "BMW";

          console.log(car); // Return {carName: "BMW", carColor: "Red", carModel: "3000"}


          // Add Properties To Constant Object Properties
          car.carWeight = 3000;

          console.log(car); // Return {carName: "BMW", carColor: "Red", carModel: "3000", carWeight : 3000}


(6) But you can NOT reassign a constant object:
----------------------------------------------------------------------

          const car = {name : "BMW", color : "Red"};

          car = {name : "Nissan" , color : "Blue"}; // This Will Give An Error

(7) Constant Arrays can Change
-----------------------------------------------------------------------

          const car = [1,2,3,4,5];

          car[1] = 100;

          console.log(car); // Return [1, 100, 3, 4, 5]

          car.push(50);

          console.log(car); // Return [1, 100, 3, 4, 5 , 50]


(8) But you can NOT reassign a constant array:
-----------------------------------------------------------------------
        const car = [1,2,3,4,5];

        car = [10 , 20 , 30 , 40 , 50]; // This Will Give An Error


(9) Redeclaring
-----------------------------------------------------------------------

==> Redeclaring a JavaScript var variable is allowed anywhere in a program:
____________________________________

          var x = 10;
          x = 20;

==> Redeclaring or reassigning an existing var or let variable to const,
    in the same scope, or in the same block, is not allowed:
____________________________________

        var x = 10;

        const x = 100; // Return Identifier 'x' has already been declared

        =====================

        let x =10;

        const x = 20; // Return Identifier 'x' has already been declared


==> Redeclaring or reassigning an existing const variable, in the same scope
    or in the same block, is not allowed
____________________________________

        const x = 2;       // Allowed
        const x = 3;       // Not allowed
        x = 3;             // Not allowed
        var x = 3;         // Not allowed
        let x = 3;         // Not allowed

        {
        const x = 2;   // Allowed
        const x = 3;   // Not allowed
        x = 3;         // Not allowed
        var x = 3;     // Not allowed
        let x = 3;     // Not allowed
        }

==> Redeclaring a variable with const, in another scope, or in another block, is allowed:
____________________________________

        const x = 10;

        {
          const x = 20;
        }

        {
          const x = 30;
        }

(10) Hoisting
---------------------------------------------------------------------------
==> Variables defined with const are not hoisted to the top.

==> A const variable cannot be used before it is declared


*/

var x = 10 , y = 0;

function magdy(){
  return x / yz;
}

console.log(magdy());
