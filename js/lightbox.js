LightBox = new Class({
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
        ).inject($$('body')[0]);

        box.tween("opacity", "1");
    }
});