import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Bcrypt } from "../bcrypt/bcrypt";


@Injectable ()
export class AuthService {
    constructor (
        private usuarioService : UsuarioService,
        private jwtService: JwtService,
        private bcrypt: Bcrypt
    ){}

    async ValidateUser (username: string, password: string) Promise<any>{
        const buscaUsuario = await this.usuarioService.findByUsuario(username);

        if(!buscaUsuario)
        throw new Http
    }
}