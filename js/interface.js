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