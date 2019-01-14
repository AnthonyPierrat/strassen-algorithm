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
     * standard matrix multiplying (without Strassen)
     * @param {Matrix} a 
     * @param {Matrix} b
     * @return 
     *  A matrix object
     */
    multiply(a, b) {
        const c = new Matrix(a.columns, a.rows, false);
        console.log(a, b, c);
        for (let i = 0; i < b.columns; i++) {
            for (let j = 0; j < a.rows; j++) {
                for (let k = 0; k < a.columns; k++) {
                    c.matrix[i][j] += a.matrix[i][k] * b.matrix[k][j];
                }
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
    }

    /**
     * Split a matrix
     * @param {Matrix} matrix 
     * @param {number} indexColumnStart 
     * @param {number} indexColumnEnd 
     * @param {number} indexRowStart 
     * @param {number} indexRowEnd
     * @returns
     *  A multidimensional array
     */
    split(matrix, indexColumnStart, indexColumnEnd, indexRowStart, indexRowEnd) {
        const splitted = matrix.matrix.slice(indexColumnStart, indexColumnEnd);
        let result = [];
        splitted.forEach(array => {
            result.push(array.slice(indexRowStart, indexRowEnd));
        });

        return result;
    }

    /**
     * merge a matrix
     * @param {Matrix} matrix matrix to merge
     * @param {Matrix} matrixResult merged matrix
     * @param {number} start 
     * @param {number} end 
     */
    merge(matrix, matrixResult, start, end) {

        for (let i1 = 0, i2 = start; i1 < matrix.matrix.length; i1++ , i2++)
            for (let j1 = 0, j2 = end; j1 < matrix.matrix.length; j1++ , j2++) {
                matrixResult.matrix[i2][j2] = matrix.matrix[i1][j1];
            }
    }

    divideByBlock(a, b) {

        const n = a.matrix.length;

        const result = new Matrix(n, n, false);

        if (n === 2) {

            return this.multiply(a, b);

        } else {
            // top left matrix a
            let a11 = new Matrix(n / 2, n / 2, false);
            a11.matrix = this.split(a, 0, n / 2, 0, n / 2);
            // top right matrix a
            let a12 = new Matrix(n / 2, n / 2, false);
            a12.matrix = this.split(a, 0, n / 2, n / 2, n);
            // bottom left matrix a
            let a21 = new Matrix(n / 2, n / 2, false);
            a21.matrix = this.split(a, n / 2, n, 0, n / 2);
            // bottom right matrix a
            let a22 = new Matrix(n / 2, n / 2, false);
            a22.matrix = this.split(a, n / 2, n, n / 2, n);

            // top left matrix b
            let b11 = new Matrix(n / 2, n / 2, false);
            b11.matrix = this.split(b, 0, n / 2, 0, n / 2);
            // top right matrix b
            let b12 = new Matrix(n / 2, n / 2, false);
            b12.matrix = this.split(b, 0, n / 2, n / 2, n);
            // bottom left matrix b
            let b21 = new Matrix(n / 2, n / 2, false);
            b21.matrix = this.split(b, n / 2, n, 0, n / 2);
            // bottom right matrix b
            let b22 = new Matrix(n / 2, n / 2, false);
            b22.matrix = this.split(b, n / 2, n, n / 2, n);

            const q1 = this.divideByBlock(this.substract(a11, a12), b22);
            const q2 = this.divideByBlock(this.substract(a21, a22), b11);
            const q3 = this.divideByBlock(a22, this.add(b11, b21));
            const q4 = this.divideByBlock(a11, this.add(b12, b22));
            const q5 = this.divideByBlock(this.add(a11, a22), this.substract(b22, b11));
            const q6 = this.divideByBlock(this.add(a11, a21), this.add(b11, b12));
            const q7 = this.divideByBlock(this.add(a12, a22), this.add(b21, b22));

            const c11 = this.substract(this.substract(q1, q3), this.substract(q5, q7));
            const c12 = this.substract(q4, q1);
            const c21 = this.add(q2, q3);
            const c22 = this.add(this.substract(q2, q4), this.add(q5, q6));

            this.merge(c11, result, 0, 0);
            this.merge(c12, result, 0, n / 2);
            this.merge(c21, result, n / 2, 0);
            this.merge(c22, result, n / 2, n / 2);

        }

        return result;
    }
} 