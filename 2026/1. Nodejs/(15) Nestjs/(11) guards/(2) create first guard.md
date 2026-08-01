(1) create first guard
------------------------
==> nest g gu [name] (EX: nest g gu auth)
==> nest g gu [file_path] (EX: nest g gu guards/auth/roles)
==> if need to create 'auth' guard inside 'guards' folder (nest g gu guards/auth)

    src/auth/auth.guards.ts
    ------------------------

    import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
    import { Observable } from 'rxjs';

    @Injectable()
    export class AuthGuard implements CanActivate {
        canActivate(
            context: ExecutionContext,
        ): boolean | Promise<boolean> | Observable<boolean> {
            const req = context.switchToHttp().getRequest();
            const customHeader = req.headers['x-custom-header'];

            // return true | false
            // request not completed without passing 'x-custom-header: allowed' in header for the '/users' endpoint
            return customHeader === 'allowed'
        }
    }

(2) Apply the guard to controller
-----------------------------------
==> inside any controller and before any route call 'UseGuards(guard_name)'
==> Now the data or request not completed without passing 'x-custom-header: allowed' in header for the '/users' endpoint

    users/users.controller.ts
    ------------------------    

    import { Controller, Get, UseGuards } from '@nestjs/common';
    import { UsersService } from './users.service';
    import { AuthGuard } from '../guards/auth/auth.guard';


    @Controller('users')
    export class UsersController {

        constructor(private readonly UsersService: UsersService) { }

        // Get all users
        @Get()
        @UseGuards(AuthGuard)
        getUsers() {
            return this.UsersService.getUsers();
        }

    }

(3) can use the guard for whole controller
--------------------------------------------

    @Controller('users')
    @UseGuards(AuthGuard) // use here
    export class UsersController {

        constructor(private readonly UsersService: UsersService) { }
    }