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
          <div class="column">
            <input
              v-model="size"
              class="input is-rounded"
              type="number"
              min="1"
              max="1024"
              step="1"
              placeholder="Choose a size from 1 to 1024."
            >
          </div>
          <div class="columns is-centered">
            <div class="column">
              <a v-on:click="strassen" class="button is-primary is-right">Strassen multiply</a>
            </div>
            <div class="column">
              <a class="button is-primary is-left">Standard multiply</a>
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

export default {
  name: "App",
  components: {
    HelloWorld
  },
  data: function() {
    return {
      size: 1,
      matrixA: [],
      matrixB: []
    };
  },

  methods: {
    strassen: function() {
      const math = new Algo();
      this.matrixA = new Matrix(this.size, this.size, true);
      this.matrixB = new Matrix(this.size, this.size, true);
      console.log(this.matrixA, this.matrixB);
    }
  },

  created: function() {
    // const m = new Matrix(4, 4, true);
    // const s = new Matrix(512, 512, true);
    // const l = new Matrix(512, 512, true);
    // s.matrix = [[-1, 0, 1, 0], [1, 0, 1, 0], [-1, 0, 1, 0], [1, 0, 1, 0]];
    // l.matrix = [[1, 0, -1, 0], [1, 0, 1, 0], [1, 0, -1, 0], [1, 0, 1, 0]];
    const math = new Algo();
    // console.log(m.matrix, s.matrix);
    // console.log(math.add(m, s));
    // const result2 = math.substract(m, s);
    // console.log(l);
    // math.fillPowerOfTwo(l);
    // math.reshape(l);
    // console.log("matrice a avant block", s.matrix);
    // // console.log("coef", math.matrixByCoef(s, -1));
    // console.log("matrice b avant block", l.matrix);
    // console.log("naive", math.multiply(s, l));
    // console.log("strassen", math.divideByBlock(s, l));
    // console.log(math.strassen(s, l));
  }
};
</script>

<style>
</style>
