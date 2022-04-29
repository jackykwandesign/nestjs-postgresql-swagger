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
  ) {}

  public async userGetById(userId: string): Promise<User> {
    const userFound = await this.repo.findOneOrFail({
      id: userId,
    });
    return userFound;
  }
  public async userGetByEmail(email: string): Promise<User> {
    const userFound = await this.repo.findOneOrFail({
      email: email,
    });
    return userFound;
  }
  public async usersGetAll(filter?: UserFilterDTO): Promise<User[]> {
    let newWhere: FindOneOptions<User>['where'] = {};
    if (!IsObjectEmpty(filter)) {
      if (filter.email) {
        newWhere.email = filter.email;
      }
    }
    return await this.repo.find({
      where: newWhere,
    });
  }

  public async userCreate(dto: UserSafeDTO, user: User): Promise<User> {
    return await this.repo.save(dto.toEntity(user));
  }
}
