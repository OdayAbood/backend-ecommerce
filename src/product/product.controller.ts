import { Controller, Get, Post, Patch, Body, Delete, Param, UseGuards } from '@nestjs/common';
import { CreateProduct } from './ProductDto/CreateProduct.Dto';
import { ProductService } from './product.service';
import { CheckAuth } from 'src/guards/checkAuth.guard';
import { UpdateProduct } from './ProductDto/Update.Product.Dto';
import { Roles } from 'src/decoraters/roles.decorater';
import { RolesGuard } from 'src/guards/checkOwner.guard';
import { roles } from 'src/decoraters/roles.decorater';

@Controller('product')

@UseGuards(CheckAuth)
@Roles(roles.admin)
@UseGuards(RolesGuard)
export class ProductController {
    constructor( private productService: ProductService){}
    @Post("new-product")
    addNewProduct( @Body() product: CreateProduct){

        return this.productService.addNewProduct(product);

    }
    @Delete("delete-product/:id")
    deleteProduct(@Param('id') id: string){
        return this.productService.deleteProduct(id);
    }
    @Patch("update-product/:id")
    updateProduct(@Param('id') id: string, @Body() product: UpdateProduct){
        console.log(id)
        return this.productService.updateProduct(id, product)
    }
    @Get("all-products")
    getAllProduct(){
        return this.productService.getAllProduct()
    }
}
