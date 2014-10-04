Message = new Class({

    initialize: function(message){

        this.el = new Element('div', {
            'text': message,
            'styles': {
                'position': 'absolute',
                'width': '100%',
                'height': 100,
                'line-height': 100,
                'font-size': 100,
                'text-align': 'center',
                'top': '50%',
                'margin-top': -50,
                'left': window.getSize().x,
                'opacity': 0
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

        setTimeout(function(){
            this.el.set('morph', {
                'transition': Fx.Transitions.Quint.easeOut
            });
            this.el.morph({
                'left': -window.getSize().x,
                'opacity': 0
            }).get('morph').chain(function(){
                this.el.dispose();
            }.bind(this));
        }.bind(this), 2000);

    }

});