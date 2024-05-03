import express, { Request, Response } from 'express';

const UserRouter = () => {
    const router = express.Router();

    router.post("/register", (req: Request, res: Response) => {
        res.send({
            message: "Registration successfully"
        })
    })

    router.post("/login", (req: Request, res: Response) => {
        res.send({
            message: "Login successful"
        })
    })

    
    router.post("/forgot-password", (req: Request, res: Response) => {
        res.send({
            message: "Forgot Password mail sent successfully"
        })
    })

    router.post("/reset-password", (req: Request, res: Response) => {
        res.send({
            message: "Reset password successfully"
        })
    })

    return router
}

export default UserRouter;