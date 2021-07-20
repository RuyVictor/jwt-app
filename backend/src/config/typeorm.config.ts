import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default<TypeOrmModuleOptions> {
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [process.env.TYPEORM_ENTITIES],
  synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE)
};
