- anonymous function

- Closures are created whenever a variable that is defined outside the current scope is accessed from within some inner scope. It gives you access to an outer function’s scope from an inner function. In JavaScript, closures are created every time a function is created. To use a closure, simply define a function inside another function and expose it.

- Strict Mode

## (1) ReactJs Life Cycle

==> Mounting : component is being inserted into the DOM
==> Update : occurs whenever a component's state or props change
==> unMounting : occurs when a component is being removed from the DOM.

## (2) Redux VS Context API

Choose the Context API when:

---

- You have a small to medium-sized application with relatively simple state management needs.
- You want to avoid prop drilling within a specific part of your application.
- You prefer a simpler setup and don't need advanced features like middleware or time-travel debugging.

Choose Redux when:

---

- You have a larger application with complex state management requirements.
- You need to manage global state that is accessed and updated by various parts of your application.
- You require advanced features like middleware for handling asynchronous operations or need the flexibility of time-travel debugging.
