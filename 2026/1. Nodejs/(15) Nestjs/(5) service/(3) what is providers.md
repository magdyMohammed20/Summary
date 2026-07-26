(1) providers
---------------
==> classes that can be injected as dependencies anywhere in your app.
==> Any class decorated with @Injectable() is a provider
==> responsible for creating and managing the instances of a classes

    @Controller('users')
    export class UsersController {

        // NestJS automatically creates and injects UsersService here
        constructor(private readonly usersService: UsersService) {}

        @Get()
        getUsers() {
            return this.usersService.getUsers(); // use it directly
        }
    }


(2) about providers
-------------------
==> Dependency injection : to manage dependencies between parts of the app , providers are entities that can be injected into other classes or modules
==> singleton by default : there is only one instance of each provider within same module context this ensures that same instance of a service is reused throughout the app.
==> scope control : nestjs provides mechanism for controling the scope of providers 
==> injectable decorator: when mark a class with '@Injectable()' decorator it becomes a provider and can be injected into other classes or modules

(3) providers types
--------------------
==> service providers
==> Repository providers
==> Factory providers
==> Value providers
==> Class Providers