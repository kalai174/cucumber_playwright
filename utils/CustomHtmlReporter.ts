import {
  Reporter,
  TestCase,
  TestResult,
  FullConfig,
  FullResult
} from '@playwright/test/reporter';

export default class CustomHtmlReporter implements Reporter {

  onBegin(config: FullConfig, suite: any) {
    console.log(`Test run started with ${suite.allTests().length} tests`);
  }

  onTestBegin(test: TestCase) {
    console.log(`Starting Test: ${test.title}`);
  }

  onTestEnd(test: TestCase, result: TestResult) {
    console.log(`Test Ended: ${test.title}`);
    console.log(`Status: ${result.status}`);
    console.log(`Duration: ${result.duration}ms`);
  }

  onEnd(result: FullResult) {
    console.log(`All tests finished with status: ${result.status}`);
  }
}