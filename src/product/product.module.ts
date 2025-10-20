import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product, ProductSchema } from 'src/schemas/productSchema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports:[MongooseModule.forFeature([{name: Product.name, schema: ProductSchema}])]
})
export class ProductModule {}
