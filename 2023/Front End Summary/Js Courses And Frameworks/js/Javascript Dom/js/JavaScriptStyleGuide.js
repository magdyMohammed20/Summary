/* JavaScript Style Guide */
/*

(1) Always use the same coding conventions for all your JavaScript projects.

(2) JavaScript Coding Conventions
------------------------------------------------------------------------------------------------------

==> Coding conventions are style guidelines for programming. They typically cover:
_________________________________________

{1} Naming and declaration rules for variables and functions.
{2} Rules for the use of white space, indentation, and comments.
{3} Programming practices and principles

(3) Coding conventions secure quality:
------------------------------------------------------------------------------------------------------
==> Improves code readability
==> Make code maintenance easier


(4) Variable Names
-----------------------------------------------------------------------------------------------------
==> At W3schools we use camelCase for identifier names (variables and functions).
==> All names start with a letter.


(5) Spaces Around Operators
-----------------------------------------------------------------------------------------------------
==> Always put spaces around operators ( = + - * / ), and after commas

(6) Code Indentation
-----------------------------------------------------------------------------------------------------
==> Always use 4 spaces for indentation of code blocks
==> Do not use tabs (tabulators) for indentation. Different editors interpret tabs differently.


(7) Statement Rules
-----------------------------------------------------------------------------------------------------
==> Always end a simple statement with a semicolon.


(8) General rules for complex (compound) statements:
-----------------------------------------------------------------------------------------------------

==> Put the opening bracket at the end of the first line And Use one space before the opening bracket.
_________________________________________________

          function magdy() {
              .......
          }

==> Put the closing bracket on a new line, without leading spaces.

==> Do not end a complex statement with a semicolon. (Function)


(9) Object Rules
-----------------------------------------------------------------------------------------------------

==> Place the opening bracket on the same line as the object name.
==> Use colon plus one space between each property and its value.
==> Use quotes around string values, not around numeric values
==> Do not add a comma after the last property-value pair.
==> Place the closing bracket on a new line, without leading spaces.
==> Always end an object definition with a semicolon.


            var obj = {
                name: "Magdy",
                age: 20,
                address: "Cairo"
            };

==> Short objects can be written compressed, on one line, using spaces only between properties, like this
_________________________________________________

            var obj = {name:"Magdy", age:20, address:"Cairo"};


(10) Line Length < 80
--------------------------------------------------------------------------------------------------------
==> For readability, avoid lines longer than 80 characters.
==> If a JavaScript statement does not fit on one line, the best place to break it,
    is after an operator or a comma


        var x = document.getElementById("Magdy").innerHTML =
                "Hellow World";


(11) Naming Conventions
-------------------------------------------------------------------------------------------

==> Always use the same naming convention for all your code. For example:
_________________________________________
{1} Variable and function names written as camelCase
{2} Global variables written in UPPERCASE (We don't, but it's quite common)
{3} Constants (like PI) written in UPPERCASE
{4} Should you use hyp-hens, camelCase, or under_scores in variable names?
___________________________
--> This is a question programmers often discuss. The answer depends on who you ask:
    Hyphens in HTML and CSS:
    HTML5 attributes can start with data- (data-quantity, data-price).
    CSS uses hyphens in property-names (font-size).

--> Hyphens can be mistaken as subtraction attempts. Hyphens are not allowed in JavaScript names.

{5} Underscores
___________________________
--> Many programmers prefer to use underscores (date_of_birth), especially in SQL databases.
--> Underscores are often used in PHP documentation.

{6} PascalCase
___________________________
-->  is often preferred by C programmers.

{7} camelCase:
___________________________
--> camelCase is used by JavaScript itself, by jQuery, and other JavaScript libraries.

-------------------------------------------------------------------------------------------------
Notes : Do not start names with a $ sign. It will put you in conflict with many JavaScript library names.
-------------------------------------------------------------------------------------------------

(12) Loading JavaScript in HTML
------------------------------------------------------------------------------------------------------
==> Use simple syntax for loading external scripts (the type attribute is not necessary)

          <script src="magdy.js"></script>

(13) Accessing HTML Elements
-----------------------------------------------------------------------------------------------------
==> A consequence of using "untidy" HTML styles, might result in JavaScript errors.

==> These two JavaScript statements will produce different results:
_________________________________________

            var x = document.getElementById("demo");

            var y = document.getElementById("Demo");

(14) File Extensions
----------------------------------------------------------------------------------------------------
==> HTML files should have a .html extension (not .htm).
    CSS files should have a .css extension.
    JavaScript files should have a .js extension.

(15) Use Lower Case File Names
--------------------------------------------------------------------------------------------------
==> Most web servers (Apache, Unix) are case sensitive about file names
==> Other web servers (Microsoft, IIS) are not case sensitive
==> If you use a mix of upper and lower case, you have to be extremely consistent.
==> If you move from a case insensitive, to a case sensitive server, even small errors can break your web site.
==> To avoid these problems, always use lower case file names (if possible)


(16) Performance
------------------------------------------------------------------------------------------------
==> Coding conventions are not used by computers. Most rules have little impact on the execution of programs.
    Indentation and extra spaces are not significant in small scripts.
    For code in development, readability should be preferred. Larger production scripts should be minified.


*/

var x-r;
