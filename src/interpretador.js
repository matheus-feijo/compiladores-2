import fs from 'fs';

let instrucoes;

fs.readFile('./saida.txt', 'utf-8', (erro, data) => {
    if (erro) {
        console.log(erro);
        return;
    }

    const instrucoes = data.split('\n');
    let ponteiro = 0;




    console.log(instrucoes);
})



