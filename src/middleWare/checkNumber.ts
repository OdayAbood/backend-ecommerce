import { Injectable,  NestMiddleware  } from "@nestjs/common";
import { Request, Response , NextFunction } from "express";


@Injectable()

export class CheckNumber implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction){
        const num = parseInt(req.query.num as string)

        console.log(req.query.num);

        console.log(num)
        
        if(isNaN(num)) return res.status(400).json({succed: false, message: "The number is not exist"});

        if(num < 5) return res.status(403).json({succed: false, message: "The number is smaller than 5"})

            req['validateNumber'] = num ;

            next();
    }
}
