import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { Delete } from "@nestjs/common/decorators";
import { Produto } from "../entities/produto.entity";
import { ProdutoService } from "../services/produto.service";


@Controller('/produto')
export class ProdutoController {
    constructor(
        private readonly produtoService: ProdutoService
    ) { }
    @Get()
    @HttpCode(HttpStatus.OK)
    finAll(): Promise<Produto[]> {
        return this.produtoService.findAll();
    }
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(
        @Param('id', ParseIntPipe)
        id: number
    ): Promise<Produto> {
        return this.produtoService.findById(id);
    }
    @Get('/nome/:nome')
    @HttpCode(HttpStatus.OK)
    findByName(
        @Param('nome')
        nome: string
    ): Promise<Produto[]> {
        return this.produtoService.findByName(nome);
    }
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(
        @Body()
        produto: Produto
    ): Promise<Produto> {
        return this.produtoService.create(produto);
    }
    @Put()
    @HttpCode(HttpStatus.OK)
    Update(
        @Body()
        produto: Produto
    ): Promise<Produto> {
        return this.produtoService.update(produto)
    }
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(
        @Param('id', ParseIntPipe)
        id: number
    ) {
        return this.produtoService.delete(id);
    }
}
