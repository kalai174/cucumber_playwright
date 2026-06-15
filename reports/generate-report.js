// const report = require('cucumber-html-reporter');
// report.generate({
//   jsonDir: 'reports',
//   reportPath: 'reports/html-report',
//   metadata: {
//     browser: {
//       name: 'chromium',
//       version: 'latest'
//     },
//     device: 'Local Machine',
//     platform: {
//       name: 'windows',
//       version: '11'
//     }
//   },
//   customData: {
//     title: 'Execution Info',
//     data: [
//       { label: 'Project', value: 'Playwright CRM Cucumber' },
//       { label: 'Environment', value: 'QA' },
//       { label: 'Execution Start Time', value: new Date().toLocaleString() }
//     ]
//   }
// });

const reporter = require('cucumber-html-reporter');

const options = {
  theme: 'bootstrap',
  jsonFile: 'reports/cucumber-report.json',
  output: 'reports/html-report/report.html',
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: true,
  metadata: {
    "App Version": "1.0.0",
    "Test Environment": "QA",
    Browser: "Chromium",
    Platform: "Windows",
    Executed: "Local"
  }
};

reporter.generate(options);
console.log('HTML report generated successfully');