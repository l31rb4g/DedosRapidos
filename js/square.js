Square = new Class({

    initialize: function(){
        this.Fx = {
            transition: Fx.Transitions.Linear,
            duration: Game.tweenDuration
        };
        this.createElement();
    },

    createElement: function(){
        var size = {x:50, y:50};
        var _left = (Math.random() * (window.getSize().x - size.x)).toInt();
        var num = String((Math.random() * 10).toInt());

        this.el = new Element('div', {
            'class': 'square',
            'text': num,
            'styles': {
                'left': _left
            },
            'tween': this.Fx
        });

        var endTop = window.getSize().y;

        this.el.inject($$('body')[0]);
        this.el.tween('top', endTop).get('tween').chain(function(){
            this.el.dispose();
            if (Game.running){
                Game.loseLife();
            }
        }.bind(this));
    }

});
