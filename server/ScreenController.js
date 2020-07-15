const CronJob = require('cron').CronJob;

const client = require('./IoTClient');

const allJobs = [];

function addJob(date, action) {
    console.log(date.toLocaleString(), action);
    if (date < Date.now()) {
        console.error('Date in past. Will never be fired.');
        return;
    }
    const job = new CronJob(date, function () {
        const d = new Date();

        let requestOption = {
            method: 'POST'
        };
        let params = {
            "RegionId": "cn-shanghai",
            "Args": JSON.stringify(action.args),
            "Identifier": action.identifier,
            "ProductKey": "a1Ra6t7iOXz",
            "DeviceName": "0001"
        }
        console.log(params);

        client.request('InvokeThingService', params, requestOption).then((result) => {
            console.log(JSON.stringify(result));
        }, (ex) => {
            console.log(ex);
        });
        console.log('Specific date:', date, ', onTick at:', d, 'action', action);
    });
    job.start();
    allJobs.push(job);
}

function resetJobs(jobs) {
    console.log('cleanup all jobs');
    for (let i = 0; i < allJobs.length; i++) {
        allJobs[i].stop();
    }

    console.log('add new jobs');
    for (let i = 0; i < jobs.length; i++) {
        let job = jobs[i];
        addJob(new Date(job.timestamp), job.action);
    }
}

const fs = require('fs');

function readSchedule(scheduleFile) {
    const jobs = JSON.parse(fs.readFileSync(scheduleFile, 'utf-8'));
    const jobsToAdd = [];
    for (let i = 0; i < jobs.length; i++) {
        jobsToAdd.push(jobs[i]);
    }
    resetJobs(jobsToAdd);
}

readSchedule('./schedule.log');

setTimeout(() => {
    resetJobs([]);
}, 10e3)
