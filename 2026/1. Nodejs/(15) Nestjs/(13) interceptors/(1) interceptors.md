(1) interceptors
------------------
==> Interceptors in NestJS implement the NestInterceptor interface and let you run 
logic before and after a route handler executes — useful for logging, 
transforming responses, caching, timing execution, or wrapping responses in a consistent shape.

==> Interceptors, like controllers, providers, guards, and so on, can inject dependencies through their constructor


(2) generates first interceptor
--------------------------------
==> nest g itc interceptors/products



    interceptors/products.interceptor.ts
    --------------------------------------

    import {
        Injectable,
        NestInterceptor,
        ExecutionContext,
        CallHandler,
    } from '@nestjs/common';
    import { Observable } from 'rxjs';
    import { map, tap } from 'rxjs/operators';

    @Injectable()
    export class ResponseInterceptor implements NestInterceptor {
        intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
            const request = context.switchToHttp().getRequest();
            const now = Date.now();

            return next.handle().pipe(
                tap(() =>
                    console.log(
                        `[${request.method}] ${request.url} - ${Date.now() - now}ms`,
                    ),
                ),
                map((data) => ({
                    success: true,
                    statusCode: context.switchToHttp().getResponse().statusCode,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    data,
                })),
            );
        }
    }


    products.controller.ts
    ----------------------

    import { ResponseInterceptor } from 'src/interceptors/products/products.interceptor';

    @Controller('products')
    @UseInterceptors(ResponseInterceptor)
    export class ProductsController {...}


(3) use the interceptors globally
----------------------------------

    main.ts
    ---------

    import { NestFactory } from '@nestjs/core';
    import { AppModule } from './app.module';
    import { ResponseInterceptor } from './interceptors/products/products.interceptor';


    async function bootstrap() {
        const app = await NestFactory.create(AppModule);

        app.useGlobalInterceptors(new ResponseInterceptor())
        await app.listen(3000);
    }
    bootstrap();