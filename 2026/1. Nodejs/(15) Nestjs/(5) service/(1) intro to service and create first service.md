(1) way to service
--------------------
==> Controllers should handle HTTP requests and delegate more complex tasks to providers
==> Providers are plain JavaScript classes declared as providers in a NestJS module

(2) service
--------------------
==> This service will handle data storage and retrieval. Because of its role in managing the application's logic, it’s an ideal candidate to be defined as a provider.

(3) generates first service
----------------------------
==> nest g service [name] (ex: nest g s users)
==> this command will create service and will update the module and by default assign the service file to the module folder