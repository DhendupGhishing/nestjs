import { Injectable } from '@nestjs/common';

export type User=any
@Injectable()
export class UsersService {
    private readonly  users = [
        {
            userId:1,
            username: 'ghishing@gmail.com',
            password: 'ghihsing'
        },
        {
            userId:2,
            username: 'Tenzin',
            password: 'tenzin'
        },
        {
            userId:3,
            username: 'Karma',
            password: 'karma'
        }
    ];
    async findOne(username: string): Promise<User | undefined> {
        debugger;
        console.log(username);
        return this.users.find((user) => user.username === username);
    }

}
