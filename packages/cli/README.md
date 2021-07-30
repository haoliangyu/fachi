@fachi/cli
==========

A CLI tool to conviniently run bencharmk files for JavaScript and TypeScript

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@fachi/cli.svg)](https://npmjs.org/package/@fachi/cli)
[![Downloads/week](https://img.shields.io/npm/dw/@fachi/cli.svg)](https://npmjs.org/package/@fachi/cli)
[![License](https://img.shields.io/npm/l/@fachi/cli.svg)](https://github.com/haoliangyu/fachi/blob/master/package.json)

## Installation

``` sh-session
$ npm install @fachi/cli
```

## Usage

The fachi CLI tool provide a single command `fachi` to execute benchmark files in a directory:

```sh-session
$ fachi test/benchmark/**/*.bench.js
```

This command will run all benchmark file with the extension `.bench.js` inside the `test/benchmark` directory and create a summary report in the console or a file.

## Documentation

The `fachi` command can take multiple parameters and options:

### Parameters

### Options

## Benchmark file syntax

The `fachi` framework supports a benchmark file syntax just like the test files for other modern JavaScript test framework like [mocha](), [Jasmine](), and [Jest]().

At the top level, it uses the `bench(name: string, body: () => void)` function to define a benchmark suite for a code snippet. Inside a test suite, you can define one or multiple benchmarking cases with the `bench(name: string, body: () => void)`. The following is a full example:

``` typescript
// This is a benchmark suite for a serialization function
// that converts an object into a formatted string. It purpose
// it to track the performace of serialization for different
// types of objects.
suite('serialize()', () => {
  bench('with a plain object' ,() => {
    serialize({ key: 'test' })
  })

  bench('with an array', () => {
    serialize(['test'])
  })
})
```

You can also benchmark asynchronous code by returning a Promise in the `bench()` function body.

``` typescript
suite('serializeAsync()', () => {

  // now the bench function body is async and returns a promise

  bench('with a plain object' , async () => {
    serializeAsync({ key: 'test' })
  })

  bench('with an array', async () => {
    serializeAsync(['test'])
  })
})
```

### Hooks

Lifecycle hooks are available at the suite level and provide a finer control in the benchmarking workflow. To invoke a hook, use the following global functions inside a suite body:

* `before()` to run before the benchmark execution
* `after()` to run after all benchmark execution
* `beforeEach()` to run before the execution of each benchmark case
* `afterEach()` to run after the execution of each benchmark case

All hooks support asynchronous operations by returning a promise in the hook body.

