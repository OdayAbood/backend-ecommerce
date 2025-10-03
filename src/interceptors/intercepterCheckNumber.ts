import { Injectable, NestInterceptor, CallHandler, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { map, tap } from "rxjs";

@Injectable()

export class ResponseWrapperChechNumber implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const now =  Date.now();
        return next.handle().pipe(
            tap( () => console.log("date is : " ,  Date.now() - now)),
            map((data)=>({
                success: true ,
                timestamp: new Date().toISOString(),
                data,
            })),
        )
    }
}