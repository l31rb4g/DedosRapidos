window.addEvent('domready', function(){

    new Loader();

});

Loader = new Class({

    scripts: ['interface', 'game', 'square', 'message'],

    ready: 0,

    initialize: function(){
        this.scripts.each(function(script) {
            new Request({
                'url': 'js/' + script + '.js?_=' + new Date().getTime(),
                'method': 'get',
                onSuccess: function(){
                    this.ready++;
                    if (this.ready == this.scripts.length){
                        this.onComplete();
                    }
                }.bind(this)
            }).send();
        }.bind(this));
    },

    onComplete: function(){
        Game.initialize();
        window.interface = new Interface();
    }
});