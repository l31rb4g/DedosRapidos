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

        this.life.inject($$('.container')[0]);
    },

    createScore: function(){
        Game.score = new Element('span', {'text': '0'});

        new Element('div', {
            'class': 'score'
        }).adopt(
            new Element('span', {'text': 'Score: '}),
            Game.score
        ).inject($$('.container')[0]);
    }

});