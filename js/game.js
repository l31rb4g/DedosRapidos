Game = {

    running: true,

    initialize: function(){

        this.currentLevel = 1;
        this.squareQuantity = 10;
        this.tweenDuration = 6000;
        this.creationInterval = 1000;
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