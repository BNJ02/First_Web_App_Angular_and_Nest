import { ConflictException, Injectable } from "@nestjs/common";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async create(user: Partial<User>): Promise<User> {
        const existingUser = await this.usersRepository.findOne({
            where: { email: user.email },
        });

        if (existingUser) {
            throw new ConflictException('User already exists');
        }

        const newUser = await this.usersRepository.create(user);
        return this.usersRepository.save(newUser);
    }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }
}