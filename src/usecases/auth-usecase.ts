import { Repository } from "typeorm";
import jwt from "jsonwebtoken";

import { User, UserRole } from "../database/entities/user.js";
import { Token } from "../database/entities/token.js";

export class AuthUsecase {

    constructor(
        private userRepo: Repository<User>,
        private tokenRepo: Repository<Token>
    ) {}

    async register(email: string, password: string) {

        const existingUser = await this.userRepo.findOneBy({ email });

        if (existingUser) {
            return null;
        }

        const hashedPassword = password;

        const user = this.userRepo.create({
            email,
            password: hashedPassword,
            role: UserRole.CLIENT
        });

        const savedUser = await this.userRepo.save(user);

        return {
            id: savedUser.id,
            email: savedUser.email,
            role: savedUser.role
        };
    }

    async login(email: string, password: string) {

        const user = await this.userRepo.findOneBy({ email });

        if (!user) {
            return null;
        }

        const validPassword =
            password === user.password;

        if (!validPassword) {
            return null;
        }

        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET || "secret",
            { expiresIn: "1h" }
        );

        const tokenSaved = this.tokenRepo.create({
            value: token,
            user
        });

        await this.tokenRepo.save(tokenSaved);

        return { token };
    }

    async logout(userId: number) {

        const tokens = await this.tokenRepo.find({
            where: {
                user: {
                    id: userId
                }
            }
        });

        await this.tokenRepo.remove(tokens);
    }
}