import { IsNotEmpty, MinLength } from "class-validator";
import { Produto } from "src/produto/entities/produto.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'tb_usuarios'})

export class Usuario{
    Usuario(Usuario: any) {
        throw new Error("Method not implemented.");
    }
    
    @PrimaryGeneratedColumn()
    public id: number;

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    public usuario: string;

    @IsNotEmpty()
    @MinLength(8)
    @Column({length:255,nullable:false})
    public senha: string;

    @OneToMany(() => Produto, (produto) => produto.usuario)
    public produto : Produto[];
}
