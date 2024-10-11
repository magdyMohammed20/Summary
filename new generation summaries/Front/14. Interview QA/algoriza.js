1 - cohersion
2 - Vuejs Teleport
3 - UseEffect Can Be Async 



/* var x = 1;

function test() {
  console.log(x);

  var x = 2;
}

test();
 */

/* const obj = {
    name: "abc",
    arrow: () => {
        console.log(this.name)
    },
    func: function(){
        console.log(this.name)
    }
}


obj.arrow();
obj.func() */

//console.log(1 + "2" - 3);

console.log(1);

setTimeout(() => {
  console.log(2);
}, 1000);

setTimeout(() => {
  console.log(3);
}, 0);

console.log(4);
