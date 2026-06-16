module.exports = {
  default: {
    requireModule: ['ts-node/register'],
      require: [
      'step-definitions/*.steps.ts',
      'hooks/*.ts'
    ],
    paths: ['features/*.feature'],
    format: [
      'progress',
      'json:reports/cucumber-report.json',
      'html:reports/cucumber-report.html'
    ],
    dryRun: false,
    timeout: 60000
  }
};
