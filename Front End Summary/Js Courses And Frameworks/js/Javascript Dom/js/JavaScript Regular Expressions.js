/* JavaScript Regular Expressions

(1) A regular expression is a sequence of characters that forms a search           pattern.
    The search pattern can be used for text search and text replace operations. 

(1) Syntax
-------------------------------------------------------------------------

    /pattern/modifiers; 
    
(2) Using String Methods
----------------------------------------------------------------------
==> regular expressions are often used with the two string methods: search() and replace().

(3) Using String search() With a String
-----------------------------------------------------------------------------
==> The search() method searches a string for a specified value and returns the position of the match

        var str = "Hellow Magdy In Js And C#";

        var x = str.search("Magdy"); 

        console.log(x); // Return 7
        
        
(4) Using String search() With a Regular Expression
-------------------------------------------------------------------------

    var str = "Hellow Magdy In Js And C#";

    var x = str.search(/magdy/i); 

    console.log(x); // Return 7
    
(5) Use String replace() With a Regular Expression
-------------------------------------------------------------------------
==> The replace() method replaces a specified value with another value in a string

        var str = "Hellow Magdy In Js And C#";

        var x = str.replace(/js/i,"css");

        console.log(x); // Return Hellow Magdy In css And C#
        
(6) Regular Expression Modifiers
----------------------------------------------------------------------
==> can be used to perform case-insensitive more global searches

{1} i : Perform case-insensitive matching

{2} g : Perform a global match (find all matches rather than stopping after           the first match)
___________________________________

    var str = "Hellow Magdy In Js And C# And Js And Js";

    var x = str.match(/Js/g);

    console.log(x); // Return [ "Js", "Js", "Js"]
    
{3} m : Perform multiline matching

(7) Regular Expression Patterns
----------------------------------------------------------------------

{1} Brackets : are used to find a range of characters
_______________________________________________
  
    var str = "Hellow Magdy In Js And C# And Js And Js\n Bla Bla Js";

    var x = str.match(/[abc]/g);

    console.log(x); // Return [ "a", "a", "a" ]
    
    
    var str = "Hellow Magdy10 In Js And C# And Js And Js\n Bla Bla Js";

    var x = str.match(/[0-9]/g);

    console.log(x); // Return [ "1","0" ]
    
    
    var str = "Hellow Magdy10 In Js And C And Js And";

    var x = str.match(/(Js|C)/g);

    console.log(x); // Return [ "Js", "C", "Js" ]
    
{2} Metacharacters  : characters with a special meaning
_______________________________________________________

==> \d : Find A Digit

==> \s : Find Whitespace

==> \b : Find a match at the beginning or at the end of a word

==> \uXXX : Find the Unicode character specified by the hexadecimal number xxxx
_____________________________

        var str = "Visit W3Schools. Hello World!"; 
        var patt1 = /\u0057/g;
        var result = str.match(patt1);
        console.log(result) // Return ["W","W"]
        
{3} Quantifiers : define quantities
___________________________

==> n+ : Matches any string that contains at least one n
___________________________

        var x = "Hellow Man And Js World Here";
        var m = x.match(/H+/g);

        console.log(m); // Return ["H","H"]
        
==> n* : Matches any string that contains zero or more occurrences of n       _______________________________ 

    var x = "Hellow Man And H Js World Here";
    var m = x.match(/(He*)/g); // e Is Optional

    console.log(m); // Return ["He","H","He"]

==> n? : Matches any string that contains zero or one occurrences of n
______________________________
    
    var x = "Hellow1 Man10 And100 H Js World Here";
    var m = x.match(/10?/g); // 0 Is Optional

    console.log(m); // Return [ "1", "10", "10" ]
    
    
(8) Using the RegExp Object
-----------------------------------------------------------------------------

==> the RegExp object is a regular expression object with predefined             properties and methods

==> Using test() :  is a RegExp expression method. It searches a string for a                     pattern, and returns true or false, depending on the                         result.
____________________

        var pattern = /e/;
        var str = "Hellow Men In Our e";

        var res = pattern.test(str);

        console.log(res); // Return True
        
==> Using exec() :  is a RegExp expression method. It searches a string for a                     specified pattern, and returns the found text.
                    If no match is found, it returns null.
____________________

        var pattern = /e/;
        var str = "Hellow Men In Our e";

        var res = pattern.exec(str);

        console.log(res); // Return [ "e" ]
*/

