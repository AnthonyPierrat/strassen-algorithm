export default class Matrix {

    constructor(columns, rows, random) {
        if (!random) {
            this.columns = columns;
            this.rows = rows;
            this.matrix = this.fill();
        } else {
            this.columns = columns;
            this.rows = rows;
            this.matrix = this.fillRandom();
        }
    }

    fill() {
        const m = [];
        for (let i = 0; i < this.columns; i++) {
            m[i] = [];
            for (let j = 0; j < this.rows; j++) {
                m[i][j] = 0;
            }
        }
        return m;
    }

    fillRandom() {
        const m = [];
        for (let i = 0; i < this.columns; i++) {
            m[i] = [];
            for (let j = 0; j < this.rows; j++) {
                m[i][j] = Math.floor(Math.random() * Math.floor(3));
            }
        }
        return m;
    }
}