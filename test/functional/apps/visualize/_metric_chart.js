import {
  bdd,
  common,
  headerPage,
  scenarioManager,
  settingsPage,
  visualizePage
} from '../../../support';

var expect = require('expect.js');

bdd.describe('visualize app', function describeIndexTests() {
  var fromTime = '2015-09-19 06:31:44.000';
  var toTime = '2015-09-23 18:31:44.000';

  bdd.before(function () {

    var testSubName = 'MetricChart';
    common.debug('Start of test' + testSubName + 'Visualization');
    var vizName1 = 'Visualization ' + testSubName;

    common.debug('navigateToApp visualize');
    return common.navigateToApp('visualize')
    .then(function () {
      common.debug('clickMetric');
      return visualizePage.clickMetric();
    })
    .then(function clickNewSearch() {
      return visualizePage.clickNewSearch();
    })
    .then(function setAbsoluteRange() {
      common.debug('Set absolute time range from \"' + fromTime + '\" to \"' + toTime + '\"');
      return headerPage.setAbsoluteRange(fromTime, toTime);
    });
  });


  bdd.describe('metric chart', function indexPatternCreation() {

    bdd.it('should show Count', function pageHeader() {
      var expectedCount = ['14,004', 'Count'];

      // initial metric of "Count" is selected by default
      return common.try(function tryingForTime() {
        return visualizePage.getMetric()
        .then(function (metricValue) {
          expect(expectedCount).to.eql(metricValue.split('\n'));
        });
      });
    });

    bdd.it('should show Average', function pageHeader() {
      var avgMachineRam = ['13,104,036,080.615', 'Average machine.ram'];
      return visualizePage.clickMetricEditor()
      .then(function () {
        common.debug('Aggregation = Average');
        return visualizePage.selectAggregation('Average');
      })
      .then(function selectField() {
        common.debug('Field = machine.ram');
        return visualizePage.selectField('machine.ram');
      })
      .then(function clickGo() {
        return visualizePage.clickGo();
      })
      .then(function () {
        return common.try(function tryingForTime() {
          return visualizePage.getMetric()
            .then(function (metricValue) {
              expect(avgMachineRam).to.eql(metricValue.split('\n'));
            });
        });
      });
    });

    bdd.it('should show Sum', function pageHeader() {
      var sumPhpMemory = ['85,865,880', 'Sum of phpmemory'];
      common.debug('Aggregation = Sum');
      return visualizePage.selectAggregation('Sum')
      .then(function selectField() {
        common.debug('Field = phpmemory');
        return visualizePage.selectField('phpmemory');
      })
      .then(function clickGo() {
        return visualizePage.clickGo();
      })
      .then(function () {
        return common.try(function tryingForTime() {
          return visualizePage.getMetric()
            .then(function (metricValue) {
              expect(sumPhpMemory).to.eql(metricValue.split('\n'));
            });
        });
      });
    });

    bdd.it('should show Median', function pageHeader() {
      var medianBytes = ['5,565.263', '50th percentile of bytes'];
      //  For now, only comparing the text label part of the metric
      common.debug('Aggregation = Median');
      return visualizePage.selectAggregation('Median')
      .then(function selectField() {
        common.debug('Field = bytes');
        return visualizePage.selectField('bytes');
      })
      .then(function clickGo() {
        return visualizePage.clickGo();
      })
      .then(function () {
        return common.try(function tryingForTime() {
          return visualizePage.getMetric()
            .then(function (metricValue) {
              // only comparing the text label!
              expect(medianBytes[1]).to.eql(metricValue.split('\n')[1]);
            });
        });
      });
    });

    bdd.it('should show Min', function pageHeader() {
      var minTimestamp = ['September 20th 2015, 00:00:00.000', 'Min @timestamp'];
      common.debug('Aggregation = Min');
      return visualizePage.selectAggregation('Min')
      .then(function selectField() {
        common.debug('Field = @timestamp');
        return visualizePage.selectField('@timestamp');
      })
      .then(function clickGo() {
        return visualizePage.clickGo();
      })
      .then(function () {
        return common.try(function tryingForTime() {
          return visualizePage.getMetric()
            .then(function (metricValue) {
              expect(minTimestamp).to.eql(metricValue.split('\n'));
            });
        });
      });
    });

    bdd.it('should show Max', function pageHeader() {
      var maxRelatedContentArticleModifiedTime = ['April 4th 2015, 00:54:41.000', 'Max relatedContent.article:modified_time'];
      common.debug('Aggregation = Max');
      return visualizePage.selectAggregation('Max')
      .then(function selectField() {
        common.debug('Field = relatedContent.article:modified_time');
        return visualizePage.selectField('relatedContent.article:modified_time');
      })
      .then(function clickGo() {
        return visualizePage.clickGo();
      })
      .then(function () {
        return common.try(function tryingForTime() {
          return visualizePage.getMetric()
            .then(function (metricValue) {
              expect(maxRelatedContentArticleModifiedTime).to.eql(metricValue.split('\n'));
            });
        });
      });
    });

    bdd.it('should show Standard Deviation', function pageHeader() {
      var standardDeviationBytes = [
        '-1,435.138', 'Lower Standard Deviation of bytes',
        '5,727.314', 'Average of bytes',
        '12,889.766', 'Upper Standard Deviation of bytes'
      ];
      common.debug('Aggregation = Standard Deviation');
      return visualizePage.selectAggregation('Standard Deviation')
      .then(function selectField() {
        common.debug('Field = bytes');
        return visualizePage.selectField('bytes');
      })
      .then(function clickGo() {
        return visualizePage.clickGo();
      })
      .then(function () {
        return common.try(function tryingForTime() {
          return visualizePage.getMetric()
            .then(function (metricValue) {
              expect(standardDeviationBytes).to.eql(metricValue.split('\n'));
            });
        });
      });
    });

    bdd.it('should show Unique Count', function pageHeader() {
      var uniqueCountClientip = ['1,000', 'Unique count of clientip'];
      common.debug('Aggregation = Unique Count');
      return visualizePage.selectAggregation('Unique Count')
      .then(function selectField() {
        common.debug('Field = clientip');
        return visualizePage.selectField('clientip');
      })
      .then(function clickGo() {
        return visualizePage.clickGo();
      })
      .then(function () {
        return common.try(function tryingForTime() {
          return visualizePage.getMetric()
            .then(function (metricValue) {
              expect(uniqueCountClientip).to.eql(metricValue.split('\n'));
            });
        });
      })
      .then(function () {
        return visualizePage.getMetric()
          .then(function (metricValue) {
            common.debug('metricValue=' + metricValue.split('\n'));
            expect(uniqueCountClientip).to.eql(metricValue.split('\n'));
          });
      });
    });

    bdd.it('should show Percentiles', function pageHeader() {
      var percentileMachineRam = [
        '2,147,483,648', '1st percentile of machine.ram',
        '3,221,225,472', '5th percentile of machine.ram',
        '7,516,192,768', '25th percentile of machine.ram',
        '12,884,901,888', '50th percentile of machine.ram',
        '18,253,611,008', '75th percentile of machine.ram',
        '32,212,254,720', '95th percentile of machine.ram',
        '32,212,254,720', '99th percentile of machine.ram'
      ];

      common.debug('Aggregation = Percentiles');
      return visualizePage.selectAggregation('Percentiles')
      .then(function selectField() {
        common.debug('Field =  machine.ram');
        return visualizePage.selectField('machine.ram');
      })
      .then(function clickGo() {
        return visualizePage.clickGo();
      })
      .then(function () {
        return common.try(function tryingForTime() {
          return visualizePage.getMetric()
            .then(function (metricValue) {
              expect(percentileMachineRam).to.eql(metricValue.split('\n'));
            });
        });
      });
    });

    bdd.it('should show Percentile Ranks', function pageHeader() {
      var percentileRankBytes = [ '2.036%', 'Percentile rank 99 of "memory"'];
      common.debug('Aggregation = Percentile Ranks');
      return visualizePage.selectAggregation('Percentile Ranks')
      .then(function selectField() {
        common.debug('Field =  bytes');
        return visualizePage.selectField('memory');
      })
      .then(function selectField() {
        common.debug('Values =  99');
        return visualizePage.setValue('99');
      })
      .then(function clickGo() {
        return visualizePage.clickGo();
      })
      .then(function () {
        return common.try(function tryingForTime() {
          return visualizePage.getMetric()
            .then(function (metricValue) {
              expect(percentileRankBytes).to.eql(metricValue.split('\n'));
            });
        });
      });
    });

  });
});
