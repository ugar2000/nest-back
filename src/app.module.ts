import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseModule } from 'nestjs-firebase';
import { ProductsModule } from './products/products.module';
import { FormModule } from './form/form.module';

@Module({
  imports: [
    FirebaseModule.forRoot({
      googleApplicationCredential: './environments/firebase-creds.json',
    }),
    ProductsModule,
    FormModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
