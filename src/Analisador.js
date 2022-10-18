import { eachLine } from "line-reader";
export class Analisador {


    static Lexico(url) {

        const tokens = [];
        let estado = 0;
        let elemento = '';


        const endToken = ()=>{
            tokens.push(elemento);
            console.log(elemento);
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


        const isOperador = (c) => {
            return c === '=' || c === '<' || c === '>' || c === ':'
        }

        const isSpace = (c) => {
            return c === ' ' || c === '\t' || c === '\n' || c === '\r'
        }

        const isOperadorCalculo = (c)=>{
            return c === "*" || c==="-" || c==="+" || c==="/";
        }

        const isSpecialCaracter = (c)=>{
            return c==="{" || c==="}" || c===";" || c==="," || c==="(" || c===")" || c==="$";
        }

        eachLine(url,(line)=>{
            for(let i=0;i<line.length;i++){
                if(estado ===0){
                    if(isCaracter(line[i])){
                        estado = 1;
                        elemento = elemento + line[i];
                    }

                    else if(isDigit(line[i])){
                        elemento = elemento + line[i];
                        estado = 3;
                    }

                    else if(isOperador(line[i])){
                        elemento = elemento + line[i];
                        estado = 5;
                    }

                    else if(isSpace(line[i])){
                        estado = 0;
                    }

                    else if(isOperadorCalculo(line[i])){
                        estado = 0;
                        elemento = line[i];
                        endToken();
                    }

                    else if(isSpecialCaracter(line[i])){
                        elemento = line[i];
                        endToken();
                        estado = 0;
                    }


                }

                else if(estado === 1){
                    if(isCaracter(line[i]) || isDigit(line[i])){
                        estado = 1;
                        elemento = elemento + line[i];
                    }else{
                        endToken();
                        estado = 0;
                    }



                }
                else if(estado ===3){
                    if(isDigit(line[i])){
                        estado = 3;
                        elemento = elemento + line[i];
                    }else{
                        endToken();
                        estado = 0;

                    }

                }
                else if(estado === 5){
                    if(isOperador(line[i])){
                        estado =6;
                        elemento = elemento + line[i];
                    }else {
                        endToken();
                        estado = 0;

                    }
                }else if(estado === 6){
                    endToken();
                    estado = 0;
                }
            }
        })
        
        console.log(tokens);
    }
}