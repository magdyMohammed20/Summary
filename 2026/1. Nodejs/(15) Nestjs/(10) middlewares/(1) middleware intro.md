(1) middleware
----------------
==> function which is called before the route handler. 
==> Middleware functions have access to the request and response objects, 
and the next() middleware function in the application’s request-response cycle. 
The next middleware function is commonly denoted by a variable named next.
==> Middleware executed in sequence one after another 

(2) Middleware functions can perform the following tasks:
---------------------------------------------------------
==> execute any code.
==> make changes to the request and the response objects.
==> end the request-response cycle.
==> call the next middleware function in the stack.
==> if the current middleware function does not end the request-response cycle, 
it must call next() to pass control to the next middleware function. Otherwise, 
the request will be left hanging.

(3) middleware use cases
------------------------
==> logging : recording requests and responses details
==> authorization : checking if the authenticated user has permission to perform certain action
==> authentication : verifying user credentials before allowing access to protected routes
==> error handling : caturing the handling errors that occur during request processing
==> request parsing: parsing and validating request data before passing it to app logic