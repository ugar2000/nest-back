import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase';
import { Product } from './product.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
  ) {}

  public async getAllProducts(): Promise<Array<Product>> {
    const querySnapshot = await this.firebase.db.collection('products').get();
    const collection = [];
    querySnapshot.forEach((doc) => {
      collection.push({ id: doc.id, ...doc.data() });
    });
    return collection;
  }

  public async getProductById(id: string) {
    const documentRef = await this.firebase.db
      .collection('rates')
      .doc(id)
      .get();
    const product = documentRef.data();
    if (product) {
      return documentRef.data();
    } else {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Product not found',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  public async createProduct(product: Partial<Product>) {
    return await this.firebase.db.collection('products').add(product);
  }

  public async updateProduct(product: Partial<Product>) {
    const docRef = this.firebase.db.collection('products').doc(product.id);
    delete product.id;
    return await docRef.set(product, { merge: true });
  }

  public async deleteProduct(id: string) {
    console.log(id);
    return await this.firebase.db.collection('products').doc(id).delete();
  }
}
