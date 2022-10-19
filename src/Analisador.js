import { eachLine } from "line-reader";
export class Analisador {



    static Lexico(url) {

        const TYPE_TEXT = 0;
        const TYPE_DIGIT = 1;
        const TYPE_OPERADOR_LOGICO = 2;
        const TYPE_OPERADOR_ARITMETICO = 3;
        const TYPE_ESPECIAL_CARACTER = 4;

        const tokens = [];
        let estado = 0;
        let elemento = '';


        const endToken = (typeToken) => {
            tokens.push({ type: typeToken, value: elemento });
            console.log(tokens);
            console.log(" - - - - - ");
            elemento = "";
        }


        //validando tipo do token
        const isDigit = (c) => {
            return parseInt(c) >= 0 && parseInt(c) <= 9
        }

        const isCaracter = (c) => {
            return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')
        }

        const isSpace = (c) => {
            return c === ' ' || c === '\t' || c === '\n' || c === '\r'
        }


        const isSpecialCaracter = (c) => {
            return c === "{" || c === "}" || c === ";" || c === "," || c === "(" || c === ")" || c === "$";
        }

        const isOperadorAritmetico = (c) => {
            return c === '+' || c === '-' || c === '/' || c == '*'
        }

        const isOperadorLogico = (c) => {
            return c === '=' || c === '<' || c === '>' || c === ':'
        }



        eachLine(url, (line) => {
            for (let i = 0; i < line.length; i++) {
                if (estado === 0) {
                    if (isCaracter(line[i])) {
                        estado = 1;
                        elemento = elemento + line[i];
                    }

                    else if (isDigit(line[i])) {
                        elemento = elemento + line[i];
                        estado = 3;
                    }

                    else if (isOperadorLogico(line[i])) {
                        elemento = elemento + line[i];
                        estado = 5;
                    }

                    else if (isSpace(line[i])) {
                        estado = 0;
                    }

                    else if (isOperadorAritmetico(line[i])) {
                        elemento = line[i];
                        endToken(TYPE_OPERADOR_ARITMETICO);
                        estado = 0;
                    }

                    else if (isSpecialCaracter(line[i])) {
                        elemento = line[i];
                        endToken(TYPE_ESPECIAL_CARACTER);
                        estado = 0;
                    }


                }

                else if (estado === 1) {
                    if (isCaracter(line[i]) || isDigit(line[i])) {
                        estado = 1;
                        elemento = elemento + line[i];
                    } else {
                        //voltar uma casa
                        i--;
                        endToken(TYPE_TEXT);
                        estado = 0;
                    }



                }
                else if (estado === 3) {
                    if (isDigit(line[i])) {
                        estado = 3;
                        elemento = elemento + line[i];
                    } else {
                        i--;
                        endToken(TYPE_DIGIT);
                        estado = 0;

                    }

                }
                else if (estado === 5) {
                    if (isOperadorLogico(line[i])) {
                        elemento = elemento + line[i];
                        endToken(TYPE_OPERADOR_LOGICO);
                        estado = 0;
                    } else {
                        i--;
                        endToken(TYPE_OPERADOR_LOGICO);
                        estado = 0;

                    }
                }
            }
        })
    }
}