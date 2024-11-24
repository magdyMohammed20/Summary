(1) Index Signature : a way to define the Shape of fields which are not known ahead of time

(2) Without Index Signature

    const transObj = {
        Pizza: -10,
        Books: 10,
        Jobs: 10
    }

    const prop1: string = 'Pizza'

    console.log(transObj[prop1]) // Error


(3) With Index Signature

    interface transactionObj{
        // Here Is Index Signature
        [index: string]: number
    }

    const transObj:transactionObj = {
        Pizza: -10,
        Books: 10,
        Jobs: 10
    }


    const prop1: string = 'Pizza'

    console.log(transObj[prop1]) // -10

(4) Read Only Index Signature

    // Read Only Here
    interface obj  {
        readonly [index: string]: number,
    }
    const transObj:obj = {
        Pizza : 10
    }

    transObj.Pizza = 20 // Error : Index signature in type 'obj' only permits reading

    transObj.apples = 10  // Error : Index signature in type 'obj' only permits reading


(5) Index Signature With UnExisted Object Element

    interface student{
        [key: string]: string | number | number[] | undefined

        name: string;
        age: number;
    }

    const firstStudent:student = {
        name: 'magdy',
        age: 25
    }


    console.log(firstStudent.test) // undefined


(6) Another Way Beside Index Signature 

    interface Student{
        name: string,
        GPA: number,
        classes: number[]
    }

    const student: Student = {
        name: 'magdy',
        GPA: 0.6,
        classes: [1,2,3]
    }

    for (const key in student) {

        console.log(student[key]) // Error :  No index signature with a parameter of type 'string' was found on type 'Student'

        // Use This
        console.log(student[key as keyof Student]) // Fix The Problem With Doing This

        // Or This
        console.log(student[key as keyof typeof student])
}

(7) Another Way

    interface Student{
        name: string,
        GPA: number,
        classes: number[]
    }

    const student: Student = {
        name: 'magdy',
        GPA: 0.6,
        classes: [1,2,3]
    }

    // key here Must Be name | GPA | classes
    const logKey = (student: Student, key: keyof Student) =>{
        console.log(key , student[key])
    }

    logKey(student , 'name') // name magdy
    logKey(student , 'name1') // Error : Argument of type '"name1"' is not assignable to parameter of type 'keyof Student'


(8) Record :  lets you create a new type from a Union

    // Sample 1
    type Incomes = 'salary' | 'bonus'

    type streams = Record<Incomes , {val: number}>

    const v: streams = {
        salary: {val: 20},
        bonus: {val : 1}
    }


    // Sample 2
    type Incomes = 'salary' | 'bonus'

    // Key Must Be One Of ('salary' | 'bonus') And Val Must Be Number
    type streams = Record<Incomes ,  number>

    const v: streams = {
        salary: 20,
        bonus: 1
    }

    // Sample 3
    type Incomes = 'salary' | 'bonus'

    // Key Must Be One Of ('salary' | 'bonus') And Val Must Be Number
    type streams = Record<Incomes ,  number>

    const v: streams = {
        salary: 20,
        bonus: 1
    }

    // Loop Here
    for (let x in v) {
        console.log(v[x as keyof streams])
    }

