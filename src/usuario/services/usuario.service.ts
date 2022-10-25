import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Bcrypt } from "src/auth/bcrypt/bcrypt";
import { Repository } from "typeorm";
import { Usuario } from "../entities/usuario.entity";


@Injectable ()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private bcrypt:Bcrypt
    ){}

    async findByUsuario(usuario:string): Promise<Usuario>{
        return await this.usuarioRepository.findOne({
           relations:{
            produto:true
           }
        });
    }
    async findById(id: number): Promise<Usuario> {
        let buscaUsuario = await this.usuarioRepository.findOne({
            where: {
                id
            }
        })

        if (!buscaUsuario || !id)
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

        return buscaUsuario;
}
async create(usuario: Usuario): Promise<Usuario> {
    let buscaUsuario = await this.findByUsuario(usuario.Usuario);

    if (!buscaUsuario) {
        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)
        return await this.usuarioRepository.save(usuario);
    }
    throw new HttpException('Usuario já existe!', HttpStatus.BAD_REQUEST);
}
async update(usuario: Usuario): Promise<Usuario> {

    let updateUsuario: Usuario = await this.findById(usuario.id);
    let buscaUsuario = await this.findByUsuario(usuario.Usuario);

    if (!updateUsuario)
        throw new HttpException('Usuario não encontrado', HttpStatus.NOT_FOUND);
    if (usuario && buscaUsuario.id !== usuario.id)
        throw new HttpException('usuario (e-mail) já cadastrado,digite outro!', HttpStatus.BAD_REQUEST);

    usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)
    return await this.usuarioRepository.save(usuario);


}

}@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private bcrypt: Bcrypt
    ) { }

    async findByUsuario(usuario: string): Promise<Usuario> {
        return await this.usuarioRepository.findOne({
            where: {
                usuario
            }

        });
    }
    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find({
            relations: {
                produto: true
            }
        });
    }
    async findById(id: number): Promise<Usuario> {
        let buscaUsuario = await this.usuarioRepository.findOne({
            where: {
                id
            }
        })

        if (!buscaUsuario)
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

        return buscaUsuario;
    }

    async create(usuario: Usuario): Promise<Usuario> {
        let buscaUsuario = await this.findByUsuario(usuario.usuario);

        if (!buscaUsuario) {
            usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)
            return await this.usuarioRepository.save(usuario);
        }
        throw new HttpException('Usuario já existe!', HttpStatus.BAD_REQUEST);
    }
    async update(usuario: Usuario): Promise<Usuario> {

        let updateUsuario: Usuario = await this.findById(usuario.id);
        let buscaUsuario = await this.findByUsuario(usuario.usuario);

        if (!updateUsuario)
            throw new HttpException('Usuario não encontrado', HttpStatus.NOT_FOUND);
        if (usuario && buscaUsuario.id !== usuario.id)
            throw new HttpException('usuario (e-mail) já cadastrado,digite outro!', HttpStatus.BAD_REQUEST);

        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)
        return await this.usuarioRepository.save(usuario);


    }

}