import { gerarArquivoTxt } from "./gerarArquivoTxt.js";

const PALAVRAS_RESERVADAS = ['if', 'else', 'begin', 'end', 'program', 'while', 'else', 'then', 'do', 'real', 'integer', 'read', 'write'];
const OPERADORES_RELACIONAIS = ['=', '<>', '<=', '>=', '<', '>']

export function sintatico(tokens) {
    var listaTokens = tokens;
    var ponteiro = 0;
    var tipoAtual = null;
    var tabelaVariaveis = [];
    var instrucoes = [];

    const pegaTokenAtual = () => {
        return listaTokens[ponteiro];
    }

    const programa = () => {

        if (pegaTokenAtual().value === 'program') {
            instrucoes.push('INPP');
            ponteiro++;
        } else {
            throw new Error('erro esperado: program obtido:', pegaTokenAtual().value);
        }

        if (pegaTokenAtual().type === 0) {
            ponteiro++;
            corpo();
        } else {
            throw new Error('erro>> tipo esperado: 0 obtido:', pegaTokenAtual().value);
        }

        if (pegaTokenAtual().value === '.') {
            instrucoes.push('PARA');
            ponteiro++;
        }

        if (listaTokens.length === ponteiro) {
            console.log("programa compilado");
            console.log(instrucoes);
            gerarArquivoTxt(instrucoes);

        }
    }

    const corpo = () => {
        dc();
        if (pegaTokenAtual().value === 'begin') {
            ponteiro++;
            //console.log(pegaTokenAtual()); ate aqi tudo certo
            comandos();

            if (pegaTokenAtual().value === 'end') {
                ponteiro++;
            }

        } else {
            throw new Error('esperado: begin obtido:', pegaTokenAtual().value)
        }
    }

    const dc = () => {
        if (pegaTokenAtual().value === 'real' || pegaTokenAtual().value === 'integer') {
            dc_v();
            mais_dc();
        } else {
            return
        }
    }

    const mais_dc = () => {
        if (pegaTokenAtual().value === ';') {
            ponteiro++;
            dc();
        } else {
            return
        }
    }


    const dc_v = () => {
        tipo_var();

        if (pegaTokenAtual().value === ':') {
            ponteiro++;
            variaveis();
        }
    }

    const tipo_var = () => {
        if (pegaTokenAtual().value === 'integer') {
            tipoAtual = 'integer'
        } else if (pegaTokenAtual().value === 'real') {
            tipoAtual = 'real';
        }

        ponteiro++;
    }

    const variaveis = () => {

        if (pegaTokenAtual().type === 0) {
            if (tabelaVariaveis.includes(pegaTokenAtual())) {
                throw new Error('variavel ja declarada');
            } else {
                tabelaVariaveis.push(pegaTokenAtual().value)
                instrucoes.push('ALME 1');
            }

            ponteiro++;
            mais_var();
        } else {
            throw new Error('Erro>> esperado como tipo para variavel: 0 obtido: ', pegaTokenAtual().type)
        }
    }

    const mais_var = () => {
        if (pegaTokenAtual().value === ',') {
            ponteiro++;
            variaveis();
        } else {
            return
        }
    }

    const comandos = () => {
        //console.log(pegaTokenAtual());
        comando();
        mais_comandos();
    }

    const mais_comandos = () => {
        if (pegaTokenAtual().value === ';') {
            ponteiro++;
            comandos();
        } else {
            return
        }
    }

    const comando = () => {
        if (pegaTokenAtual().value === 'read') {
            ponteiro++;

            if (pegaTokenAtual().value === '(') {
                ponteiro++;

                if (pegaTokenAtual().type === 0 && tabelaVariaveis.includes(pegaTokenAtual().value)) {
                    instrucoes.push('LEIT');
                    instrucoes.push('ARMZ ' + tabelaVariaveis.indexOf(pegaTokenAtual().value))
                    ponteiro++;
                    if (pegaTokenAtual().value === ')') {
                        ponteiro++;
                        return;
                    } else {
                        throw new Error('esperado: ) obtido: ', pegaTokenAtual().value);
                    }

                } else {
                    // console.log(tabelaVariaveis);
                    throw new Error('variavel nao foi declarada ou encontrada no codigo')
                }

            } else {
                throw new Error('esperado: ( obtido: ', pegaTokenAtual().value);
            }

        } else if (pegaTokenAtual().value === 'write') {
            ponteiro++;

            if (pegaTokenAtual().value === '(') {
                ponteiro++;

                if (pegaTokenAtual().type === 0 && tabelaVariaveis.includes(pegaTokenAtual().value)) {
                    // instrucoes.push('CRVL ' + pegaTokenAtual().value + "*");
                    instrucoes.push('CRVL ' + tabelaVariaveis.indexOf(pegaTokenAtual().value));
                    instrucoes.push('IMPR');

                    ponteiro++;

                    if (pegaTokenAtual().value === ')') {
                        ponteiro++;
                        return;
                    } else {
                        throw new Error('esperado: ) obtido: ', pegaTokenAtual().value)
                    }

                } else {
                    throw new Error('variavel nao foi declarada ou encontrada');
                }

            } else {
                throw new Error('esperado: ( obtido: ', pegaTokenAtual().value)
            }


        } else if (pegaTokenAtual().value === 'if') {
            ponteiro++;
            condicao();
            const posCondicao = instrucoes.length - 1;

            if (pegaTokenAtual().value === 'then') {
                ponteiro++;
                comandos();
                // console.log(posCondicao);
                instrucoes[posCondicao] = 'DSVF ' + (instrucoes.length - 1)
                //console.log(instrucoes[posCondicao]);
                pfalsa();

                if (pegaTokenAtual().value === '$') {
                    ponteiro++;
                    return
                }
            }

        } else if (pegaTokenAtual().value === 'while') {
            ponteiro++;
            const guardaCondicao = instrucoes.length - 1;
            condicao();
            const guardaInstrucao = instrucoes.length - 1;
            if (pegaTokenAtual().value === 'do') {
                ponteiro++;
                comandos();
                instrucoes.push('DSVI ' + guardaCondicao);
                // console.log(guardaInstrucao);
                instrucoes[guardaInstrucao] = 'DSVF ' + (instrucoes.length - 1);
                //console.log(instrucoes[guardaInstrucao]);

                if (pegaTokenAtual().value === '$') {
                    ponteiro++;
                    return
                }
            }

        } else if (pegaTokenAtual().type === 0 && !PALAVRAS_RESERVADAS.includes(pegaTokenAtual().value)) {
            if (tabelaVariaveis.includes(pegaTokenAtual().value)) {
                ponteiro++;

                if (pegaTokenAtual().value === ':=') {
                    //console.log(pegaTokenAtual());
                    const guardaPosicaoArmz = listaTokens[ponteiro - 1].value;
                    ponteiro++;
                    expressao();

                    instrucoes.push('ARMZ ' + tabelaVariaveis.indexOf(guardaPosicaoArmz));

                    // instrucoes.push('ARMZ ' + guardaPosicaoArmz + '*');
                    return;
                } else {
                    throw new Error('esperado: := obtido: ', pegaTokenAtual().value)
                }

            } else {
                throw new Error('variavel nao foi declarada: ', pegaTokenAtual().value);
            }
        }
    }

    const condicao = () => {
        expressao();
        relacao();
        const instrucaoTipo = instrucoes[instrucoes.length - 1];
        instrucoes = instrucoes.slice(0, instrucoes.length - 1);
        expressao();

        // console.log("testeeee  " + instrucaoTipo);
        instrucoes.push(instrucaoTipo);
        instrucoes.push('DSVF');

    }

    const relacao = () => {
        if (OPERADORES_RELACIONAIS.includes(pegaTokenAtual().value)) {

            if (pegaTokenAtual().value === '=') {
                instrucoes.push('CPIG');

            } else if (pegaTokenAtual().value === '<>') {
                instrucoes.push('CDES');

            } else if (pegaTokenAtual().value === '>=') {
                instrucoes.push('CMAI');

            } else if (pegaTokenAtual().value === '<=') {
                instrucoes.push('CPMI');

            } else if (pegaTokenAtual().value === '<') {
                instrucoes.push('CPME');

            } else if (pegaTokenAtual().value === '>') {
                instrucoes.push('CPMA');
            }
            ponteiro++;
        }
        return
    }

    const expressao = () => {
        termo();
        outros_termos();
    }

    const termo = () => {
        op_un();
        fator();
        mais_fatores();
    }

    const op_un = () => {
        if (pegaTokenAtual().value === '-') {
            ponteiro++;
        } else {
            return
        }
    }

    const fator = () => {
        if (pegaTokenAtual().type === 0) {
            if (tabelaVariaveis.includes(pegaTokenAtual().value)) {
                ponteiro++;
            } else {
                throw new Error('variavel nao foi declarada: ', pegaTokenAtual().value);
            }
            instrucoes.push('CRVL ' + tabelaVariaveis.indexOf(listaTokens[ponteiro - 1].value));
        } else if (pegaTokenAtual().type === 1) {

            //console.log(listaTokens[ponteiro].value);
            instrucoes.push('CRCT ' + listaTokens[ponteiro].value);

            ponteiro++;

        } else if (pegaTokenAtual().value === '(') {
            ponteiro++;
            expressao();

            if (pegaTokenAtual().value === ')') {
                ponteiro++;
                return;
            }
        }
    }

    const outros_termos = () => {

        if (pegaTokenAtual().value === '+' || pegaTokenAtual().value === '-') {
            op_ad();
            termo();
            outros_termos();
        }

        return;
    }

    const op_ad = () => {
        if (pegaTokenAtual().value === '+' || pegaTokenAtual().value === '-') {

            if (pegaTokenAtual().value === '+') {
                instrucoes.push('SOMA');
            } else if (pegaTokenAtual().value === '-') {
                instrucoes.push('SUBT');
            }
            ponteiro++;
        }

        return;
    }

    const mais_fatores = () => {
        if (pegaTokenAtual().value === '*' || pegaTokenAtual().value === '/') {
            let guardaInstrucao;
            if (pegaTokenAtual().value === '/') {
                guardaInstrucao = 'DIVI'
            } else if (pegaTokenAtual().value === '*') {
                guardaInstrucao = 'MULT';
            }
            instrucoes.push(guardaInstrucao);
            op_mul();
            fator();
            mais_fatores();
        }

        return;
    }

    const op_mul = () => {
        if (pegaTokenAtual().value === '*' || pegaTokenAtual().value === '/') {
            ponteiro++;
        }

        return;
    }

    const pfalsa = () => {
        if (pegaTokenAtual().value === 'else') {
            const tamanhoInstrucao = instrucoes.length - 1;
            instrucoes.push('DSVI');
            ponteiro++;
            comandos();
            instrucoes[tamanhoInstrucao + 1] = 'DSVI ' + (instrucoes.length - 1);
        } else {
            return;
        }
    }

    programa();
}