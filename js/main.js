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

lightBox = new Class({
    initialize: function(){
        this.addEvents();
    },

    addEvents: function(){
        overlay = new Element('div', {
            'class': 'overlay'
        }).inject($$('body')[0]);

        overlay.tween("opacity", "0.8");

        box = new Element('div', {
            'class': 'box'
        }).adopt(
            new Element('div', {
                'class': 'formItem'
            }).adopt(
                new Element('label', {
                    'text': 'Nickname: '
                }),

                new Element('input', {
                    'name': 'nickName',
                    'id': 'nickName',
                    'type': 'text'
                }),

                new Element('input', {
                    'id': 'submit',
                    'type': 'button',
                    'value': 'Send'
                }),

                new Element('p', {
                    'class': 'pontuacao',
                    'text': 'Score: '
                }).adopt(
                    new Element('span', {
                        'text': '500'
                    })
                )
            )
        ).inject($$('body')[0]);

        box.tween("opacity", "1");
    }
});