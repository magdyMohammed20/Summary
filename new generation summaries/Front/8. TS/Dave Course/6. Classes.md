(1) Classes

    class Coder {
        constructor(
            public readonly name: string,
            public music: string,
            private age: number,
            protected lang: string = 'TS'
        ) {
            this.name = name;
            this.music = music;
            this.age = age;
            this.lang = lang
        }

        getAge() {
            return this.age + ' ' + this.lang
        }
    }

    const ins = new Coder('magdy' , 'GAZ' ,20 , 'JS')

    console.log(ins.getAge()) // 20 JS
    console.log(ins.lang) // Error As Protected
    console.log(ins.age) // Error As Private


(2) Class Inheritance

    class Coder {
        constructor(
            public readonly name: string,
            public music: string,
            private age: number,
            protected lang: string = 'TS'
        ) {
            this.name = name;
            this.music = music;
            this.age = age;
            this.lang = lang
        }

        getAge() {
            return this.age + ' ' + this.lang
        }
    }

    class WebDev extends Coder{
        constructor(
            public computer: string,
            name: string,
            music: string,
            age: number
        ) {
            super(name, music, age)   
            this.computer = computer
        }

        getLang() {
            return this.lang
        }
    }

    const comp = new WebDev('DELL', 'G15', 'RAP', 20)

    console.log(comp.getLang()) // TS


(3) Class Implements Interface

    interface Guitirians {
        name: string,
        instrument: string,
        play(action:string):string
    }

    class Gutirian implements Guitirians{

        constructor(
            public name: string,
            public instrument: string,
        ) {}

        play(action: string): string{
            return `${this.name} ${action} ${this.instrument}`
        }
    }

    const guit = new Gutirian('magdy', 'Guitar')

    console.log(guit.play('Playing'))


(4) Static Class Props

    class Peeps{
        static counter: number = 0
        public id: number;
        constructor(public name:string) {
            this.name = name;
            this.id = ++Peeps.counter
        }
    }

    const john = new Peeps('John')
    const john2 = new Peeps('John2')
    const john3 = new Peeps('John3')

    console.log(Peeps.counter, john.id) // 3 1
    console.log(Peeps.counter, john2.id) // 3 2
    console.log(Peeps.counter , john3.id) // 3 3


(5) Setter And Getter

    class setterAndGetter{
        public dataState: string[];

        constructor() {
            this.dataState = []
        }

        public get data(): string[]{
            return this.dataState
        }

        public set data(value: string[]) {
            if (Array.isArray(value) && value.every(el => typeof el == 'string')) {
                this.dataState = value
                return
            }else throw new Error('Params Is Not An Array Of Strings')
        }
    }

    const setAndGet = new setterAndGetter()

    // Set The Data Here
    setAndGet.data = ['foo', 'bar']
    setAndGet.data = [...setAndGet.data , 'foo2', 'bar2']
    console.log(setAndGet.data) // ['foo', 'bar', 'foo2', 'bar2']