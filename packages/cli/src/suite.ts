import { Test } from './test'

export type EventHandler = () => void | Promise<void>;

export type EventType = 'before' | 'beforeEach' | 'after' | 'afterEach'

export class Suite {
  private name: string;

  private tests: Test[] = []

  private before: EventHandler = () => {};

  private beforeEach: EventHandler = () => { };

  private after: EventHandler = () => { };

  private afterEach: EventHandler = () => { };

  constructor (name: string) {
    this.name = name
  }

  addTest (test: Test): void {
    this.tests.push(test)
  }

  setBefore (handler: EventHandler) {
    this.setEventHandler('before', handler)
  }

  setBeforeEach (handler: EventHandler) {
    this.setEventHandler('beforeEach', handler)
  }

  setAfter (handler: EventHandler) {
    this.setEventHandler('after', handler)
  }

  setAfterEach (handler: EventHandler) {
    this.setEventHandler('afterEach', handler)
  }

  async run () {
    console.log(this.name)

    try {
      await this.before()
    } catch (error) {
      console.error(error)
      return
    }

    for (const test of this.tests) {
      try {
        const result = await test.run()
        console.log(`\t${this.formatTestResult(result)}`)
        await this.afterEach()
      } catch (error) {
        console.error(error)
        continue
      }
    }

    try {
      await this.after()
    } catch (error) {
      console.error(error)
      return
    }
  }

  private setEventHandler (eventType: EventType, handler: EventHandler) {
    this[eventType] = handler
  }

  private formatTestResult (result: any) {
    return String(result)
  }
}
