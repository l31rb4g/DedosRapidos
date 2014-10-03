Game = {

    running: true,

    initialize: function(){

        this.currentLevel = 1;
        this.squareQuantity = 5;
        this.tweenDuration = 8000;
        this.creationInterval = 1000;
        this.lives = 3;
        this.hearts = 3;

        this.brokenSquares = 0;

        this.addEvents();

        this.start();

    },

    addEvents: function(){
        $$('body')[0].set('tween', {duration: 250});

        $$('body')[0].addEvent('keydown', function(ev){

            if (Game.running){

                if (String(ev.key).match(/^[0-9]$/)){
                    var gotElement = false;

                    var exit = false;
                    $$('body > .square').each(function(el){
                        if (!exit){
                            if (el.get('text') == ev.key){
                                el.dispose();
                                el.get('tween').cancel();
                                gotElement = true;
                                exit = true;
                            }
                        }
                    }.bind(this));

                    if (gotElement){
                        this.brokenSquares++;
                        this.checkVictory();
                    } else {
                        Game.loseLife();
                    }
                }
            }
        }.bind(this));
    },

    start: function(){

        this.brokenSquares = 0;

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
    },

    checkVictory: function(){
        if (Game.squareQuantity <= this.brokenSquares){
            new Message('Level ' + this.currentLevel + ' concluído!');
            this.nextLevel();
        }
    },

    nextLevel: function(){
        this.currentLevel++;
        var newQuantity = (this.squareQuantity * 1.25).toInt();
        this.squareQuantity = newQuantity;

        var newDuration = (this.tweenDuration * 0.75).toInt();
        this.tweenDuration = newDuration;

        var newInterval = (this.creationInterval * 0.75).toInt();
        this.creationInterval = newInterval;

        setTimeout(function(){
            this.start();
        }.bind(this), 2000);
    }

};