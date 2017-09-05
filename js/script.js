$(function() {

    function randomString() {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
        var str = '';
        for (i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }

    function randomColor() {
        var letters = '45678ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.round(Math.random() * letters.length)];
        }
        return color;
    }


    
    function Column(name) {
        var self = this; // useful for nested functions

        this.$id = randomString();
        this.name = name;
        this.$element = createColumn();

        function createColumn() {
            // CREATING COMPONENTS OF COLUMNS
            var $column = $('<div>').addClass('column').attr('id', randomString()).css({'boxShadow' : '0 0 5px ' + randomColor(),
   'background-color' : randomColor()});
            //  Jak mieć dwa razy ten sam randomColor? Dla box-shadow i background-color?
   
            var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
            var $columnCardList = $('<ul>').addClass('column-card-list');
            var $columnDelete = $('<button><i class="fa fa-2x fa-trash-o" aria-hidden="true"></i>').addClass('btn-delete');
            var $columnAddCard = $('<button>').addClass('add-card').text('Dodaj kartę');

            // ADDING EVENTS
            $columnDelete.click(function() {
                self.removeColumn();
            });
            $columnAddCard.click(function(event) {
                self.addCard(new Card());
            });



            // CONSTRUCTION COLUMN ELEMENT
            $column.append($columnTitle)
                .append($columnDelete)
                .append($columnAddCard)
                .append($columnCardList);

            // RETURN OF CREATED COLUMN
            return $column;
            }   // end of createColumn()

            


        Column.prototype.addCard = function(Card) {
              this.$element.children('ul').append(Card.$element);
        };
        Column.prototype.removeColumn = function() {
              this.$element.remove();
        };
        
    }



    function Card(description) {
        var self = this;

        this.id = randomString();
        this.description = prompt('Line 79: descr card', 'opis karty');
        this.$element = createCard(); //

        function createCard() {
            var $card = $('<li>').addClass('card');
            var $cardDescription = $('<p>').addClass('card-description').text(self.description);
            var $cardDelete = $('<button>').addClass('btn-delete').text('x');
            $cardDelete.click(function(){
              self.removeCard();
            });
            $card.append($cardDelete)
            .append($cardDescription);
            return $card;
        }

        Card.prototype.removeCard = function() {
            this.$element.remove();
        };
    }



    var board = {
        name: 'Kanban Board',
        addColumn: function(column) {
          this.$element.append(column.$element);
          initSortable();
        },
        $element: $('#board .column-container')
    };

    function initSortable() {
       $('.column-card-list').sortable({
            connectWith: '.column-card-list',
            placeholder: 'card-placeholder'
        }).disableSelection();
     }

    $('.create-column')
        .click(function(){
            var name = prompt('Line 108: Enter a column name');
            var column = new Column(name);
            board.addColumn(column);
        });

});