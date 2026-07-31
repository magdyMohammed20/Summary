(1) guards
------------
==> a class annotated with the @Injectable() decorator, which implements the CanActivate interface.
==> guards return true or false to decide if request can moved to controller or not 
(like permissions, roles , ...) This is often referred to as authorization
==> Guards are executed after all middleware, but before any interceptor or pipe.

(2) guards VS middlewares
--------------------------
==> Middleware → runs before everything, doesn't know about NestJS context
==> Guard      → runs after middleware, knows about NestJS context (route, handler, roles)

(3) Nest execution order
--------------------------------

    Request
        ↓
    Middleware     → logging, cors, body parsing
        ↓
    Guard          → auth, roles, permissions
        ↓
    Interceptor    → transform request
        ↓
    Pipe           → validate input
        ↓
    Controller     → handle request
        ↓
    Interceptor    → transform response
        ↓
    Response