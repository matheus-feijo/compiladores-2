import fs from 'fs';

let instrucoes;

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

        } else if (instrucaoAtual[0] === 'ARMZ') {

        } else if (instrucaoAtual[0] === 'SOMA') {

        } else if (instrucaoAtual[0] === 'SUBT') {

        } else if (instrucaoAtual[0] === 'DIVI') {

        } else if (instrucaoAtual[0] === 'MULT') {

        } else if (instrucaoAtual[0] === 'INVE') {

        } else if (instrucaoAtual[0] === 'CRCT') {

        } else if (instrucaoAtual[0] === 'CPME') {

        } else if (instrucaoAtual[0] === 'CPMA') {

        } else if (instrucaoAtual[0] === 'CPIG') {

        } else if (instrucaoAtual[0] === 'CDES') {

        } else if (instrucaoAtual[0] === 'CPMI') {

        } else if (instrucaoAtual[0] === 'CMAI') {

        } else if (instrucaoAtual[0] === 'DSVF') {

        } else if (instrucaoAtual[0] === 'DSVI') {

        } else if (instrucaoAtual[0] === 'LEIT') {

        } else if (instrucaoAtual[0] === 'IMPR') {

        } else if (instrucaoAtual[0] === 'PARA') {
            break;
        }
    }



    console.log(instrucoes);
})



