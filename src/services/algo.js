import Matrix from "../models/matrix";

export default class Algo {

    constructor() { }

    add(a, b) {
        const c = new Matrix(a.columns, a.rows, false);
        for (let i = 0; i < a.columns; i++) {
            for (let j = 0; j < a.rows; j++) {
                c.matrix[i][j] = a.matrix[i][j] + b.matrix[i][j];
            }
        }
        return c;
    }

    substract(a, b) {
        const c = new Matrix(a.columns, a.rows, false);
        for (let i = 0; i < a.columns; i++) {
            for (let j = 0; j < a.rows; j++) {
                c.matrix[i][j] = a.matrix[i][j] - b.matrix[i][j];
            }
        }
        return c;
    }

    isPowerOfTwo(matrix) {
        const n = matrix.matrix.length * matrix.matrix[0].length;
        return Math.log2(n) % 1 === 0;
    }

    fillPowerOfTwo(matrix) {

        // first check if it's n*n
        // otherwise make it same size

        // more columns than rows
        if (matrix.columns > matrix.rows) {
            // get number of rows to add
            const rowsToAdd = matrix.columns - matrix.rows;
            // add rows
            matrix.matrix.forEach(array => {
                for (let i = 0; i < rowsToAdd; i++) array.push(0);
            })
            // more rows than columns
        } else {
            // get number of columns to add
            const columnsToAdd = matrix.rows - matrix.columns;
            // add columns
            for (let i = 0; i < columnsToAdd; i++) matrix.matrix.push(new Array(matrix.rows).fill(0));
        }

        // is new computed size power of two
        if (!this.isPowerOfTwo(matrix)) {
            // compute new length
            const n = matrix.matrix.length * matrix.matrix[0].length;
            // find nearest power of two
            const nearestPowerOfTwo = Math.ceil(Math.log2(n));

            // reshape to the power of two
            // get columns to add
            const columnsToAdd = 2 ^ nearestPowerOfTwo - matrix.matrix.length;
            // get rows to add
            const rowsToAdd = 2 ^ nearestPowerOfTwo - matrix.matrix[0].length;
            // add columns
            for (let i = 0; i < columnsToAdd; i++) matrix.matrix.push(new Array(nearestPowerOfTwo).fill(0));

            // add rows
            matrix.matrix.forEach(array => {
                for (let i = 0; i < rowsToAdd; i++) array.push(0);
            })
        }
        console.log(matrix);
    }

    reshape(matrix) {
        // todo
        // slice from orignal columns number
        // slice from orignal rows number
        // return
        // console.log(matrix.matrix.length - matrix.matrix.columns);
        console.log(matrix.matrix.length, (matrix.matrix.length - matrix.matrix.columns));
        matrix.matrix.splice(matrix.matrix.length, matrix.matrix.length - matrix.matrix.columns);
        console.log(matrix.matrix);
    }
} 