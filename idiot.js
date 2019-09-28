var deck = [];
var suits = ["hearts", "clubs", "diamonds", "spades"];
var ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
var cardTable = [
    [],
    [],
    [],
    []
];

function createDeck() {
    suits.forEach(function (suit) {
        ranks.forEach(function (rank) {
            deck.push({
                suit: suit,
                rank: rank
            })
        })
    })
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function fourNewCards() {
    cardTable[0].push(deck.pop());
    cardTable[1].push(deck.pop());
    cardTable[2].push(deck.pop());
    cardTable[3].push(deck.pop());
}
createDeck();
shuffleArray(deck);
fourNewCards();