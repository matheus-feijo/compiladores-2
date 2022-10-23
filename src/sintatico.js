
const TOKEN_IDENTIFICADOR = 0;
const TOKEN_NUM_INTEIRO = 1;
const TOKEN_NUM_REAL = 2;
const TOKEN_SIMBOLO = 3;

const PALAVRAS_RESERVADAS = ['if', 'else', 'begin', 'end', 'program', 'while', 'else', 'then', 'do', 'real', 'integer', 'read', 'write'];
const OPERADORES_RELACIONAIS = ['=', '<>', '<=', '>=', '<', '>']

export function sintatico(tokens) {
    var listaTokens = tokens;
    var ponteiro = 0;
    var tipoAtual = null;
    var instrucoes = [];
    var tabelaSimbolos = {};
    var tabelaSimbolosPosicao = {}
    const tabelaVariaveis = [];

    // console.log(tokens);

    const pegaTokenAtual = () => {
        return listaTokens[ponteiro];
    }

    const isInt = (n) => {
        return Number(n) === n && n % 1 === 0;
    }

    const isFloat = (n) => {
        return Number(n) === n && n % 1 !== 0;
    }


    const programa = () => {

        if (pegaTokenAtual().value === 'program') {
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
            ponteiro++;
        }

        console.log(ponteiro);
        if (listaTokens.length === ponteiro) {
            console.log("analisador sintatico feito")
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
                    ponteiro++;

                    if (pegaTokenAtual().value === ')') {
                        ponteiro++;
                        return;
                    } else {
                        throw new Error('esperado: ) obtido: ', pegaTokenAtual().value);
                    }

                } else {
                    console.log(tabelaVariaveis);
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

            if (pegaTokenAtual().value === 'then') {
                ponteiro++;
                comandos();
                pfalsa();

                if (pegaTokenAtual().value === '$') {
                    ponteiro++;
                    return
                }
            }

        } else if (pegaTokenAtual().value === 'while') {
            ponteiro++;
            condicao();

            if (pegaTokenAtual().value === 'do') {
                ponteiro++;
                comandos();

                if (pegaTokenAtual().value === '$') {
                    ponteiro++;
                    return
                }
            }

        } else if (pegaTokenAtual().type === 0 && !PALAVRAS_RESERVADAS.includes(pegaTokenAtual().value)) {
            if (tabelaVariaveis.includes(pegaTokenAtual().value)) {
                ponteiro++;

                if (pegaTokenAtual().value === ':=') {
                    ponteiro++;
                    expressao();
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
        expressao();

    }

    const relacao = () => {
        if (OPERADORES_RELACIONAIS.includes(pegaTokenAtual().value)) {
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
        }
        return
    }

    const fator = () => {
        if (pegaTokenAtual().type === 0) {
            if (tabelaVariaveis.includes(pegaTokenAtual().value)) {
                ponteiro++;
            } else {
                throw new Error('variavel nao foi declarada: ', pegaTokenAtual().value);
            }


        } else if (pegaTokenAtual().type === 1) {
            if (isInt(pegaTokenAtual().value)) {
                ponteiro++;
            } else if (isFloat(pegaTokenAtual().value)) {
                ponteiro++;
            }

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
            ponteiro++;
        }

        return;
    }

    const mais_fatores = () => {
        if (pegaTokenAtual().value === '*' || pegaTokenAtual().value === '/') {
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
            ponteiro++;
            comandos();
        } else {
            return;
        }
    }

    programa();






    //programa();

}