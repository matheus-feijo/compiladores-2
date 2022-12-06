import fs from "fs";

export const gerarArquivoTxt = (instrucoes) => {
    const juntarElementos = instrucoes.join('\n');

    // console.log(juntarElementos);
    fs.writeFile('saida.txt', juntarElementos, (erro) => {
        if (erro) {
            throw new Error('erro ao gerar aquivo');
        }

        console.log("arquivo salvo");
    })
}