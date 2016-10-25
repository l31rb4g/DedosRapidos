LightBox = new Class({
    initialize: function(){
        this.addEvents();
    },

    addEvents: function(){
        this.overlay = new Element('div', {
            'class': 'overlay'
        }).inject($$('body')[0]);

        this.overlay.tween("opacity", "0.8");

        this.box = new Element('div', {
            'class': 'box'
        }).adopt(
            new Element('form', {
                'method': 'post',
                'events': {
                    'submit': function(ev){
                        ev.stop();
                        var nickname = $('nickName').get('value');
                        if (nickname){
                            new Request({
                                'method': 'post',
                                'url': '/api.php?action=score',
                                'data': {
                                    'score': Game.score.get('text'),
                                    'nickname': nickname
                                }
                            }).send();
                            this.close();
                        }
                    }.bind(this)
                }
            }).adopt(
                new Element('div', {
                    'class': 'formItem'
                }).adopt(
                    new Element('label', {
                        'html': 'Nickname: &nbsp;'
                    }),

                    new Element('input', {
                        'name': 'nickName',
                        'id': 'nickName',
                        'type': 'text',
                        'required': 'required',
                        'autofocus': 'autofocus'
                    }),

                    new Element('input', {
                        'id': 'submit',
                        'type': 'submit',
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
            )
        ).inject($$('body')[0]);

        this.box.tween("opacity", "1");
    },
    
    close: function(){
        this.overlay.dispose();
        this.box.dispose();
    }
});