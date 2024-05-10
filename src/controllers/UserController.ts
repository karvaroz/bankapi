import { Request, Response } from "express";
import UserService from "../services/UserService";


class UserController {
    private userService: UserService;

    constructor(__userService:UserService) {
        this.userService = __userService;
    }

    async register(req: Request, res: Response){
        try {
            res.send("register successfully")
        } catch (error) {
            res.send(error)
        }
    }

    async login(req: Request, res: Response){
        try {
            res.send("login successfully")
        } catch (error) {
            res.send(error)
        }
    }

    async forgotPassword(req: Request, res: Response){
        try {
            res.send("forgotPassword successfully")
        } catch (error) {
            res.send(error)
        }
    }

    async resetPassword(req: Request, res: Response){
        try {
            res.send("resetPassword successfully")
        } catch (error) {
            res.send(error)
        }
    }
}

export default UserController;