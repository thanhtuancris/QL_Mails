const mail = require('./mail.router');
const account = require('./account.router');
function routes(app) {
    app.use('/api', mail);
    app.use('/api', account);
}

module.exports = routes;