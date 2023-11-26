(1) Genereics

    const isObj = <T>(arg: T): boolean => {
        return (!Array.isArray(arg) && typeof arg === 'object' && arg !== null)
    }

    console.log(isObj(true)) // false
    console.log(isObj('magdy')) // false
    console.log(isObj(10)) // false
    console.log(isObj([])) // false
    console.log(isObj({})) // true
    console.log(isObj({name: 'magdy'})) // true


(2) With Interface

    interface Student{name: string,age: number}

    const produceStudent = <T extends Student, K extends keyof T>(students: T[], key: K): T[K][] => {
        return students.map(stu => stu[key])
    }

    const students: Student[] = [{ name: 'magdy', age: 20 },{name: 'Dave' ,age : 25}] 

    console.log(produceStudent(students , 'name')) //  ['magdy', 'Dave']
