(1) setup environment variables
----------------------------------
==> npm i @nestjs/config
==> configure for app.module.ts
==> Access the variables in the service


    app.module.ts
    ---------------

    import { Module } from '@nestjs/common';
    import { AppController } from './app.controller';
    import { AppService } from './app.service';
    import { HelloModule } from './hello/hello.module';
    import { UserModule } from './user/user.module';
    import { ConfigModule } from '@nestjs/config';
    @Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }), // here
        HelloModule,
        UserModule],
    controllers: [AppController],
    providers: [AppService],
    })
    export class AppModule { }


    user/UserModule.service.ts
    ----------------------------

    import { Injectable } from '@nestjs/common';
    import { ConfigService } from '@nestjs/config';

    @Injectable()
    export class UserService {
        // 1- inject config service here
        constructor(private config: ConfigService) { }

        findAll() {
            // 2- use config service to get APP_NAME
            let appName = this.config.get<string>('APP_NAME');
            //let appName2 = process.env.APP_NAME; // or use this
            return `This action returns all user ${appName}`;
        }
    }
