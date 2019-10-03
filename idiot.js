var deck = [];
var suits = ["hearts", "clubs", "diamonds", "spades"];
var ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
var dealer = {
    hand: [],
    isActive: true,
    total: null
}
var players = [];

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

function createPlayers(antal) {
    for (let i = 0; i < antal; i++) {
        players.push({
            hand: [],
            name: "player" + i,
            isActive: true,
            total: null
        })
    }
}

function dealCards(antal) {
    for (let i = 0; i < antal; i++) {
        players.forEach(function (player) {
            player.hand.push(deck.pop());
        })
    }
}

function sumCards() {
    players.forEach(function (player) {
        player.hand.forEach(function (kort) {
            if ((ranks.indexOf(kort.rank) > 8) &&
                (ranks.indexOf(kort.rank) < 12)) {
                // Klädda kort.
                player.total += 10;
            } else if (ranks.indexOf(kort.rank) == 12) {
                // Äss.
                if (player.total < 11) {
                    player.total += 11;
                } else {
                    player.total += 1;
                }
            } else {
                player.total += kort.rank;
            }
            // Men vad händer om vi har flera äss?
        })
    })
}

createDeck();
shuffleArray(deck);
createPlayers(2);
dealCards(2);
sumCards();