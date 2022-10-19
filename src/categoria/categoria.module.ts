import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriaController } from "./constrollers/categoria.controller";
import { Categoria } from "./entities/categoria.entity";
import { CategoriaService } from "./services/categoria.service";


@Module({
    controllers: [CategoriaController],
    exports: [TypeOrmModule],
    imports: [TypeOrmModule.forFeature([Categoria])],
    providers: [CategoriaService],
})
export class CategoriaModule {}