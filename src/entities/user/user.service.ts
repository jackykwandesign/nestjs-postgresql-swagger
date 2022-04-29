import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { UserSafeDTO } from 'src/entities/user/dto/user.dto';
import { User } from './user.entity';
import { UserFilterDTO } from './dto/user-filter.dto';
import { IsObjectEmpty } from 'src/utils/isObjectEmpty';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly repo: Repository<User>,
    ) { }

    public async userRawGetById(userId:string): Promise<User>{
        const userFound = await this.repo.findOneOrFail({
            id:userId
        })
        return userFound
    }
    public async userRawGetByEmail(email:string): Promise<User>{
        const userFound = await this.repo.findOneOrFail({
            email:email
        })
        return userFound
    }
    public async usersGetAll(filter?: UserFilterDTO): Promise<UserSafeDTO[]> {
        let newWhere: FindOneOptions<User>['where'] = {};
        if (!IsObjectEmpty(filter)) {
            if (filter.email) {
                newWhere.email = filter.email;
            }
        }
        return await this.repo
            .find({
                where: newWhere,
            })
            .then((users) => users.map((e) => UserSafeDTO.fromEntity(e)));
    }

    public async userCreate(dto: UserSafeDTO, user: User): Promise<UserSafeDTO> {
        return await this.repo
            .save(dto.toEntity(user))
            .then((e) => UserSafeDTO.fromEntity(e));
    }
}
