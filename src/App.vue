<template>
  <div id="app">
    <nav class="navbar has-background-primary" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <h1 class="title has-text-white">MT79 Strassen</h1>
        </a>
      </div>

      <div id="navbar" class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a href="https://github.com/AnthonyPierrat/strassen-algorithm" class="button">
                <span class="icon">
                  <i class="fab fa-github"></i>
                </span>
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <section class="hero is-link is-fullheight-with-navbar has-background-grey-dark">
      <div class="hero-body">
        <div class="container">
          <p class="title has-text-centered">Choose matrices size.</p>
          <h3 class="subtitle has-text-centered is-5">Matrices A & B will be generated randomly.</h3>
          <div class="columns is-centered">
            <div class="column is-narrow">
              <input
                v-model.number="size"
                class="input has-text-centered"
                type="number"
                min="1"
                max="1024"
                step="1"
                placeholder="Choose a size from 1 to 1024."
              >
            </div>
            <div class="column is-narrow">
              <a v-on:click="generate" class="button is-success is-right">Generate</a>
              <a
                v-bind:disabled="!matrixA.matrix && !matrixB.matrix"
                v-on:click="clear"
                class="button is-danger is-right"
              >Clear</a>
            </div>
          </div>
          <div v-if="size <= 12" class="columns is-centered">
            <div class="column is-narrow">
              <p v-if="matrixA.matrix">A</p>
              <table class="table is-bordered">
                <tbody>
                  <tr v-for="(row, index) in matrixA.matrix">
                    <td v-for="column in row">{{column}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="column is-narrow">
              <p v-if="matrixB.matrix">B</p>
              <table class="table is-bordered">
                <tbody>
                  <tr v-for="(row, index) in matrixB.matrix">
                    <td v-for="column in row">{{column}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="column is-narrow">
              <p v-if="matrixC.matrix">C</p>
              <table class="table is-bordered">
                <tbody>
                  <tr v-for="(row, index) in matrixC.matrix">
                    <td v-for="column in row">{{column}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="columns is-centered">
            <div class="column is-narrow">
              <div class="field is-grouped is-centered">
                <div class="control">
                  <a
                    v-bind:disabled="!matrixA.matrix && !matrixB.matrix"
                    v-on:click="strassen"
                    class="button is-primary is-right"
                  >Strassen multiply</a>
                  <p v-if="strassenTime">{{strassenTime}} ms</p>
                </div>
                <div class="control">
                  <a
                    v-bind:disabled="!matrixA.matrix && !matrixB.matrix"
                    v-on:click="naive"
                    class="button is-primary is-left"
                  >Standard multiply</a>
                  <p v-if="naiveTime">{{naiveTime}} ms</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import Matrix from "./models/matrix";
import Algo from "./services/algo";
import Chart from "chart.js";

export default {
  name: "App",
  components: {
    HelloWorld
  },
  data: function() {
    return {
      size: 1,
      matrixA: [],
      matrixB: [],
      matrixC: [],
      strassenTime: null,
      naiveTime: null,
      resultsStrassen: [],
      resultsNaive: [],
      math: new Algo()
    };
  },

  methods: {
    generate: function() {
      // create Matrix A
      this.matrixA = new Matrix(this.size, this.size, true);
      // create Matrix B
      this.matrixB = new Matrix(this.size, this.size, true);
      // clear result if exist
      if (this.matrixC.length !== 0) {
        this.matrixC = [];
      }
    },

    clear: function() {
      // clear Matrix A
      this.matrixA = [];
      // clear Matrix B
      this.matrixB = [];
      // clear Matrix C
      this.matrixC = [];
      // clear time
      this.naiveTime = null;
      this.strassenTime = null;
      // clear size
      this.size = 1;
    },

    run: function() {
      for (let i = 1; i <= 2048; i = 2 * i) {
        // create Matrix A
        const A = new Matrix(i, i, true);
        // create Matrix B
        const B = new Matrix(i, i, true);
        const t0 = performance.now();
        this.math.multiply(A, B);
        const t1 = performance.now();
        const time = t1 - t0;
        this.resultsStrassen.push({ size: i, time: time });
      }
      localStorage.setItem("naive", JSON.stringify(this.resultsStrassen));
    },

    strassen: function() {
      // strassen
      const t0 = performance.now();
      this.matrixC = this.math.strassen(this.matrixA, this.matrixB);
      const t1 = performance.now();
      this.strassenTime = Math.trunc(t1 - t0);
      // only for UI
      this.math.reshape(this.matrixA, this.size);
      this.math.reshape(this.matrixB, this.size);
      // push to strassen global result
      this.resultsStrassen.push({
        a: this.matrixA,
        b: this.matrixB,
        c: this.matrixC,
        time: this.strassenTime
      });
    },

    naive: function() {
      // strassen
      const t0 = performance.now();
      this.matrixC = this.math.multiply(this.matrixA, this.matrixB);
      const t1 = performance.now();
      this.naiveTime = Math.trunc(t1 - t0);
      // push to strassen global result
      this.resultsNaive.push({
        a: this.matrixA,
        b: this.matrixB,
        c: this.matrixC,
        time: this.naiveTime
      });
    }
  },

  created: function() {},

  mounted: function() {
    // this.run();
  }
};
</script>

<style>
.hero-body {
  padding-bottom: 90%;
}
</style>
