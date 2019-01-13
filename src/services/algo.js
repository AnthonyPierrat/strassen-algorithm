import Matrix from "../models/matrix";

export default class Algo {

    /**
     * @constructor
     * Construcs an algo object with all strassen methods
     */
    constructor() { }

    /**
     * Matrix addition
     * @param {Matrix} a 
     * @param {Matrix} b
     * @return
     *  A matrix object
     */
    add(a, b) {
        const c = new Matrix(a.columns, a.rows, false);
        for (let i = 0; i < a.columns; i++) {
            for (let j = 0; j < a.rows; j++) {
                c.matrix[i][j] = a.matrix[i][j] + b.matrix[i][j];
            }
        }
        return c;
    }

    /**
     * Matrix substraction
     * @param {Matrix} a 
     * @param {Matrix} b
     * @return 
     *  A matrix object
     */
    substract(a, b) {
        const c = new Matrix(a.columns, a.rows, false);
        for (let i = 0; i < a.columns; i++) {
            for (let j = 0; j < a.rows; j++) {
                c.matrix[i][j] = a.matrix[i][j] - b.matrix[i][j];
            }
        }
        return c;
    }

    /**
     * Check wether the matrix is power of two
     * @param {Matrix} matrix
     * @return
     *  A boolean 
     */
    isPowerOfTwo(matrix) {
        const n = matrix.matrix.length * matrix.matrix[0].length;
        return Math.log2(n) % 1 === 0;
    }

    /**
     * Fill a matrix to a power of two matrix with zeros
     * Step 1 - check wether the matrix is n*n 
     * Step 2 - Make it power of two if neccessary
     * @param {Matrix} matrix
     * @return
     *  A matrix object
     */
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
        console.log('power', matrix.matrix);
    }

    /**
     * Reshape a matrix to it's origin columns and rows (remove zeros)
     * @param {Matrix} matrix
     * @return
     *  A matrix object
     */
    reshape(matrix) {

        matrix.matrix.splice(matrix.columns, (matrix.matrix.length - matrix.columns));
        matrix.matrix.forEach(array => {
            array.splice(matrix.rows, array.length - matrix.rows);
        })
        console.log('reshape', matrix.matrix);
    }
} 