window.addEvent('domready', function(){

    new Loader();
    new lbDedos();

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

lbDedos = new Class({
    initialize: function(){
        this.addEvents();
    },

    addEvents: function(){
        overlay = new Element('div', {
            'class': 'overlay'
        }).inject($$('body')[0]);

        box = new Element('div', {
            'class': 'box'
        }).adopt(
            new Element('img', {
                'src': ''
            })
        ).inject($$('body')[0]);
    }
});