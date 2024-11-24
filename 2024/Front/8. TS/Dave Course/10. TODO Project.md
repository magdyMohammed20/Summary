(1) Create TS Project Using (npm create vite@latest)

(2) Create Model For TODO (src/model/listItem.ts)

    // Create Todo Interface
    interface ListItem{
        id: string,
        item: string,
        checked: boolean
    }

    // Create TODO Class
    export default class Todo implements ListItem {
        
        // Define TODO Constructor And Fields
        constructor(
            private _id: string = '',
            private _item: string = '',
            private _checked: boolean = false
        ) { }
        
        // ID Setter And Getter
        get id():string {
            return this._id
        } 
        set id(val: string) {
            this._id = val
        }

        // Item Setter And Getter
        get item(): string{
            return this._item
        }
        set item(val: string) { 
            this._item = val
        }

        // Checked Setter And Getter
        get checked():boolean {
            return this._checked
        }
        set checked(val: boolean) { 
            this._checked = val
        }
    }


(3) Create Model For TODO FullList (/src/model/fulllist.ts)

    import Todo from "./listItem"

    interface Todos {
        list: Todo[],
        loading(): void,
        save(): void,
        clearList(): void,
        addItem(item: Todo): void,
        removeItem(id : string) : void
    }
    export default class ListItems implements Todos {

        // Create List As Static As It We Have Only One List In The App
        static instance: ListItems = new ListItems();
        
        constructor(private _list : Todo[] = []) { }
        
        set list(val: Todo[]) {
            this._list = val
        }

        get list(): Todo[] { 
            return this._list
        }

        loading(): void {
            const storedList: string | null = localStorage.getItem('myList')
            
            if (typeof storedList !== 'string') return
            
            const parsedList: {_id : string , _item : string , _checked : boolean }[] = JSON.parse(storedList)
        
            parsedList.forEach(itemObject => {
                const newListItem = new Todo(itemObject._id ,itemObject._item , itemObject._checked)
                ListItems.instance.addItem(newListItem)
            })
        }

        save(): void {
            localStorage.setItem('myList' , JSON.stringify(this._list))
        }

        clearList(): void {
            this._list = []
            this.save()
        }

        addItem(item: Todo): void {
            this._list.push(item)
            this.save()
        }

        removeItem(id: string): void {
            this._list = this._list.filter(item => item.id !== id)
            this.save()
        }
    }


(4) Create List Template (templates/ListTemplate.ts)

import FullList from "../model/FullList"

interface DOMList {
    ul: HTMLUListElement,
    clear(): void,
    render(fullList: FullList): void,
}

export default class ListTemplate implements DOMList {

        ul: HTMLUListElement

        static instance: ListTemplate = new ListTemplate()

        private constructor() {
            this.ul = document.getElementById("listItems") as HTMLUListElement
        }

        clear(): void {
            this.ul.innerHTML = ''
        }

        render(fullList: FullList): void {
            this.clear()

            fullList.list.forEach(item => {
                const li = document.createElement("li") as HTMLLIElement
                li.className = "item"

                const check = document.createElement("input") as HTMLInputElement
                check.type = "checkbox"
                check.id = item.id
                check.checked = item.checked
                li.append(check)

                check.addEventListener('change', () => {
                    item.checked = !item.checked
                    fullList.save()
                })

                const label = document.createElement("label") as HTMLLabelElement
                label.htmlFor = item.id
                label.textContent = item.item
                li.append(label)

                const button = document.createElement("button") as HTMLButtonElement
                button.className = 'button'
                button.textContent = 'X'
                li.append(button)

                button.addEventListener('click', () => {
                    fullList.removeItem(item.id)
                    this.render(fullList)
                })

                this.ul.append(li)
            })
        }
    }


(5) In 'main.ts' Build The Required Html  (src/main.ts)

    import './css/style.css'
    import ListItems from './model/fulllist'
    import Todo from './model/listItem'
    import ListTemplate from './templates/listTemplate'

    const initApp = (): void => {
    const fullList = ListItems.instance
    const template = ListTemplate.instance

    // Add listener to new entry form submit
    const itemEntryForm = document.getElementById("itemEntryForm") as HTMLFormElement

    itemEntryForm.addEventListener("submit", (event: SubmitEvent): void => {
        event.preventDefault()

        // Get the new item value
        const input = document.getElementById("newItem") as HTMLInputElement
        const newEntryText: string = input.value.trim()
        if (!newEntryText.length) return

        // calculate item ID
        const itemId: number = fullList.list.length
        ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
        : 1

        // create new item
        const newItem = new Todo(itemId.toString(), newEntryText)
        // Add new item to full list
        fullList.addItem(newItem)
        // Re-render list with new item included
        template.render(fullList)
    })

    // Add listener to "Clear" button
    const clearItems = document.getElementById("clearItemsButton") as HTMLButtonElement

    clearItems.addEventListener('click', (): void => {
        fullList.clearList()
        template.clear()
    })

    // load initial data
    fullList.loading()
    // initial render of template
    template.render(fullList)
    }

    document.addEventListener("DOMContentLoaded", initApp) 


(6) Handle index.html

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>My List</title>
        <link rel="stylesheet" href="/src/css/style.css" />
        <script type="module" src="/src/main.ts" defer></script>
    </head>

    <body>
        <main>
        <h1 class="offscreen">My List</h1>

        <section class="newItemEntry">
            <h2 class="offscreen">New Item Entry</h2>
            <form class="newItemEntry__form" id="itemEntryForm">
            <label for="newItem" class="offscreen">Enter a new to do item</label>
            <input
                class="newItemEntry__input"
                id="newItem"
                type="text"
                maxlength="40"
                autocomplete="off"
                placeholder="Add item" />
            <button
                id="addItem"
                class="button newItemEntry__button"
                title="Add new item"
                aria-label="Add new item to list">
                +
            </button>
            </form>
        </section>

        <section class="listContainer">
            <header class="listTitle">
            <h2 id="listName">List</h2>
            <button
                id="clearItemsButton"
                class="button listTitle__button"
                title="Clear the list"
                aria-label="Remove all items from the list">
                Clear
            </button>
            </header>
            <hr />
            <ul id="listItems">
            <!-- <li class="item">
                        <input type="checkbox" id="1">
                        <label for="1">eat</label>
                        <button class="button">X</button>
                    </li>
                    <li class="item">
                        <input type="checkbox" id="2">
                        <label for="2">sleep</label>
                        <button class="button">X</button>
                    </li>
                    <li class="item">
                        <input type="checkbox" id="3">
                        <label for="3">code</label>
                        <button class="button">X</button>
                    </li> -->
            </ul>
        </section>
        </main>
    </body>
    </html>