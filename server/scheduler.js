const Moment = require('moment');
const jobs = [];
let d = Moment().startOf('day');
for (let i = 0; i < 60 * 24; i++) {
    if (d.toDate() > Date.now()) {
        if (i % 2 == 0) {
            // addJob(d.toDate(), {identifier: "setCurrentTabSync", args: {uuid: 'aa'}});
            jobs.push({
                timestamp: d.toDate().getTime(),
                action: {identifier: "setCurrentTabSync", args: {uuid: 'aa'}}
            })
            // console.log(d.toDate().getTime(), JSON.stringify({identifier: "setCurrentTabSync", args: {uuid: 'aa'}}));
        } else if (i % 2 == 1) {
            // addJob(d.toDate(), {identifier: "setCurrentTabSync", args: {uuid: 'bb'}});
            jobs.push({
                timestamp: d.toDate().getTime(),
                action: {identifier: "setCurrentTabSync", args: {uuid: 'bb'}}
            })
            // console.log(d.toDate().getTime(), JSON.stringify({identifier: "setCurrentTabSync", args: {uuid: 'bb'}}));
        }
    }

    d.add(1, 'm');
}

console.log(JSON.stringify(jobs));
