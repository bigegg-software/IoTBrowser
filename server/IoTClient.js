const Core = require('@alicloud/pop-core');

const client = new Core({
    accessKeyId: process.env.ISCREEN_ACCESSKEY,
    accessKeySecret: process.env.ISCREEN_ACCESSKEY_SECRET,
    endpoint: 'https://iot.cn-shanghai.aliyuncs.com',
    apiVersion: '2018-01-20'
});

module.exports = client;
