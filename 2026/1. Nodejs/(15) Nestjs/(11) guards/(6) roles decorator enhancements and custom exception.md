(1) roles decorator enhancements
---------------------------------
==> create SystemsRoles enum
==> replace args type with fixed enum in roles.decorator.ts
==> set the specified roles in the controller method using the new enum
==> add SystemsRoles enum for roles.guard.ts

    interfaces/roles.enum.ts
    ---------------------------

    export enum SystemsRoles {
        admin = 'admin',
        manager = 'manager',
        user = 'user'
    }


    decorators/roles/roles.decorator.ts
    -----------------------------------

    import { SetMetadata } from '@nestjs/common';
    import { SystemsRoles } from 'src/interfaces/roles.enum';

    export const Roles = (...args: SystemsRoles[]) => SetMetadata('roles', args);

    users/users.controller.ts
    ---------------------------

    import { SystemsRoles } from 'src/interfaces/roles.enum';


    export class UsersController {

        @Get()
        @Roles(SystemsRoles.admin, SystemsRoles.manager) // here
        getUsers() {
            console.log('From Controller', this.UsersService.getUsers())
            return this.UsersService.getUsers();
        }
    }


    guards/auth/roles/roles.guard.ts
    ----------------------------------

    import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
    import { Reflector } from '@nestjs/core';
    import { SystemsRoles } from 'src/interfaces/roles.enum';

    @Injectable()
    export class RolesGuard implements CanActivate {
        constructor(private reflector: Reflector) { }

        canActivate(context: ExecutionContext): boolean {
            // here
            const requiredRoles: SystemsRoles[] = this.reflector.get('roles', context.getHandler());

            if (!requiredRoles || requiredRoles.length === 0) {
                return true;
            }

            const request = context.switchToHttp().getRequest();
            const user = request.user;

            if (!user || !user.role) {
                return false;
            }

            // here
            const userRoles: SystemsRoles[] = Array.isArray(user.role) ? user.role : [user.role];

            return requiredRoles.some((role) => userRoles.includes(role));
        }
    }


(2) create custom exception if user data not passed to guard from middleware
-----------------------------------------------------------------------------

    exceptions/ForbiddenException.ts
    ---------------------------------

    import { HttpException, HttpStatus } from "@nestjs/common";

    export class ForbiddenException extends HttpException {
        constructor() {
            super('Forbidden', HttpStatus.FORBIDDEN);
        }
    }


    guards/auth/roles/roles.guard.ts
    ----------------------------------

    import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
    import { Reflector } from '@nestjs/core';
    import { SystemsRoles } from '../../../interfaces/roles.enum';
    import { ForbiddenException } from '../../../exceptions/ForbiddenException';
    @Injectable()
    export class RolesGuard implements CanActivate {
        constructor(private reflector: Reflector) { }

        canActivate(context: ExecutionContext): boolean {
            const requiredRoles: SystemsRoles[] = this.reflector.get('roles', context.getHandler());

            if (!requiredRoles || requiredRoles.length === 0) {
                return true;
            }

            const request = context.switchToHttp().getRequest();
            const user = request.user;

            if (!user || !user.role) {
                throw new ForbiddenException(); // User is not authenticated or does not have a role

            }

            const userRoles: SystemsRoles[] = Array.isArray(user.role) ? user.role : [user.role];

            return requiredRoles.some((role) => userRoles.includes(role));
        }
    }


