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
    const math = new Algo();
    // console.log(m.matrix, s.matrix);
    // const result = math.add(m, s);
    // const result2 = math.substract(m, s);
    // math.fillPowerOfTwo(l);
    // math.reshape(l);
    console.log("matrice a avant block", l.matrix);
    console.log("matrice b avant block", s.matrix);
    math.multiply(l,s);
    math.divideByBlock(l, s);
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
