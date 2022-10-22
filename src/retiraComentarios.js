export function retiraComentarios(tokens) {
    let isComent = false;
    let semComentario = [];

    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i].value === '/' && tokens[i + 1].value === '*') {
            isComent = true;
        }

        if (tokens[i].value === '*' && tokens[i + 1].value === '/') {
            i += 2;
            isComent = false;
        }

        if (tokens[i].value === '{') {
            isComent = true;
        }

        if (tokens[i].value === '}') {
            i += 1;
            isComent = false;
        }

        if (!isComent) {
            semComentario.push(tokens[i]);
        }
    }

    return semComentario;
}