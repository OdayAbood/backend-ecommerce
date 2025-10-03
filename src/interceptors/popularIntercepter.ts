import { NestInterceptor, Injectable, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs";

@Injectable()

export class PopularIntercpter implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map((data)=>({
                suuccees : true,
                message:"It is a popular middleware",
                data
            }))
        )
    }
}