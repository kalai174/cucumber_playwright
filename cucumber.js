module.exports = {
  default: {
    require: [
      'step-definitions/*.ts',
      'hooks/*.ts'
    ],
    requireModule: ['ts-node/register'],
    format: [
      'progress',
      'json:reports/cucumber-report.json',
      'html:reports/cucumber-report.html'
    ],
    publishQuiet: true,
    timeout: 60000
  }
};
