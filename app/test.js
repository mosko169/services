

const Promise = require('bluebird');



function readDB() {
    return Promise.reject(6);
}


async function foo () {

    let p = readDB();
    try {

        let res = await readDB();
    } catch (err) {
        console.log(err);
    }

}

foo();