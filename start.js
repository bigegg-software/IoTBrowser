const _ = require('underscore');
const iot = require('alibabacloud-iot-device-sdk');

const config = {
    productKey: 'a1VS22jypKl', //将<productKey>修改为实际产品的ProductKey
    deviceName: '0001',//将<deviceName>修改为实际设备的DeviceName
    deviceSecret: '207ee8370b94c46b61fc3e5d9cfc4330',//将<deviceSecret>修改为实际设备的DeviceSecret
}

const puppeteer = require('puppeteer');

let tabs = [];
let currentTab = "init";

(async () => {

    const device = iot.device(config);

    device.on('connect', () => {
        device.subscribe(`/${config.productKey}/${config.deviceName}/user/get`);
        console.log('connect successfully!');
        // device.publish(`/${config.productKey}/${config.deviceName}/user/update`, 'hello world!');
    });

    function reportProps() {
        let props = {
            tabs: _.map(tabs, tab => {
                console.log(tab.uuid, tab.url);
                return {uuid: tab.uuid, url: tab.url, isLoaded: tab.isLoaded};
            }), currentTab
        };
        console.log('readProps', props);
        device.postProps(props, (res) => {
            console.log(`postProps`, res);
        });
    }

    device.onService('addTabSync', function (res, reply) {
        let newTab = res.params.tab;
        newTab.isLoaded = 0;
        console.log('addTabSync called,res:', newTab);
        if (!_.findWhere(tabs, {uuid: res.params.tab.uuid})) {
            browser.newPage().then(page => {
                page.goto(newTab.url);
                newTab.page = page;
                tabs.push(newTab);
                console.log('tab added', tabs);
                reportProps();
            });
        }

        reply({
            data: {"success": true},
            code: 200
        }, 'sync');
    });

    device.onService('setCurrentTabSync', function (res, reply) {
        console.log('setCurrentTabSync called,res:', res.params.uuid);
        let tab = _.findWhere(tabs, {uuid: res.params.uuid});
        if (tab) {
            currentTab = res.params.uuid;
            console.log('change tab', tab.uuid, tab.page);
            tab.page.bringToFront();
            reportProps();
        } else {
            console.log('tab not exists', res.params.uuid);
        }

        reply({
            data: {"success": true},
            code: 200
        }, 'sync');
    });

    device.onService('deleteTabSync', function (res, reply) {
        let deleteUUID = res.params.uuid;
        console.log('deleteTabSync called,res:', deleteUUID);
        tabs = _.reject(tabs, (item) => {
            if (item.uuid == deleteUUID) {
                item.page.close();
                return true;
            } else {
                return false;
            }
        });
        if (currentTab == deleteUUID) {
            // TODO
            currentTab = "init";
        } else {
            // TODO
        }
        reportProps();

        reply({
            data: {"success": true},
            code: 200
        }, 'sync');
    });

    device.onService('readProps', function (res, reply) {
        reportProps();
        reply({
            data: {"success": true},
            code: 200
        }, 'sync');
    });

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--start-fullscreen', '--kiosk', '--noerrdialogs', '--content-shell-hide-toolbar'],
        ignoreDefaultArgs: ['--enable-automation'],

    });

})();


// setInterval(() => {
//     let msg = `msg@${new Date().getTime()}`;
//     device.publish(`/${config.productKey}/${config.deviceName}/user/update`, msg, {}, (err) => {
//         console.log('sent', err, msg);
//     });
//     console.log('send', msg);
// }, 5e3);
