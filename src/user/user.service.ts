import {Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {User} from './entities/user.entity';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
    }

    createUser(createUserDto: CreateUserDto) {
        const user: User = new User();
        user.name = createUserDto.name;
        user.age = createUserDto.age;
        user.email = createUserDto.email;
        user.username = createUserDto.username;
        user.password = createUserDto.password;
        user.gender = createUserDto.gender;
        return this.userRepository.save(user);
    }

    findAllUser() {
        return this.userRepository.find();
    }

    viewUser(id: number): Promise<User> {
        return this.userRepository.findOneBy({id});
    }

    findUser(username: string): Promise<User> {
        return this.userRepository.findOneBy({username})
    }

    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user: User = new User();
        user.name = updateUserDto.name;
        user.age = updateUserDto.age;
        user.email = updateUserDto.email;
        user.username = updateUserDto.username;
        user.password = updateUserDto.password;
        user.id = id;
        return this.userRepository.save(user);
    }

    removeUser(id: number): Promise<{ affected?: number }> {
        return this.userRepository.delete(id);
    }

    deleteAll(): Promise<{affected?: number}> {
        return this.userRepository.delete({});
    }
}
