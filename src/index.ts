import express, { Request, Response } from "express"
import cors from "cors";
import dotenv from "dotenv";
import connection from "./connection";
import { ProdutoCarrinho } from "./model/produtoCarrinho";
import { HashGenerator } from "./hashManager";
import { Authenticator } from "./authenticator";

dotenv.config();

const hashManager: HashGenerator = new HashGenerator();
const auth: Authenticator = new Authenticator();

const app = express();
app.use(cors())
app.use(express.json());


const produtoCarrinho = async (req: Request, res: Response) => {
    try {
        const cliente_carrinho_id = await connection("cliente").where({ carrinho_id })
        const produto_id = await connection("produto").where({ id })
        if (!cliente_carrinho_id, !produto_id) {
            throw new Error("Faltando informacoes")
        }
        const produtoCarrinho: ProdutoCarrinho = {
            cliente_carrinho_id,
            produto_id
        }
        await connection("carrinho_has_produto").insert({ carrinho_id: cliente_carrinho_id })
        await connection("carrinho_has_produto").insert({ produto_id: produto_id })
        res.status(201).send("O produto foi adicionado ao carrinho")
    }catch(error: any){
        res.send(error.sqlMessage || error.message)
    }
}

app.post("/addProduto", produtoCarrinho)
  
