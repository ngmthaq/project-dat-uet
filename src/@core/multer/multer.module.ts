import { Global, Module } from "@nestjs/common";
import { MulterModule as AppMulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { v4 as uuidv4 } from "uuid";

@Global()
@Module({
  imports: [
    AppMulterModule.registerAsync({
      useFactory: () => ({
        storage: diskStorage({
          destination: (req, file, callback) => {
            callback(null, "public/uploads");
          },
          filename: (req, file, callback) => {
            const ext = file.mimetype.split("/")[1];
            const filename = `${Date.now()}-${uuidv4()}.${ext}`;
            callback(null, filename);
          },
        }),
      }),
    }),
  ],
  exports: [AppMulterModule],
})
export class MulterModule {}
