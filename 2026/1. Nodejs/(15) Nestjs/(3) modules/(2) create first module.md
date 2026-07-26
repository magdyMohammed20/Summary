(1) Module considered as container for 'controller' and 'provider' and other modules

(2) when annotate class as module we tell the typescript that this class is a nestjs module

(3) syntax of @module decorator
--------------------------------
==> @Module({
        imports: [],
        controllers: [],
        providers: [],
        exports: [],
    })

(4) create first module
--------------------------
==> in terminal run command (nest generate mo) or (nest g mo users)
==> then type the module name 'users' and will note 'users.module.ts' file created in 'users' folder and imported in the 'app.module.ts' file By default

==> but it's not mandatory to import all modules in the 'app.module.ts' file