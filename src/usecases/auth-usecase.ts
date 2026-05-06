import { Repository } from "typeorm";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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

        const hashedPassword = await bcrypt.hash(password, 10);

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

        const validPassword = await bcrypt.compare(password, user.password);

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
            { expiresIn: "5m" }
        );

        const refreshToken = jwt.sign(
            { userId: user.id },
            process.env.JWT_REFRESH_SECRET || "refresh_secret",
            { expiresIn: "7d" }
        );

        const tokenSaved = this.tokenRepo.create({
            value: refreshToken,
            user
        });

        await this.tokenRepo.save(tokenSaved);

        return { token, refreshToken };
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

    async refreshToken(refreshTokenString: string) {
        try {
            const decoded = jwt.verify(
                refreshTokenString,
                process.env.JWT_REFRESH_SECRET || "refresh_secret"
            ) as { userId: number };

            const tokenInDb = await this.tokenRepo.findOne({
                where: { value: refreshTokenString },
                relations: ["user"]
            });

            if (!tokenInDb) {
                return null;
            }

            const newAccessToken = jwt.sign(
                {
                    userId: tokenInDb.user.id,
                    email: tokenInDb.user.email,
                    role: tokenInDb.user.role
                },
                process.env.JWT_SECRET || "secret",
                { expiresIn: "5m" }
            );

            return { token: newAccessToken };
            
        } catch (error) {
            return null; 
        }
    }
}