

export class Token {

    constructor(type, text) {
        super();
        this.type = type;
        this.text = text;
    }


    getType() {
        return this.type;
    }

    setType(type) {
        this.type = type;
    }

    getText() {
        return this.text;
    }

    setText(text) {
        this.text = text;
    }
}