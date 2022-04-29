import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { ItemFilterDTO } from './dto/item.filter.dto';
import { IsObjectEmpty } from 'src/utils/isObjectEmpty';
import { ItemDTO } from './dto/item.dto';
import { User } from '../user/user.entity';

@Injectable()
export class ItemService {
    constructor(
        @InjectRepository(Item)
        private readonly repo: Repository<Item>,
    ) { }

    public async itemsGetAll(filter?: ItemFilterDTO): Promise<Item[]> {
        let newWhere: FindOneOptions<Item>['where'] = { isArchived: false };
        if (!IsObjectEmpty(filter)) {
            if (filter.name) {
                newWhere.name = filter.name;
            }
        }
        return await this.repo.find({
            where: newWhere,
        });
    }

    public async itemsGetAllFTS(filter?: ItemFilterDTO): Promise<Item[]> {
        const finalQuery = this.repo.createQueryBuilder("item")
        console.log("filter", filter)
        if (!IsObjectEmpty(filter)) {
            console.log("filter not empty", filter)
            if (filter.name) {
                finalQuery.where(`to_tsvector('simple',item.name) @@ to_tsquery('simple',:name)`,
                { name:`${filter.name}:*` })
            }
            if (filter.description) {
                finalQuery.andWhere('to_tsvector(item.description) @@ to_tsquery(:description)',
                { description:filter.description })
            }
        }
        console.log("finalQuery", finalQuery.getQueryAndParameters())
        const result = await finalQuery.getManyAndCount()
        console.log("result", result)
        return result[0]
    }

    public async itemCreate(dto: ItemDTO, user: User): Promise<Item> {
        try {
            return await this.repo.save(dto.toEntity(user));
        } catch (error) {
            throw new InternalServerErrorException()
        }

    }

    public async itemDeleteById(itemId: string, user: User): Promise<Item> {
        try {
            const found = await this.repo.findOne({
                where: {
                    id: itemId,
                    isArchived: false,
                },
            });
            if (!found) {
                throw new NotFoundException();
            }
            found.isActive = false;
            found.isArchived = true;
            found.updatedBy = user.id;
            const result = await this.repo.save(found);
            return result;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}
