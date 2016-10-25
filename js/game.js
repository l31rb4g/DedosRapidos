Game = {

    running: true,

    initialize: function(){

        this.currentLevel = 1;
        this.tweenDuration = 6000;
        this.creationInterval = 800;
        this.hearts = 3;

        this.brokenSquares = 0;
        this.squares = [];

        this.addEvents();

        new Message('Prepare-se!');
    },

    addEvents: function(){
        $$('body')[0].set('tween', {duration: 250});

        $$('body')[0].addEvent('keydown', function(ev){
            if (ev.code == 19){
                if (this.paused){
                    this.resume();
                } else {
                    this.pause();
                }
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
    
    startTimer: function(){
        this.mainInterval = setInterval(function(){
            if (this.running){
                this.squares.push(new Square(this));
            }
        }.bind(this), this.creationInterval);
    },

    start: function(){
        this.brokenSquares = 0;
        this.startTimer();
        this.squares.push(new Square(this));
    },
    
    pause: function(){
        this.paused = true;
        clearInterval(this.mainInterval);
        this.squares.each(function(el){
            el.el.get('tween').pause();
        });
    },
    
    resume: function(){
        this.paused = false;
        this.startTimer();
        this.squares.each(function(el){
            el.el.get('tween').resume();
        });
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
        
        if (currentScore % 4 == 0){
            this.nextLevel();
        }
    },
    
    removeSquare: function(square){
        this.squares.splice(this.squares.indexOf(square), 1);
    },

    loseLife: function(){
        if (Game.running) {
            if (Game.hearts == 0) {
                Game.gameOver();
            } else {
                Game.hearts--;
                $$('body')[0].setStyle('opacity', '0.4').tween('opacity', '1');
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
        this.squares.each(function(el){
            el.el.get('tween').stop();
        });
        setTimeout(function(){
            this.squares.each(function(el){
                el.el.tween('opacity', 0);
            });
        }.bind(this), 1000);

        setTimeout(function(){
            new LightBox();
            $$('.pontuacao span')[0].set('text', $$('.sc')[0].get('text'));
        }, 2000);

    },

    nextLevel: function(){
        var t = this.tweenDuration * 0.95;
        if (t < 50) t = 50;
        this.tweenDuration = t;
        
        t = this.creationInterval * 0.95;
        if (t < 1000) t = 1000;
        this.creationInterval = t;
        
        this.currentLevel++;

        var newDuration = (this.tweenDuration * 0.9).toInt();
        this.tweenDuration = newDuration;

        var newInterval = (this.creationInterval * 0.9).toInt();
        this.creationInterval = newInterval;

        //this.restart();
    }

};
