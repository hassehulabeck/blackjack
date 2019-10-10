var deck = [];
var suits = ["hearts", "clubs", "diamonds", "spades"];
var ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
var dealer = {
    hand: [],
    canContinue: true,
    isBusted: false,
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
    let names = ["Ali", "Bashir", "Claudia", "Des", "Erica", "Filip", "Gunnar"];

    // Placera dealern som player 0.
    players.push(dealer);

    for (let i = 0; i < antal; i++) {
        players.push({
            hand: [],
            name: names[Math.floor(Math.random() * names.length)],
            isBusted: false,
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

function sortHand() {
    players.forEach(function (player) {
        let aceIndex = player.hand.findIndex(function (kort) {
            return kort.rank == "A"
        });
        if (aceIndex != -1) {
            let temp = player.hand.splice(aceIndex, 1);
            player.hand.push(temp[0]);
        }
    });
}

function sumCards() {
    players.forEach(function (player) {
        // Nollställ total.
        player.total = null;
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
        })
    })
}

function isPlayerBusted() {
    // Har spelaren fått mer än 21?
    players.forEach(function (player) {
        if (player.total > 21) {
            player.isBusted = true;
        }
    })
}

function status() {
    // Visa spelarnas kortsummma.
    players.forEach(function (player, index) {
        if (index == 0) {
            // Visa endast dealerns andra kort (det första är dolt för spänningens skull, samt för att göra det svårare för spelarna.)
            console.log("Dealer: " + player.hand[1].rank);
        } else {
            // Alla andra är spelare.
            if (!player.isBusted)
                console.log(player.name + ": " + player.total)
            else
                console.log(player.name + ": " + player.total + ' BUSTED!')
        }
    })

}


function hitMe(player) {
    // En funktion för att ta ett kort till. Anropas med indexnummer.
    players[player].hand.push(deck.pop());
    sumCards();
}

function dealerCount() {
    dealer.total = null;
    dealer.hand.forEach(function (kort) {
        // Börja med att kolla totalvärdet, och fortsätt om det är mindre än 17.
        if (dealer.total < 17) {
            if ((ranks.indexOf(kort.rank) > 8) &&
                (ranks.indexOf(kort.rank) < 12)) {
                // Klädda kort.
                dealer.total += 10;
            } else if (ranks.indexOf(kort.rank) == 12) {
                // Äss.
                if (dealer.total < 11) {
                    dealer.total += 11;
                } else {
                    dealer.total += 1;
                }
            } else {
                dealer.total += kort.rank;
            }
        } else {
            dealer.canContinue = false;
        }
    })

}

function checkResults() {
    players.forEach(function (player, index) {
        if (index > 0) {
            if (player.isBusted) {
                console.log(player.name + ": Dealer wins")
            } else {
                if (player.total > dealer.total) {
                    console.log(player.name + " har vunnit")
                } else {
                    // Dealern vinner både om den har bättre hand och om den har samma hand som spelaren.
                    console.log("Dealern har vunnit mot " + player.name)
                }
            }
        }
    })
}

function revealDealersHand() {
    // En funktion för att "flippa upp" det dolda kortet hos dealern.
    console.log("Dealer: " + dealer.hand[0].rank + "+" + dealer.hand[1].rank)
    console.log(dealer.total)
    if (!dealer.canContinue) {
        console.log("Dealer has to stop");
    }
}

// Initiera och dela ut två kort till alla.
createDeck();
shuffleArray(deck);
createPlayers(3);
dealCards(2);
sumCards();