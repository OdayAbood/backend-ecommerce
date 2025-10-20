import { Injectable, UseGuards } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { Product, ProductDocument } from 'src/schemas/productSchema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProduct } from './ProductDto/CreateProduct.Dto';
import { UpdateProduct } from './ProductDto/Update.Product.Dto';
import { Roles } from 'src/decoraters/roles.decorater';
import { RolesGuard } from 'src/guards/checkOwner.guard';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>, ){}

    @Roles("admin")
    @UseGuards(RolesGuard)
    async addNewProduct( product: CreateProduct){
        console.log("CreateProduct Class",CreateProduct);
        const { name, price, amount} = product;
        if(!name || !price || !amount){
            return {success: false, message: "All Fields Are Required"}
        }
        try{
            const newProduct = await this.productModel.create(product);
            return {success: true, message: "The Product Add it ", newProduct}
        }
        catch(err){
            return { success: false, error: true, err}
        }
    }
    async deleteProduct(id: string ){
        try{
            const delProduct: CreateProduct | null = await this.productModel.findByIdAndDelete({_id: id});
            if(delProduct?.name){
                return {success: true, message: "The Product Delete it"}
            }
            return {success: false, message: "The Product Is Not Exist" }
        }
        catch(err){
            return { success: false, error: true, err}

        }
    }

    async updateProduct(id: string, product: UpdateProduct){
        const {name, price, amount} = product;
        console.log(product, id);
        if(!name && !price && !amount){
            return { success: false, message: "You Should Update At Least on Thing"}
        }
        try {
            const updateProduct = await this.productModel.findByIdAndUpdate({_id: id}, {...product}, {new: true})
            console.log(updateProduct);
            if(updateProduct?.name){
                return {success: true, message: "The Product Is Updated", updateProduct }
            }
            return { success: false, message: "The Product Is Not Found"}
        }
        catch(err){
             return { success: false, error: true, err}
        }
    }
    async getAllProduct(){
        try {
            const products = await this.productModel.find();
            if(products.length === 0){
                return {success: false, message: "There Is No Product Yet "}
            }
            return { success: true, message: "All Product Are Here", products}
        }
        catch(err){
            return { success: false, error: true, err}
        }
    }
}
