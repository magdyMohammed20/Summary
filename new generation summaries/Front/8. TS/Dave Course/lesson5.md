(1) Type Assertion

    type A = string;
    type B = string | number;
    type C = 'hello'


    const v11 = 'hi' as A; 

    const v12: A = 'hello'
    let v13 = v12 as C

    let v14 = <A>'magdy';
    let v15 = <B>10;
    let v16 = <C> 'dd'

    console.log(v14 , v15 , v16) // magdy 10 dd


(2) Assertion Usage

    // Type Assertion Uses To Fix Conflict Between Expected Returned type
    const addOrConcat = (a: number, b: number, c: 'add' | 'concat'): string | number =>{
        if (c == 'add') {
            return a + b;
        }
        return '' + a + b;
    }

    // Here We Specified add To Be Number But addOrConcat Return String Or Number
    // So Will Use Type Assertion To Fix This Problem (as number)
    const add:number = addOrConcat(10 , 20 , 'add') as number
    console.log(add)

    // Too Here
    const printYear: string = addOrConcat(20, 10, 'concat') as string;


(3) Assertion With HTML Elements

    // Use ! Here For Ensure That Image Already Exists And Not Equal (null)
    const img = document.querySelector('img')! as HTMLImageElement;
    const myImage = document.getElementById('#img')! as HTMLImageElement;

    console.log(img.src)
    console.log(myImage.src)


(4) Another Assertion with html elements

    const img = <HTMLImageElement> document.querySelector('img')!;
    const myImage = <HTMLImageElement> document.getElementById('#img')!;

    console.log(img.src)
    console.log(myImage.src)