module.exports = function(){
    var _ = require('underscore');
    this.init = function(config) {
        var self = this;
        process.emit('http.route:create', { path:'/profile/:id', trigger:'profile:view', webpage:'/'});
        process.on('profile:view', function(pin){
            console.log('profile:view', pin)
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
