let { igApi, getCookie } = require("insta-fetcher");
// using constructor
let ig = new igApi("your cookie");

// you can get sesion id by using getSessionId function, it requires username & passwor
try {
    ig.fetchUserV2("helper.fenorocky").then((res) => {
        console.log(res)
    });
}
catch(err) {
    console.log(err)
}
