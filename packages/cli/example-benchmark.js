var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

// add tests
suite.add('RegExp#test', function () {
  const a = 1 + 1
})
  // add listeners
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  // run async
  .run({ 'async': false });
