module.exports = function(){
    var _ = require('underscore');
    var dao = require('daoi');
    this.init = function(config) {
        var self = this;
        var daoImpl = dao.use(dao.FILE);
        dao.register('profile');
        process.emit('http.route:create', { path:'/profile/:id', trigger:'profile:view', webpage:'/'});
        process.on('user:login.response', function(pin){
            var pout = {};
            if (pin && pin.user && pin.user.$id) {
                var criteria = { user$id: pin.user.$id };
                daoImpl
                .profile
                .findOne(criteria)
                .then(function(profile){
                    if(profile) {
                        pout = { profile: profile };
                        process.emit('profile:get.response', pout);
                    } else {
                        pout = { for: criteria };
                        process.emit('profile:not.found', pout);
                    }
                })
                .catch(function(err){
                    //todo
                    console.log(err)
                });
            }
        });
    }
}

var defaults = module.exports.defaults = {
    models: {
        profile: {
            supportedMethods: ['view']
        }
    }
}
