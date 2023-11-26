(1) Inferred Type : By Default TS Expect Variable Type From It's Value

    let username: string = 'magdy';
    username = 10 // Error : Type 'number' is not assignable to type 'string'


(2) Can Declare Variable Without Assign Value

    let username: string;
    username = 'magdy' 


(3) Declare With Type

    let songName: string = 'Bla';
    let songDisplayed: boolean = false;
    let sontTime: number = 4;
    let album: any = 1984;

    const sum = (a:number, b:number) => {
        return a + b
    }

(4) Multi Types

    const postId: string | number = 10
    const isActive:boolean | number = false

(5) Regex Type

    let reg:RegExp = /\w+/g