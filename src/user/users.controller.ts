import { Body, Controller, Get, Post } from "@nestjs/common";
import { User } from "./user.entity";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Post()
    create(@Body() createUserDto: Partial<User>): Promise<User> {
        return this.userService.create(createUserDto);
    }

    @Get()
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }
}