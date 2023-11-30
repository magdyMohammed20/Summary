https://betterprogramming.pub/when-to-use-bind-call-and-apply-in-javascript-1ae9d7fa66d5

(1) Diff Between bind & apply & call
----------------------------------------

let obj = { num: 10 };

////////////////// Call /////////////////////////
// call : invokes a function with a specified context. In other words, you can tie a function into an object as if it belonged to the object.
function add(a) {
    return this.num + a
}
console.log(add.call(obj, 20)) // 30


// call: can accept Multi params
function addMulti(a, b) {
    return this.num + a + b;
}
console.log(addMulti.call(obj, 10, 50)) // 70


///////////////// Apply /////////////////////
// apply : does the exact same as call(). The difference is that call() accepts an argument list, but apply() accepts an array of arguments.
function addApply(a) {
    return this.num + a
}
console.log(addApply.apply(obj, [5])) // 15

// Apply Add Multi
function addMultiApply(a , b , c) {
    return this.num + a + b + c
}
console.log(addMultiApply.apply(obj, [5, 10, 40])) // 65



////////////////// Bind ///////////////////////////////////
// Bind : The bind() method is reminiscent of call() and apply(). But instead of executing a function immediately, bind() returns a function that can be executed later on.

function addBind(a) {
    return this.num + a
}

let funcBind = addBind.bind(obj, 20);

console.log(funcBind()) // 30


(2) When Use call()
-----------------------
    
==> Use Call() to Chain Object Constructors
---------------------------------------------
    
EX
----

    function Item(name, price) {
        this.name = name;
        this.price = price;
        this.desc = `name: ${name} - Price: ${price}`
    }

    function Car(name, price) {
        Item.call(this , name , price)
    }

    function Fruit(name, price) {
        Item.call(this , name , price)
    }

    const bm = new Car('x6', '3M')
    const apple = new Fruit('Apple', '30EGP')

    console.log(apple) // { name: 'Apple',price: '30EGP',desc: 'name: Apple - Price: 30EGP' }
    console.log(bm) // { name: 'x6', price: '3M', desc: 'name: x6 - Price: 3M' }
    

==> Use Call() to Invoke an Anonymous Function
-------------------------------------------------