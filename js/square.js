Square = new Class({

    initialize: function(game){
        this.game = game;
        d = this.game.tweenDuration;
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
        var size = {x:90, y:150};
        var _left = (Math.random() * (window.getSize().x - size.x)).toInt();
        var num = String((Math.random() * 10).toInt());

        this.el = new Element('div', {
            'class': 'square',
            'text': num,
            'styles': {
                'width': 90,
                'height': 150,
                'line-height': 170,
                'top': -size.y,
                'left': _left
            },
            'tween': this.Fx
        });

        this.el.store('instance', this);

        var endTop = window.getSize().y;

        this.el.inject($$('body')[0]);
        this.el.tween('top', endTop).get('tween').chain(function(){
            this.el.dispose();
            if (this.game.running){
                this.game.loseLife();
                this.game.brokenSquares++;
            }
        }.bind(this));
    },

    explode: function(){
        this.el.get('tween').cancel();
        var t = String(new Date().getTime());
        this.el.set('text', '').adopt(new Element('img', {
            'src': '/images/bomb-exploding.gif?t=' + t
        })).setStyle('background', 'none');
        setTimeout(function(){
            this.el.dispose();
            this.game.removeSquare(this);
        }.bind(this), 500);
    }

});
