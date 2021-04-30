import Benchmark from 'benchmark'
import isPromise from 'is-promise'

export class Test {
  private name: string

  private target: () => void | Promise<void>

  constructor (name: string, target: () => void | Promise<void>) {
    this.name = name
    this.target = target
  }

  async run () {
    const target = this.target
    const isAsync = isPromise(target())
    const testFunction = this.constructTestFunction(target, isAsync)

    const bench = new Benchmark(this.name, {
      defer: isAsync,
      fn: testFunction
    })

    let result;

    bench
    .on('complete', function (event: any) {
      result = event.target
    })
    .run()

    return result;
  }

  constructTestFunction (target: () => void | Promise<void>, isAsync: boolean): any {
    if (isAsync) {
      return (deferred: any) => {
        (target() as Promise<void>)
        .then(() => deferred.resolve())
        .catch((error) => deferred.reject(error))
      }
    }

    return () => target()
  }
}
