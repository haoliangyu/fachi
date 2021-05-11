import {
  Test
} from './test'
import {
  Suite,
  EventHandler
} from './suite'

export function before (suite: Suite, handler: EventHandler) {
  suite.setBefore(handler)
}

export function beforeEach (suite: Suite, handler: EventHandler) {
  suite.setBeforeEach(handler)
}

export function after (suite: Suite, handler: EventHandler) {
  suite.setAfter(handler)
}

export function afterEach (suite: Suite, handler: EventHandler) {
  suite.setAfterEach(handler)
}

export function bench (suite: Suite, name: string, target: () => void | Promise<void>) {
  suite.addTest(new Test(name, target))
}

export async function suite (name: string, body: () => void) {
  const benchmarkSuite = new Suite(name)

  Object.assign(global, {
    bench: bench.bind(null, benchmarkSuite),
    before: before.bind(null, benchmarkSuite),
    beforeEach: beforeEach.bind(null, benchmarkSuite),
    after: after.bind(null, benchmarkSuite),
    afterEach: afterEach.bind(null, benchmarkSuite)
  })

  body()

  try {
    await benchmarkSuite.run()
  } catch (error) {
    console.error(error)
  }
}
