Interface = new Class({

    initialize: function(){
        this.playerLives();
        this.createScore();
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
    },

    createScore: function(){
        Game.score = new Element('span', {'text': '0'});

        new Element('div', {
            'styles': {
                'position': 'absolute',
                'top': 30,
                'left': 10
            }
        }).adopt(
            new Element('span', {'text': 'score: '}),
            Game.score
        ).inject($$('body')[0]);
    }

});