import { Injectable, NestMiddleware } from "@nestjs/common";

import { Request, Response, NextFunction } from "express";

@Injectable()

export class PopularMiddleWare implements NestMiddleware {
    use(req: Request, res:Response, next: NextFunction){
        console.log("Apopulare middleWare for the whole app");
        next();
    }
}