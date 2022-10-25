import { IsNotEmpty } from "class-validator";
import { Categoria } from "src/categoria/entities/categoria.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'tb_produto'})
export class Produto{
    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty()
    @Column({length: 50, nullable: false})
    nome: string;

    @IsNotEmpty()
    @Column({nullable: false})
    data_lan: Date;

    @IsNotEmpty()
    @Column({nullable: false, type: 'float'})
    preco: number;
    
    @ManyToOne (() => Categoria, (categoria) => categoria.produto, {
        onDelete: 'CASCADE'
    })
    categoria: Categoria;
    usuario: any;
}
