(1) Arrays

    let strArr:string[] = ['magdy' , 'ali']
    let arr: (string | number)[] = ['magdy', 10 , 20 , 'Hassan']

(2) Tuples

    // Tuples
    // Must Have 2 Values Only With Same Arrangement Of Types
    let tup:[string , number] = ['magdy'  , 10]

    tup = [10 , 'a'] // This Is Error


(3) Objects

    let obj: object;
    obj = {} // Normal
    obj = [] // Normal

    // object type Definition
    let obj2: { prop1: string, prop2: boolean };
    obj2 = {
        prop1: 'magdy',
        prop2 : true
    }

(4) Type Annotation

    type songsType = {
        name: string,
        active: boolean,
        album: (string | number)[]
    }

    let song: songsType = {
        name: 'First Song',
        active: false,
        album: [1501 , 'M&m']
    }

(5) Optional Property

    type songsType = {
        name: string,
        active?: boolean, // active here is optional
        album: (string | number)[]
    }

    let song: songsType = {
        name: 'First Song',
        album: [1501 , 'M&m']
    }

(6) Type Annotation With Function Parameter

    // type Annotation
    type songsType = {
        name: string,
        active?: boolean, // active here is optional
        album: (string | number)[]
    }

    const getAlbums = (albums: songsType[]) => {
        console.log(albums)
    }

    getAlbums([{name: 'Second' , active: true , album: [1023 , 'SD']}])


(7) Replace type annotation with interface

    // interface
    interface songType{
        name?: string,
        active: boolean,
        album: (number | string)[]
    }

    const getSong = (song: songType) => {
        // Put ? Here As name is optional
        console.log(song.name?.toUpperCase())
    }

    getSong({active: true , album: []})


(8) Enums

    // enums
    enum Grade{
        U = 1,
        A,
        B
    }

    console.log(Grade.U , Grade.A , Grade.B) // 1 2 3