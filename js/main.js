window.addEvent('domready', function(){

    Game.initialize();
    new Interface();

});


Interface = new Class({

    initialize: function(){
        this.playerLives();
    },

    playerLives: function(){
        this.life = new Element('div', {
            'id': 'life'
        });

        for (var i=0; i<Game.lives; i++){
            var el = new Element('div', {
                'class': 'heart'
            });
            if (i < Game.hearts){
                el.addClass('full');
            }
            el.inject(this.life);
        }

        this.life.inject($$('body')[0]);
    }

});


Game = {

    running: true,

    initialize: function(){

        this.currentLevel = 1;
        this.squareQuantity = 5;
        this.tweenDuration = 5000;
        this.creationInterval = 500;
        this.lives = 3;
        this.hearts = 3;

        this.addEvents();

        this.start();

    },

    addEvents: function(){
        $$('body')[0].set('tween', {duration: 250});

        $$('body')[0].addEvent('keydown', function(ev){

            if (Game.running){

                if (String(ev.key).match(/[0-9]/)){
                    var gotElement = false;

                    $$('body > .square').each(function(el){
                        if (el.get('text') == ev.key){
                            el.dispose();
                            el.get('tween').cancel();
                            gotElement = true;
                        }
                    }.bind(this));

                    if (!gotElement){
                        Game.loseLife();
                    }
                }
            }
        });
    },

    start: function(){

        for (var i=0; i<Game.squareQuantity; i++){
            setTimeout(function(){
                if (this.running){
                    new Square();
                }
            }.bind(this), this.creationInterval * i)
        }

    },

    loseLife: function(){
        if (Game.hearts == 0){
            Game.gameOver();
        } else {
            Game.hearts--;
            $$('body')[0].setStyle('background-color', '#f00').tween('background-color', '#fff');
            var lastFullHeart = $$('#life .heart.full');
            lastFullHeart[lastFullHeart.length - 1].removeClass('full');
        }

    },

    gameOver: function(){
        alert('GAME OVER!');
        this.running = false;
        $$('.square').dispose();
    }

};

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
