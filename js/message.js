Message = new Class({

    Implements: Options,

    options: {
        close: true
    },

    initialize: function(message, options){
        this.setOptions(options);
        this.el = new Element('div', {
            'class': 'message',
            'text': message,
            'styles': {
                'position': 'absolute',
                'width': '100%',
                'height': 240,
                'line-height': 280,
                'font-size': '50px',
                'text-align': 'center',
                'top': '50%',
                'margin-top': -170,
                'left': window.getSize().x,
                'opacity': 0,
                'color': '#5fb0e5',
                'font-weight': 'bold'
            },
            'morph': {
                'duration': 750,
                'transition': Fx.Transitions.Quint.easeIn
            }
        }).inject($$('body')[0]);

        this.el.morph({
            'left': 0,
            'opacity': 1
        });

        if (this.options.close) {
            setTimeout(function () {
                this.el.set('morph', {
                    'transition': Fx.Transitions.Quint.easeOut
                });
                this.el.morph({
                    'left': -window.getSize().x,
                    'opacity': 0
                }).get('morph').chain(function () {
                    this.el.dispose();
                }.bind(this));
            }.bind(this), 2000);
        }

    }

});