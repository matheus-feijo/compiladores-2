import fs from "fs";

export const gerarArquivoTxt = (instrucoes) => {
    const juntarElementos = instrucoes.join('\n');

    // console.log(juntarElementos);
    fs.writeFile('saida.txt', juntarElementos, (erro) => {
        if (erro) {
            console.log('deu ruim')
            return;
        }

        console.log("arquivo salvo");
    })
}