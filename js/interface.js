Interface = new Class({

    initialize: function(){
        this.createScenario();
        this.playerLives();
        this.createScore();
    },
    
    createScenario: function(){
        new Element('div', {'class': 'board'}).adopt(
            new Element('div', {'class': 'container'})
        ).inject($$('body')[0]);
        new Element('div', {
            'id': 'by',
            'text': 'by l31rb4g and RojuebS'
        }).inject($$('body')[0]);
    },

    playerLives: function(){
        this.life = new Element('div', {
            'id': 'life'
        });

        for (var i=0; i<Game.hearts; i++){
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
        Game.score = new Element('span', { 'class': 'sc', 'text': '0'});

        new Element('div', {
            'class': 'score'
        }).adopt(
            new Element('span', {'text': 'Score: '}),
            Game.score
        ).inject($$('.container')[0]);
    }

});