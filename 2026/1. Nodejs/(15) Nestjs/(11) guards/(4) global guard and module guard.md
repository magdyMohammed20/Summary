(1) make the guard global for all modules
--------------------------------------------
==> Global guards are used across the whole application, for every controller and every route handler.
==> In terms of dependency injection, global guards registered from outside of any 
module(with useGlobalGuards() as in the example above) cannot inject dependencies 
since this is done outside the context of any module.
==> create the guard normally (nest g gu guards/auth/auth)
==> import in main.ts

    main.ts
    ---------

    import { NestFactory } from '@nestjs/core';
    import { AppModule } from './app.module';
    import { AuthGuard } from './guards/auth/auth.guard'; // import 


    async function bootstrap() {
        const app = await NestFactory.create(AppModule);
        // here
        app.useGlobalGuards(new AuthGuard())
        await app.listen(3000);
    }
    bootstrap();

(2) make the guard local for a specific module
----------------------------------------------

    users.module.ts
    ------------

    import { AuthGuard } from 'src/guards/auth/auth.guard';
    import { APP_GUARD } from '@nestjs/core';
    @Module({
        providers: [
            {
                provide: APP_GUARD,
                useClass: AuthGuard
            }
        ]
    })