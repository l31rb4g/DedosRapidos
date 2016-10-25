Message = new Class({

    Implements: Options,

    options: {
        close: true
    },

    initialize: function(message, options){
        this.setOptions(options);
        if(message == 'Prepare-se!'){

            var marginTop = '110px'
            var lineHeight = 'normal';
            var height = 288;
            var background = 'url(../images/nuvem.png)';

            this.button = new Element('button', {
                'type': 'button',
                'class': 'start',
                'text': 'Start',
                'events': {
                    click: function(){
                        Game.start();
                        this.el.set('morph', {
                            'transition': Fx.Transitions.Quint.easeOut
                        });
                        this.el.morph({
                            'left': -window.getSize().x,
                            'opacity': 0
                        }).get('morph').chain(function () {
                            this.el.dispose();
                        }.bind(this));
                    }.bind(this)
                }
            });
        }else{
            var lineHeight = 180;
            var height = 240
            var background = 'url(../images/nuvem-small.png)'
            this.button = ""
        }
        this.el = new Element('div', {
            'class': 'message',
            'styles': {
                'position': 'absolute',
                'width': '100%',
                'height': height,
                'top': '50%',
                'margin-top': -170,
                'left': window.getSize().x,
                'opacity': 0,
                'background-image': background,
            },
            'morph': {
                'duration': 750,
                'transition': Fx.Transitions.Quint.easeIn
            }
        }).adopt(
            new Element('p', {
                'text': message,
                'styles': {
                    'width': '550px',
                    'font-size': '50px',
                    'text-align': 'center',
                    'color': '#5fb0e5',
                    'font-weight': 'bold',
                    'margin': '0 auto',
                    'line-height': lineHeight,
                    'margin-top': marginTop
                }
            })
        ).adopt(this.button).inject($$('body')[0]);

        this.el.morph({
            'left': 0,
            'opacity': 1
        });

    }

});