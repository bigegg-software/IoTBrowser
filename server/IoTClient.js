const Core = require('@alicloud/pop-core');

const client = new Core({
    accessKeyId: 'LTAI4GAoFDpefUJBFSDXkSC8',
    accessKeySecret: 'YTsrYPh1Y877GtfknOUGYwxQPLYMPD',
    endpoint: 'https://iot.cn-shanghai.aliyuncs.com',
    apiVersion: '2018-01-20'
});

module.exports = client;
