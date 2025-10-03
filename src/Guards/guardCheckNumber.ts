import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { promises } from "dns";
import { Observable } from "rxjs";

@Injectable()

export class GuardCheckNumber implements CanActivate{
    canActivate(context: ExecutionContext): boolean{
        const req = context.switchToHttp().getRequest();
        return typeof req['validateNumber'] === 'number'
    }
}