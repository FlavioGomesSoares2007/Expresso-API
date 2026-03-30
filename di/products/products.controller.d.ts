import { ProductsService } from './products.service';
import { CreateProductsDto } from './dto/create-products';
export declare class ProductsController {
    private readonly ProductsService;
    constructor(ProductsService: ProductsService);
    create(dados: CreateProductsDto): Promise<import("./entities/product.entity/product.entity").ProductEntity>;
    findAll(): Promise<import("./entities/product.entity/product.entity").ProductEntity[]>;
    find(id: number): Promise<import("./entities/product.entity/product.entity").ProductEntity | null>;
}
