import { ProductEntity } from './entities/product.entity/product.entity';
import { Repository } from 'typeorm';
import { CreateProductsDto } from './dto/create-products';
export declare class ProductsService {
    private readonly ProductRepositorio;
    constructor(ProductRepositorio: Repository<ProductEntity>);
    create(dados: CreateProductsDto): Promise<ProductEntity>;
    findAll(): Promise<ProductEntity[]>;
    find(id: number): Promise<ProductEntity | null>;
}
