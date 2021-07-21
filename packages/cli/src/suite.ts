import { Test } from './test'
import { logSuitRun, logTestRun, logTestEnd, logError } from './log'

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
    logSuitRun(this.name)
    
    await this.before()

    for (const test of this.tests) {
      try {
        logTestRun(test.name)
        const result = await test.run()
        const message = this.formatTestResult(result).replace(test.name, '')
        logTestEnd(message)
        await this.afterEach()
      } catch (error) {
        logTestEnd(test.name, true)
        logError(error)
        continue
      }
    }
    
    await this.after()
  }

  private setEventHandler (eventType: EventType, handler: EventHandler) {
    this[eventType] = handler
  }

  private formatTestResult (result: any) {
    return String(result)
  }
}
