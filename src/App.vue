<template>
  <div id="app">
    <nav class="navbar has-background-primary" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <h1 class="title has-text-white">Strassenify.js</h1>
        </a>
      </div>

      <div id="navbar" class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button">
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
              <a v-on:click="generate" class="button is-primary is-right">Generate</a>
            </div>
          </div>
          <div class="columns is-centered">
            <div class="column is-narrow">
              <table class="table is-bordered">
                <tbody>
                  <tr v-for="row in matrixA.matrix">
                    <td v-for="column in row">{{row[column]}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="column is-narrow">
              <table class="table is-bordered">
                <tbody>
                  <tr v-for="row in matrixB.matrix">
                    <td v-for="column in row">{{row[column]}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="column is-narrow">
              <table class="table is-bordered">
                <tbody>
                  <tr v-for="row in matrixC.matrix">
                    <td v-for="column in row">{{row[column]}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="column has-text-centered">
            <div class="field is-grouped is-centered">
              <div class="control">
                <a v-on:click="strassen" class="button is-primary is-right">Strassen multiply</a>
                {{strassenTime}} ms
              </div>
              <div class="control">
                <a v-on:click="naive" class="button is-primary is-left">Standard multiply</a>
                {{naiveTime}} ms
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <HelloWorld/>
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
      strassenTime: 0,
      naiveTime: 0,
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

    run: function() {
      // create Matrix A
      const A = new Matrix(10, 10, true);
      // create Matrix B
      const B = new Matrix(10, 10, true);
      const t0 = performance.now();
      this.math.strassen(A, B);
      const t1 = performance.now();
      const time = Math.trunc(t1 - t0);
      this.resultsStrassen.push({ size: 10, time: time });

      for (let i = 0; i < 1200; i += 100) {
        // create Matrix A
        const A = new Matrix(i, i, true);
        // create Matrix B
        const B = new Matrix(i, i, true);
        const t0 = performance.now();
        this.math.multiply(A, B);
        const t1 = performance.now();
        const time = Math.trunc(t1 - t0);
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
