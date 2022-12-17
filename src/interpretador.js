import fs from 'fs';

const ENTRADA_VALOR_A = 4;

export const interpretador = () => {
    fs.readFile('./saida.txt', 'utf-8', (erro, data) => {
        if (erro) {
            console.log(erro);
            return;
        }

        let memoria = [];
        let pilha = [];
        const instrucoes = data.split('\n');
        let ponteiro = 0;
        let instrucaoAtual;

        while (true) {
            instrucaoAtual = instrucoes[ponteiro].split(' ');

            if (instrucaoAtual[0] === 'INPP') {
                if (ponteiro !== 0) {
                    throw new Error('INPP INVALIDO');
                }

            } else if (instrucaoAtual[0] === 'ALME') {
                memoria.push(0);

            } else if (instrucaoAtual[0] === 'CRVL') {
                pilha.push(memoria[instrucaoAtual[1]]);

            } else if (instrucaoAtual[0] === 'CRCT') {
                pilha.push(instrucaoAtual[1]);

            } else if (instrucaoAtual[0] === 'ARMZ') {
                memoria[instrucaoAtual[1]] = pilha.pop();

            } else if (instrucaoAtual[0] === 'SOMA') {
                const valorTopoPilha = pilha.pop();
                let valorSeguinte;

                const instrucaoSeguinte = instrucoes[ponteiro + 1].split(' ');

                if (instrucaoSeguinte[0] === 'CRVL') {
                    valorSeguinte = memoria[instrucaoSeguinte[1]];

                } else if (instrucaoSeguinte[0] === 'CRCT') {
                    valorSeguinte = instrucaoSeguinte[1];
                }

                // console.log(valorTopoPilha, valorSeguinte);
                pilha.push(parseFloat(valorTopoPilha) + parseFloat(valorSeguinte));
                ponteiro++;

            } else if (instrucaoAtual[0] === 'SUBT') {
                const valorTopoPilha = pilha.pop();
                let valorSeguinte;

                const instrucaoSeguinte = instrucoes[ponteiro + 1].split(' ');

                if (instrucaoSeguinte[0] === 'CRVL') {
                    valorSeguinte = memoria[instrucaoSeguinte[1]];

                } else if (instrucaoSeguinte[0] === 'CRCT') {
                    valorSeguinte = instrucaoSeguinte[1];
                }

                // console.log(valorTopoPilha, valorSeguinte);
                pilha.push(parseFloat(valorTopoPilha) - parseFloat(valorSeguinte));
                ponteiro++;

            } else if (instrucaoAtual[0] === 'DIVI') {
                const valorTopoPilha = pilha.pop();
                let valorSeguinte;

                const instrucaoSeguinte = instrucoes[ponteiro + 1].split(' ');

                if (instrucaoSeguinte[0] === 'CRVL') {
                    valorSeguinte = memoria[instrucaoSeguinte[1]];

                } else if (instrucaoSeguinte[0] === 'CRCT') {
                    valorSeguinte = instrucaoSeguinte[1];
                }

                // console.log(valorTopoPilha, valorSeguinte);
                pilha.push(parseFloat(valorTopoPilha) / parseFloat(valorSeguinte));
                ponteiro++;

            } else if (instrucaoAtual[0] === 'MULT') {
                const valorTopoPilha = pilha.pop();
                let valorSeguinte;

                const instrucaoSeguinte = instrucoes[ponteiro + 1].split(' ');

                if (instrucaoSeguinte[0] === 'CRVL') {
                    valorSeguinte = memoria[instrucaoSeguinte[1]];

                } else if (instrucaoSeguinte[0] === 'CRCT') {
                    valorSeguinte = instrucaoSeguinte[1];
                }

                // console.log(valorTopoPilha, valorSeguinte);
                pilha.push(parseFloat(valorTopoPilha) * parseFloat(valorSeguinte));
                ponteiro++;

            } else if (instrucaoAtual[0] === 'INVE') {
                const value1 = pilha.pop();
                pilha.push(parseInt(value1) * (-1));

            } else if (instrucaoAtual[0] === 'CRCT') {
                const value = parseInt(instrucaoAtual[1]);
                pilha.push(value);

            } else if (instrucaoAtual[0] === 'CPME') {
                const value1 = pilha.pop()
                const value2 = pilha.pop()

                pilha.push(value2 < value1)

            } else if (instrucaoAtual[0] === 'CPMA') {
                const value1 = pilha.pop()
                const value2 = pilha.pop()

                // console.log(value1, value2);
                pilha.push(parseFloat(value2) > parseFloat(value1));

            } else if (instrucaoAtual[0] === 'CPIG') {
                const value1 = pilha.pop()
                const value2 = pilha.pop()
                pilha.push(parseInt(value1 === value2))


            } else if (instrucaoAtual[0] === 'CDES') {
                const value1 = pilha.pop()
                const value2 = pilha.pop()
                pilha.push(value1 != value2)

            } else if (instrucaoAtual[0] === 'CPMI') {
                const value1 = pilha.pop()
                const value2 = pilha.pop()
                pilha.push(parseFloat(value2) <= parseFloat(value1))

            } else if (instrucaoAtual[0] === 'CMAI') {
                const value1 = pilha.pop()
                const value2 = pilha.pop()
                pilha.push(value2 >= value1)

            } else if (instrucaoAtual[0] === 'DSVF') {
                const value = pilha.pop();
                if (value === false) {
                    ponteiro = parseInt(instrucaoAtual[1]);

                }

            } else if (instrucaoAtual[0] === 'DSVI') {
                ponteiro = parseInt(instrucaoAtual[1]);

            } else if (instrucaoAtual[0] === 'LEIT') {
                console.log("ENTRADA ==== ", ENTRADA_VALOR_A);
                pilha.push(ENTRADA_VALOR_A);

            } else if (instrucaoAtual[0] === 'IMPR') {
                console.log("IMPRIME:" + pilha.pop());

            } else if (instrucaoAtual[0] === 'PARA') {
                break;
            }

            ponteiro++;
        }



        // console.log(instrucoes);
    })

}


