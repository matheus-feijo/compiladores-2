import { eachLine } from "line-reader";
export class Analisador {


    static Lexico(url) {


        let estado = 0;
        let posicao = 0;


        

        const isDigit = (c) => {
            return c >= 0 && c <= 9
        }

        const isCaracter = (c) => {
            return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')
        }


        const isOperador = (c) => {
            return c === '=' || c === '<' || c === '>' || c === ':'
        }

        const isSpace = (c) => {
            return c === ' ' || c === '\t' || c === '\n' || c === '\r'
        }

        const nextCaracter = () => {
            return //nova posicao (verificar se realmente é necessario)
        }

        //funcao para verificar se é o ultimo caracter 
        const isEOF = () => {
            return
        }



        eachLine(url, (line) => {
            console.log(line);
        })


    }
}