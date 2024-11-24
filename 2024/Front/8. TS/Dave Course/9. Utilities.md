(1) 'Partial' Utility Types

    interface Assignment{
        name: string,
        age: number,
        clas: number,
        grade: number
    }

    // propsToUpdate : Contains Some Of Assignment Interface properties Or Contains Nothing Of Assignment Interface Properties
    const updateAssignment = (assign: Assignment, propsToUpdate: Partial<Assignment>) : Assignment =>{
        return {...assign , ...propsToUpdate}
    }

    const assign1:Assignment = {
        name: 'magdy',
        age: 20,
        clas: 1,
        grade: 0
    }

    console.log(updateAssignment(assign1, {grade : 20 })) // {name: 'magdy', age: 20, clas: 1, grade: 20}

(2) Required 

    interface Assignment{
        name: string,
        lastname: string
    }

    // Mark With required here
    const recordAssign = (assign: Required<Assignment>): Assignment => {
        return assign
    }

    const userRecord:Assignment = {
        name: 'magdy',
        lastname :'mohammed'
    } 

    // Error Here As all interface types is required
    console.log(recordAssign({
        name: 'magdy'
    } ))


(3) Readonly

    interface Assignment{
        name: string,
        lastname: string
    }

    const userAssign: Readonly<Assignment> = {
        name: 'magdy',
        lastname: 'mohammed'
    }

    // Error : Cannot assign to 'name' because it is a read-only property
    userAssign.name = 'Hossam'


(4) Mix Between type & interface

    type Students = 'Sara' | 'Ali' | 'Hossam'

    interface Grades{
        assign1: number,
        assign2: number
    }

    const exam: Record<Students, Grades> = {
        'Sara': { assign1: 10, assign2: 20 },
        'Ali': { assign1: 10, assign2: 20 },
        'Hossam': {assign1: 10 , assign2  :20}
    }


(5) Pick

    interface Student {
        studentId: number,
        grade: string,
        class: (string | number)[]
    }

    // Create New Type From 'Student' Which Will Contains 'studentId' And 'grade' Only
    type AssRes = Pick<Student, "studentId" | "grade">


    const assignResult: AssRes = {
        studentId: 10,
        grade: 'A+',
        a : 10 // Error : As 'assignResult' Must Contains 'studentId' And 'grade' Only
    } 


(6) Omit

    interface Student {
        studentId: number,
        grade: string,
        class: (string | number)[]
    }

    // Copy All From Student Interface Except "class" And "grade"
    type AssRes = Omit<Student, "class" | "grade">

    const assignRes: AssRes = {
        studentId : 10,
        grade : 'C' // Error
    } 


(7) Exclude And Extract

    type x = 'A' | 'B' | 'C'

    type adGrade = Exclude<x, "B">
    const v1: adGrade = 'A' // valid
    const v2: adGrade = 'B' // invalid

    type adGrade2 = Extract<x, "B">
    const v3: adGrade2 = 'B' // valide
    const v4: adGrade2 = 'A' // invalid


(8) NonNullable


    type AllPosibles = 'Dave' | null | undefined;

    // Copy Types From 'AllPosibles' But Except types That Equal To Null
    type NewTypes = NonNullable<AllPosibles>

    let a: NewTypes = 'Dave' // Valid
    let b: NewTypes = null // Error : Type 'null' is not assignable to type '"Dave"'


(9) ReturnType

    // Problem : Without Return Type
    // Problem Here If We Change 'createNewMission' Types Must Change 'pointsTypes'
    type pointsTypes = { title: string, points: number }

    const createNewMission = (title : string , points : number):pointsTypes => {
        return {title , points}
    }


    // Solution
    const createNewMission = (title : string , points : number) => {
        return {title , points}
    }

    type newMission = ReturnType<typeof createNewMission>
 
    const tsAssign:newMission = createNewMission("Utility" , 10)


(10) Parameters

    const createNewMission = (title : string , points : number) => {
        return {title , points}
    }

    type newMission = Parameters<typeof createNewMission>
    type newMission2 = ReturnType<typeof createNewMission>

    const assignArgs: newMission = ['Title', 10]

    const tsAssign: newMission2 = createNewMission(...assignArgs)

    console.log(tsAssign) // {title: 'Title', points: 10}


(11) API Call With ReturnType

    interface User{
        id: number,
        name: string,
        email: string
    }

    const fetchUsers = async (): Promise<User[]> => {
        const data = await fetch(`https://jsonplaceholder.typicode.com/users`).then(res => {
            return res.json()
        })

        return data
    }

    type fetchUsersReturnType = Awaited<ReturnType<typeof fetchUsers>>


    fetchUsers().then((users) => console.log(users))