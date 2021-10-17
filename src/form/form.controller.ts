import { Controller, Get } from '@nestjs/common';
import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase';

@Controller('form')
export class FormController {
  constructor(
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin,
  ) {}

  @Get('product-template')
  async getProductTemplate() {
    try {
      const docRef = await this.firebase.db
        .collection('forms')
        .doc('Product')
        .get();
      return docRef.data();
    } catch (e) {
      throw e;
    }
  }

  @Get('service-template')
  async getServiceTemplate() {
    try {
      const docRef = await this.firebase.db
        .collection('forms')
        .doc('Service')
        .get();
      return docRef.data();
    } catch (e) {
      throw e;
    }
  }
}
