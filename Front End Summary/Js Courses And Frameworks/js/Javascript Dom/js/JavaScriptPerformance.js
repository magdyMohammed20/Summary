/*

(1) How to speed up your JavaScript code.

(2) Reduce Activity in Loops
-------------------------------------------------------------------------------------
==> Each statement in a loop, including the for statement, is executed for each iteration of the loop.
Statements or assignments that can be placed outside the loop will make the loop run faster.

BAD :
_______

    for(var x = 1; x<= arr.length; x++){.....}

Better :
________

      var x,
          l = arr.length;

      for(x = 0; x<=l; x++){........}

(3) Reduce DOM Access
-------------------------------------------------------------------------------------
==> Accessing the HTML DOM is very slow, compared to other JavaScript statements.
If you expect to access a DOM element several times, access it once, and use it as a local variable

          var x = document.getElementById("Magdy");
          x.innerHTML = "Hellow";


(4) Reduce DOM Size
--------------------------------------------------------------------------------------
==> Keep the number of elements in the HTML DOM small
==> This will always improve page loading, and speed up rendering (page display), especially on smaller devices.
Every attempt to search the DOM (like getElementsByTagName) will benefit from a smaller DOM.


(5) Avoid Unnecessary Variables
-------------------------------------------------------------------------------------
==> Don't create new variables if you don't plan to save values.
Often you can replace code like this


BAD:
________

          var fullName = firstName + " " + lastName;
          document.getElementById("demo").innerHTML = fullName;

Better:
_______

          document.getElementById("demo").innerHTML = firstName + " " + lastName;


(6) Delay JavaScript Loading
-------------------------------------------------------------------------------------
==> Putting your scripts at the bottom of the page body lets the browser load the page first.

==> While a script is downloading, the browser will not start any other downloads.
    In addition all parsing and rendering activity might be blocked.

==> The HTTP specification defines that browsers should not download more than two components in parallel.

==> An alternative is to use defer="true" in the script tag. The defer attribute specifies that the
    script should be executed after the page has finished parsing, but it only works for external scripts.

==> If possible, you can add your script to the page by code, after the page has loaded:
_________________________________________________

          <script>
          window.onload = function() {
            var element = document.createElement("script");
            element.src = "myScript.js";
            document.body.appendChild(element);
          };
          </script>


(7) Avoid Using with
-------------------------------------------------------------------------------------
==> Avoid using the with keyword. It has a negative effect on speed. It also clutters up JavaScript scopes.
The with keyword is not allowed in strict mode.

*/
