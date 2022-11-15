import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader: string | undefined = req.headers.authorization
        const token: string = authHeader ? authHeader.split(' ')[1] : ''

        res.locals.userData = jwt.verify(token, process.env.TOKEN_SECRET as string)
        next()
    } catch (err) {
        // @ts-ignore
        err.code = 401
        next(err)
    }
}

export default auth
