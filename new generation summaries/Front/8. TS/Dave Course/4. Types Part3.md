(1) Type Aliases

    type stringOrNum = string | number;
    type arrTypes = (stringOrNum)[];
    type stringOrNumArr = (string | number)[]


    let v1: stringOrNum = 'dd' // Valid
    let v2: stringOrNumArr = [1, 'dd'] // valid
    let v3:arrTypes = ['dd' , 1] // valid

    // interface can extend type
    interface types {
        name: string,
        active: boolean,
        albums: arrTypes
    }

    // extend interface
    const int: types = {
        name: '1045',
        active: true,
        albums: [10 , 'md']
    } 

(2) literal types

    let myName: 'magdy'

    let username: 'Dave' | 'hossam';

    myName = 'd' // invalid
    myName = 'magdy' // valid

    username = 'd' // invalid
    username = 'Dave' // valid


(3) Functions

    const sumFunc = (a: number, b: number):number => {
        return a + b
    }

    const logMsg = (msg: any): void => {
        console.log(msg)
    }

    console.log(sumFunc(10, 20))
    logMsg(sumFunc(20 , 10))


(4) Function As Type

    type mathFunc = (a: number, b: number) => number;

    const multiply : mathFunc = (a: number, b: number) => a*b


(5) interface with function type

    interface mathFun {
        (a: number, b: number): number,
        name: string
    }

    const multiply2: mathFun = (a: number, b: number) => a * b


(6) Optional Function Params

    // Optinal Func Params
    const add3 = (a: number, b: number, c?: number): number => {
        // Type Guard
        if (typeof c !== 'undefined') {
            return a + b + c
        }
        return a + b
    }

    console.log(add3(10,20))


(7) Function Rest Params

    let restParams = (...nums: number[]): number => {
        return nums.reduce((prev , curr) => prev + curr)
    }

    console.log(restParams(1,2,3,4))