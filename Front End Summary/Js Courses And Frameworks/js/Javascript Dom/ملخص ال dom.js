/*

(1) getElementById('id')
(2) getElementsByTagName('tagName')
(3) getElementsByTagName('tagName').length
(4) getElementsByClassName('className')
(5) getElementsByClassName('className').length
(6) querySelectorAll('Any Selector')
(9) querySelectorAll('Any Selector').length

--------------------------------------------------
        Object Collection (Part 1)

(1) document.title
(2) document.images[0].src
(3) document.images[0].alt
(4) document.images.length
(5) document.forms.length
(6) document.forms[0].inputName.value
(7) document.forms[0].inputName.type

--------------------------------------------------
        Object Collection (Part 2)

(1) document.body
(2) document.body.innerText
(3) document.body.innerHTML
(4) document.anchors
(5) document.anchors.length
(6) document.anchors[0].className
(7) document.links
(8) document.links.length
(9) document.links[0].className

--------------------------------------------------

        Get And Set Element Content
[innerText , outerText , innerHTML , outerHTML , textContent]

(1) document.getElementById('IdName').innerHTML
(2) document.getElementById('IdName').innerHTML = "<a href="#">Text With tags</a>"
(3) document.getElementById('IdName').textContent
(4) document.getElementById('IdName').textContent = "Pure Text Without Tags"

--------------------------------------------------

        Set And Get Attribute Value (part 1)

(1) document.querySelector('div').id;
(2) document.querySelector('div').id = "hellow-Js";
(3) document.querySelector('div').className;
(4) document.querySelector('div').className = "Hellow";
(5) document.querySelector('form').fName.type
(6) document.querySelector('form').fName.type = "password"

------------------------------------------------

        Set And Get Attribute Value (part 2) [getAttribute , setAttribute]

(1) document.querySelector('div').getAttribute('AttributeName')
(2) document.querySelector('div').setAttribute('AttributeName',"NewValue");

------------------------------------------------

        hasAttribute() , removeAttribute()

(1) document.querySelector('div').hasAttribute('AttributeName');
(2) document.querySelector('div').removeAttribute('AttributeName');

------------------------------------------------

    classList (Item , contains , length)


(1) console.log(x.classList);
(2) console.log(x.classList[1]);
(3) console.log(x.classList.length);
(4) console.log(x.classList.item(2))
(5) console.log(x.classList.contains('magdy'))

------------------------------------------------

    classList (Add, Remove , Toggle)

(1) document.querySelector('section').classList.add('NewClassName');
(2) doucment.querySelector('section').classList.add('NewClass1', 'NewClass2');
(3) document.querySelector('section').classList.remove('ExistingClassName');
(4) document.querySelector('section').classList.remove('ExistingClassName1', 'ExistingClassName2');
(5) document.querySelector('section').classList.toggle('NewClassOrExistingClass');

------------------------------------------------

    Element Children , childNodes

(1) document.getElementById('magdy').childElementCount
(2) document.getElementById('magdy').children
(3) document.getElementById('magdy').children[0]
(4) document.getElementById('magdy').children.length
(5) document.getElementById('magdy').childNodes
(6) document.getElementById('magdy').childNodes[1]
(7) document.getElementById('magdy').childNodes.length

-------------------------------------------------

    firstChild , lastChild , firstElementChild , lastElementChild

(1) document.getElementById('magdy').firstChild
(2) document.getElementById('magdy').lastChild
(3) document.getElementById('magdy').firstElementChild
(4) document.getElementById('magdy').lastElementChild

-------------------------------------------------

            appendChild

            // Access parent

            var parent = document.getElementById('magdy');

            // Create New Element

            var newElement = document.createElement('div');

            // Create Text Node

            var text = document.createTextNode("hellow this Words from js");

            // Add text Node

            newElement.appendChild(text);

            // append

            parent.appendChild(newElement);

---------------------------------------------------

            insertBefore


            // Access parent

            var parent = document.getElementById('magdy');

            // Create New Element

            var newElement = document.createElement('div');

            // append

            parent.insertBefore(newElement, parent.lastElementChild);

---------------------------------------------------

            removeChild(ElementIndex Or Element)


            var x = document.querySelector('div');

            var span = document.querySelector('span');

            // Remove With index
            x.removeChild(x.childNodes[1]);

            // Remove With Element
            x.removeChild(span)

--------------------------------------------------

        Node[Name , Value , Type]

// console.log(x.nodeName); // Element , Comment , Text

// console.log(x.tagName);

// console.log(x.nodeValue) // Must Select TextNode

// console.log(x.nodeType)  // Element = 1 , Comment = 8 , Text = 3 , Attribute

--------------------------------------------------

        Element Clone ( cloneNode() = cloneNode(false) , cloneNode(true) )

var sourceText = document.getElementById('source').firstChild.cloneNode(true);

var destination = document.getElementById('destination');

destination.appendChild(sourceText);

--------------------------------------------------

        parentNode , parentElement

var ul = document.querySelector('ul').parentNode; // Used With All Browsers

var ul2 = document.querySelector('ul').parentElement; // used For IE

console.log(ul);

console.log(ul2);

-------------------------------------------------

        nextSibling , nextElementSibling , previousSibling , previousElementSibling


var ul = document.querySelector('ul').nextSibling; // Select Text , Comment , Element

var ul2 = document.querySelector('ul').nextElementSibling; // Select Element Only

var ul3 = document.querySelector('ul').previousSibling; // Select Text , Comment , Element

var ul4 = document.querySelector('ul').previousElementSibling; // Select Element Only

-------------------------------------------------

        focus() , blur()

        var x = document.forms[0].txt;
        var y = document.forms[0].pass;
        x.onclick = function(){

            'use strict';

            x.blur();   // Remove Focus
            y.focus();  // Add Focus

        };
-------------------------------------------------

        click()

        var div = document.getElementById('click'),
            btn = document.querySelector('button');

        btn.onclick = function(){
            console.log(div.innerText);
        };

        window.onload = function(){

            setTimeout(function(){
                btn.click();
            },4000);

        };

------------------------------------------------

        addEventListener()

        var div = document.getElementById('click'),
            btn = document.getElementById('btn1'),
            btn2 = document.getElementById('btn2');

        btn.onclick = function(){
            console.log(div.innerText);
        };


        btn2.onclick = function(){

            btn.addEventListener('click',function(){
                div.style.display = 'none';
            });

        };

------------------------------------------------

        contains()

        var section = document.querySelector('section'),
            span = section.children[2];

        if(section.contains(span)){
            console.log("Span Is Founded OK");
        }

----------------------------------------------

        clientHeight , clientWidth

var x = document.querySelector('section');

console.log(x.clientHeight); // Visible Area Height + padding

console.log(x.clientWidth);  // Visible Area Width + padding

---------------------------------------------

        scrollHeight , scrollWidth


var parent = document.getElementById('parent');

console.log(parent.scrollHeight); // Visible Area + Overflow Area + Padding
console.log(parent.scrollWidth)

--------------------------------------------

        offsetHeight , offsetWidth

var div = document.querySelector('div');

console.log(div.offsetHeight); // Area + Border + Padding + scroll

console.log(div.offsetWidth); // Area + Border + Padding + scroll

--------------------------------------------

        clientLeft , clinetTop

    var x = document.getElementById('magdy');

    console.log(x.clientLeft);  // Calculate The Width Of Left border Only Or You Can Calculate
                                    ScrollBar + Border If I Give overflow : scroll , direction
                                    rtl For The Element

    console.log(x.clientTop);   // Calculate The Width Of Top border Only

-------------------------------------------

        Element Style

(1) First Way
--------------------------

        var myDiv = document.getElementById('st');

        myDiv.style.width   = '200px';
        myDiv.style.height  = '200px';

(2) Second Way
--------------------------

        var myDiv = document.getElementById('st');

        myDiv.style.cssText = 'width : 200px; height : 200px; background-color: green'

(3) Third Way
--------------------------

var myDiv = document.getElementById('st');

Object.assign(myDiv.style,{width : '200px', height : '200px', backgroundColor : 'red'})

(4) Fourth Way
-------------------------

var myDiv = document.getElementById('st');

myDiv.setAttribute('style','width : 200px; height: 200px; background-color : green');

------------------------------------

        Document Properties

(1) document.inputEncoding
---------------------------

        console.log(document.inputEncoding); // UTF-8

(2) document.lastModified
---------------------------

        console.log(document.lastModified); // Date And Time

(3) document.URL
---------------------------

        console.log(document.URL);

----------------------------------

        createElement , createTextNode , createComment

var myDiv = document.getElementById('st');


// Create The New Element
var newElement = document.createElement('article');

// Create TextNode
var textNode = document.createTextNode('This Is Simple Article');

// Create Comment
var comment = document.createComment('This Is Article');


// Append Text To NewElement
newElement.appendChild(textNode);

// Append Comment To NewElement
newElement.appendChild(comment);

// Append NewElement To Div
myDiv.appendChild(newElement);

-----------------------------------

        createAttribute , removeAttribute


var myDiv = document.getElementById('st');


document.querySelector('button').onclick = function(){

    'use strict';

    var newAttr = document.createAttribute('class');

    newAttr.value = 'Here-js';

    myDiv.setAttributeNode(newAttr);


};

document.getElementById('r').onclick = function(){
     myDiv.removeAttribute('class');
};

---------------------------------

        How To Use Event

(1) First Way
--------------

        <button onclick="magdy()"></button>

        function magdy(){
            alert('Hellow There');
        }

(2) Second Way
--------------

        var myDiv = document.getElementById('st');


        myDiv.onclick = function(){
            alert('Hellow Me');
        };

(3) Third Way
--------------

        var myDiv = document.getElementById('st');


        myDiv.onclick = magdy;

        function magdy(){
            alert('Hellow Me');
        }

------------------------------------

        onload , onscroll , onresize

(1) onload
-----------

        window.onload = function(){
           alert('Hellow')
        };

(2) onscroll
------------

        document.body.onscroll = function(){
            console.log(Math.floor(document.documentElement.scrollTop));
        };

(3) onresize
------------

        window.onresize = function(){
            console.log(this.innerWidth);
        };

------------------------------------

        onfocus,onblur,onsubmit

var input = document.forms[0];

document.forms[0].fName.onfocus = function(){
    this.setAttribute('placeholder','Enter Your Name Here');
};

document.forms[0].fName.onblur = function(){
    this.removeAttribute('placeholder');
};

input.onsubmit = function(e){
    e.preventDefault();
};

------------------------------------

        onclick, ondblclick , onmouseenter , onmouseleave , oncontextmenu

var text='';

var myDiv = document.getElementById('my');

myDiv.onclick = function(){text = 'Click'; myDiv.textContent = text};

myDiv.ondblclick = function(){text = 'dbl Click'; myDiv.textContent = text};

myDiv.oncontextmenu = function(e){e.preventDefault()};

myDiv.onmouseenter = function(){text = 'Hover'; myDiv.textContent = text};

myDiv.onmouseleave = function(){text = 'You Leave'; myDiv.textContent = text}

--------------------------------------------------------------

  onKeyDown , onKeyPress , onKeyUp

(1) onkeyup [تحدث عندما ارفع صباعي من علي زراير الكيبورد ]
------------------------------

        var input = document.forms[0].pass;

        input.onkeyup = function(){
            this.nextElementSibling.focus();
        };

(2) onkeypress [تحدث لما ادوس علي الزرار علي طول يعني مش بتستنا اني ارفع صباعي من الكيبورد]
--------------------------------

        var input = document.forms[0].pass;

        input.onkeypress = function(){
            this.nextElementSibling.focus();
        };

(3) onkeydown
----------------------------------

        var div = document.querySelector('div');

        var input = document.forms[0].pass;

        input.onkeydown = function(){

            div.textContent = input.value;
        };

*/
