<template>
  <div id="app">
    <img src="./assets/logo.png">
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

  created: function() {
    // const m = new Matrix(4, 4, true);
    const s = new Matrix(4, 4, true);
    const l = new Matrix(4, 4, true);
    s.matrix = [[-1, 0, 1, 0], [1, 0, 1, 0], [-1, 0, 1, 0], [1, 0, 1, 0]];
    l.matrix = [[1, 0, -1, 0], [1, 0, 1, 0], [1, 0, -1, 0], [1, 0, 1, 0]];
    const math = new Algo();
    // console.log(m.matrix, s.matrix);
    // console.log(math.add(m, s));
    // const result2 = math.substract(m, s);
    // math.fillPowerOfTwo(l);
    // math.reshape(l);
    // console.log("matrice a avant block", s.matrix);
    // console.log("coef", math.matrixByCoef(s, -1));
    console.log("matrice b avant block", l.matrix);
    console.log("naive", math.multiply(s, l));
    console.log("strassen", math.divideByBlock(s, l));
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
