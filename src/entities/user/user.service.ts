import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSafeDTO } from 'src/entities/user/dto/user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly repo: Repository<User>,
    ) { }

    public async getAll(): Promise<UserSafeDTO[]> {
        return await this.repo
            .find()
            .then((users) => users.map((e) => UserSafeDTO.fromEntity(e)));
    }

    public async create(dto: UserSafeDTO, user: User): Promise<UserSafeDTO> {
        return await this.repo
            .save(dto.toEntity(user))
            .then((e) => UserSafeDTO.fromEntity(e));
    }
}
