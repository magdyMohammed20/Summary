(1) Modules
-------------
==> App Contains Modules That Combined In The 'App Module'
==> At Least The App Contains The 'App Module' Which Called 'root module'

(2) Decorators
----------------
==> special function that adds behavior or metadata to a class, method, property, or parameter.

EX: @Module here is Decorators that add behavior to the class AppModule
-------

    @Module({
        imports: [],
        controllers: [AppController],
        providers: [AppService],
    })
    export class AppModule {}

(3) Decorators Types in nestjs
----------------
==> Class Decorator
==> Route Decorator
==> Parameter Decorator
==> Guard + Pipe + Interceptor Decorators
==> Validation Decorators (class-validator)



