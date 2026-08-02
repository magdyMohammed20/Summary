(1) pipes work time
--------------------
==> works after middlewares and guards and before exception filters and route handlers.
==> exception filters works after route handlers.
==> Pipes run inside the exceptions filters zone. This means that when a Pipe throws an exception it is handled by the exceptions layer 


(2) pipes
---------
==> pipe is a class annotated with the @Injectable() decorator, which implements the PipeTransform interface.

(3) what pipes are used for or use cases
-----------------------------------------
==> transformation: transform input data to the desired form (e.g., from string to integer)
==> validation: evaluate input data and if valid, simply pass it through unchanged; otherwise, throw an exception
