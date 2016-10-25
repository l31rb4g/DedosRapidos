Square = new Class({

    initialize: function(game){
        this.game = game;
        d = Game.tweenDuration;
        d += Math.random() * (d * 0.2);
        this.Fx = {
            transition: Fx.Transitions.Linear,
            duration: d,
            onComplete: function(){
                this.game.removeSquare(this);
            }.bind(this)
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
                'top': -100,
                'left': _left
            },
            'tween': this.Fx
        });

        this.el.store('instance', this);

        var endTop = window.getSize().y;

        this.el.inject($$('body')[0]);
        this.el.tween('top', endTop).get('tween').chain(function(){
            this.el.dispose();
            if (Game.running){
                Game.loseLife();
                Game.brokenSquares++;
            }
        }.bind(this));
    },

    explode: function(){
        this.el.get('tween').cancel();
        var _top = this.el.getStyle('top').toInt() - 75;
        var _left = this.el.getStyle('left').toInt() - 75;
        this.el.set('morph', {
            'duration': 100,
            'transition': Fx.Transitions.Linear
        });
        this.el.morph({
            'width': 200,
            'height': 200,
            'top': _top,
            'left': _left,
            'line-height': 200,
            'opacity': 0
        }).get('morph').chain(function(){
            this.el.dispose();
        }.bind(this));
        this.game.removeSquare(this);
    }

});
