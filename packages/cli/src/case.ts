import Benchmark from 'benchmark'
import isPromise from 'is-promise'

export class Case {
  private name: string

  private target: () => void | Promise<void>

  constructor (name: string, target: () => void | Promise<void>) {
    this.name = name
    this.target = target
  }

  async run () {
    const target = this.target
    let notReturnsPromise: boolean

    const bench = new Benchmark(this.name, {
      defer: true,
      fn: function (deferred: any) {
        const result = target()
        let promisedResult: Promise<void>

        if (notReturnsPromise === null) {
          notReturnsPromise = isPromise(result)
        }

        if (notReturnsPromise) {
          promisedResult = Promise.resolve(result)
        } else {
          promisedResult = result as Promise<void>
        }

        promisedResult.then(deferred.resolve)
      }
    })

    bench.run()
  }
}
