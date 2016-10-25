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
                        var nickname = $('nickName').get('value').trim();
                        if (!nickname){
                            $('nickName').addClass('error');
                        } else {
                            new Request({
                                'url': '/api.php?action=score',
                                'data': {
                                    'nickname': nickname,
                                    'score': Game.score.get('text').toInt()
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
                        'text': 'Nickname: '
                    }),

                    new Element('input', {
                        'name': 'nickName',
                        'id': 'nickName',
                        'type': 'text',
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