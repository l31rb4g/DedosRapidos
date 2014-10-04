Game = {

    running: true,

    initialize: function(){

        this.currentLevel = 1;
        this.tweenDuration = 8000;
        this.creationInterval = 2000;
        this.lives = 3;
        this.hearts = 3;

        this.brokenSquares = 0;

        this.addEvents();

        setInterval(function(){
            if (Game.running) {
                this.nextLevel();
            }
        }.bind(this), 5000);

        new Message('Prepare-se!');

        setTimeout(function(){
            this.start();
        }.bind(this), 2000)

    },

    addEvents: function(){
        $$('body')[0].set('tween', {duration: 250});

        $$('body')[0].addEvent('keydown', function(ev){
            if (ev.code == 19){
                //alert('PAUSE');
            }

            if (Game.running){
                if (String(ev.key).match(/^[0-9]$/)){
                    var gotElement = false;

                    var exit = false;
                    $$('body > .square').each(function(el){
                        if (!exit){
                            if (el.get('text') == ev.key){
                                el.retrieve('instance').explode();
                                gotElement = true;
                                exit = true;
                                this.addScore(this.currentLevel);
                            }
                        }
                    }.bind(this));

                    if (gotElement){
                        this.brokenSquares++;
                    } else {
                        Game.loseLife();
                    }
                }
            }
        }.bind(this));
    },

    start: function(){

        this.brokenSquares = 0;

        this.mainInterval = setInterval(function(){
            if (this.running){
                new Square();
            }
        }.bind(this), this.creationInterval);

        new Square();

    },

    stop: function(){
        clearInterval(this.mainInterval);
    },

    restart: function(){
        this.stop();
        this.start();
    },

    addScore: function(n){
        var currentScore = this.score.get('text').toInt();
        currentScore += n;
        this.score.set('text', currentScore);
    },

    loseLife: function(){
        if (Game.running) {
            if (Game.hearts == 0) {
                Game.gameOver();
            } else {
                Game.hearts--;
                $$('body')[0].setStyle('background-color', '#f00').tween('background-color', '#fff');
                var lastFullHeart = $$('#life .heart.full');
                lastFullHeart[lastFullHeart.length - 1].removeClass('full');
            }
        }
    },

    gameOver: function(){
        this.running = false;
        this.stop();
        this.gameOverMessage = new Message('GAME OVER', {
            close: false
        });
    },

    nextLevel: function(){
        this.currentLevel++;

        var newDuration = (this.tweenDuration * 0.9).toInt();
        this.tweenDuration = newDuration;

        var newInterval = (this.creationInterval * 0.9).toInt();
        this.creationInterval = newInterval;

        this.restart();
    }

};