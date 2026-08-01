(1) generate the custom decorator for roles
---------------------------------------------
==> nest g d decorators/roles 

    decorators/roles/roles.decorator.ts
    -------------------------------------

    import { SetMetadata } from '@nestjs/common';

    export const Roles = (...args: string[]) => SetMetadata('roles', args);

(2) use the roles decorator in the controller
---------------------------------------------


    users/users.controller.ts
    -------------------------

    import { AuthGuard } from '../guards/auth/auth.guard';
    import { Roles } from 'src/decorators/roles/roles.decorator'; // import the decorator

    @Controller('users')
    @UseGuards(AuthGuard)
    @Roles('user', 'manager') // use the decorator // this is wrong place it must moved above the route function inside the controller

(3) multiple guards in the controller
---------------------------------------------

    import { AuthGuard } from '../guards/auth/auth.guard';
    import { Roles } from 'src/decorators/roles/roles.decorator';
    import { RolesGuard } from 'src/guards/auth/roles/roles.guard';

    @Controller('users')
    @UseGuards(AuthGuard, RolesGuard) // here we are using multiple guards
    @Roles('user', 'manager')
    export class UsersController {}

(4) full roles guard implementation
---------------------------------------------

    guarads/auth/roles/roles.guard.ts
    ---------------------------------------------

    import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
    import { Reflector } from '@nestjs/core';

    @Injectable()
    export class RolesGuard implements CanActivate {
        constructor(private reflector: Reflector) { }

        canActivate(context: ExecutionContext): boolean {
            // check if the route has the @Roles decorator
            // 'roles' is the key we used in the Roles decorator setMetadata function
            const requiredRoles: string[] = this.reflector.get('roles', context.getHandler());

            // if the route doesn't have the @Roles decorator, allow access
            if (!requiredRoles || requiredRoles.length === 0) {
                return true;
            }

            const request = context.switchToHttp().getRequest();
            const user = request.user;

            if (!user || !user.role) {
                return false;
            }

            // normalize user.role to an array regardless of whether it's a string or array
            const userRoles: string[] = Array.isArray(user.role) ? user.role : [user.role];

            // allow access if the user has at least one of the required roles
            return requiredRoles.some((role) => userRoles.includes(role));
        }
    }


    users/users.controller.ts
    -------------------------

    import { Controller, Get, UseGuards } from '@nestjs/common';
    import { UsersService } from './users.service';
    import { AuthGuard } from '../guards/auth/auth.guard';
    import { Roles } from 'src/decorators/roles/roles.decorator';
    import { RolesGuard } from 'src/guards/auth/roles/roles.guard';

    @Controller('users')
    @UseGuards(AuthGuard, RolesGuard)

    export class UsersController {

        constructor(private readonly UsersService: UsersService) { }

        @Get()
        // Note : role of user comes from the passed user object from the auth middleware, which is added to the request object
        @Roles('user', 'manager') // specify the roles that can access this route
        getUsers() {
            console.log('From Controller', this.UsersService.getUsers())
            return this.UsersService.getUsers();
        }

    }