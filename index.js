class Player{
    constructor(name){
        this.name = name;
        this.playerCards = [];
        this.selectedCard = [];
        this.points = 0;
    }
}
//This is the card class where the card info is stored
class Cards {
    constructor(){
        this.cards = ['Ace',2,3,4,5,6,7,8,9,10,'Jack','Queen','King'];
        this.suit = ['♣️','♠️','❤️','🍀'];
        this.deck = [];
        this.splitDeck1 = [];
        this.splitDeck2 = [];
        
    };
    //I decided to code a card generator as well a way to randomly split the cards between the players
    createDeck(){
        for(var x = 0; x < this.suit.length ; x++){
            for(let i = 0; i < this.cards.length ; i++){
                this.deck.push(`${this.suit[x]}${this.cards[i]}`);
                }
        }return(this.deck);
        
    };
    splitDeck() {
        for( let i = 0; i < 26; i++){
            let randomArrayNum = (Math.floor(Math.random() * this.deck.length));
            this.splitDeck1.push(this.deck[randomArrayNum]);
            this.deck.splice(randomArrayNum, 1);;
        };
        for( let i = 0; i < 26; i++){
            let randomArrayNum = (Math.floor(Math.random() * this.deck.length));
            this.splitDeck2.push(this.deck[randomArrayNum]);
            this.deck.splice(randomArrayNum, 1);;
        };
    }; 
};

class Menu{
    constructor(){
        this.numOfWar = 0;
    }
    start() {
        //where the players and deck is created and infor is pushed to where it needs to go
        let roundCount = 1
        console.log('Welcome to the War card game.\n The game will start now!!');
        var player1 = new Player();
        var player2 = new Player();
        var newDeck = new Cards();
        newDeck.createDeck();
        newDeck.splitDeck();
        player1.playerCards = player1.playerCards.concat(newDeck.splitDeck1);
        player2.playerCards = player2.playerCards.concat(newDeck.splitDeck2);
        
        //This is the main code of the game to determine which card is higher and 
        while(Object.keys(player1.playerCards).length >= 1 && Object.keys(player2.playerCards).length >= 1) {
            player1.selectedCard = player1.playerCards.splice(0, 1);
            player2.selectedCard = player2.playerCards.splice(0, 1);
            //This is where I call the FindKings function to determine the value of the card flipped to make compairsons eaiser
            var cardNum1 = this.findKings(player1.selectedCard);
            var cardNum2 = this.findKings(player2.selectedCard);
            
            console.log(`Round: ${roundCount}`)
            console.log(`Player 1's card is (${player1.selectedCard.join('')}): Player 2's card is (${player2.selectedCard})`)
            if(cardNum1 > cardNum2) {
                player1.playerCards.push(player1.selectedCard[0]);
                player1.playerCards.push(player2.selectedCard[0]);
                console.log('Player 1 has the larger card and wins this round!');
                player1.points += 1;
                player1.selectedCard.splice(0, 1);
                player2.selectedCard.splice(0, 1);
            }
            else if(cardNum1 < cardNum2) {
                player2.playerCards.push(player1.selectedCard[0]);
                player2.playerCards.push(player2.selectedCard[0]);
                console.log('Player 2 has the larger card and wins this round!');
                player2.points += 1;
                player1.selectedCard.splice(0, 1);
                player2.selectedCard.splice(0, 1);
            }
            //This is the war mechanic where it pulls 4 cards from the deck compairs the top card then rewards to the winner
            else if(cardNum1 == cardNum2) {
                console.log('This is WAR!!!');
                this.numOfWar += 1;
                player1.playerCards.splice(2, 0, player1.selectedCard[0]);
                player2.playerCards.splice(2, 0, player2.selectedCard[0]);
                let p1War = player1.playerCards.splice(0, 4);
                let p2War = player2.playerCards.splice(0, 4);
                let warWinner = p1War.concat(p2War);
                
                if(this.findKings(p1War) > this.findKings(p2War)){
                    console.log(`Player 1 draws: (${p1War[0]}), Player 2 draws: (${p2War[0]}). \nPlayer 1 wins`);
                    player1.playerCards = player1.playerCards.concat(warWinner);
                    player1.points += 1;
                    
                }else if(this.findKings(p1War) < this.findKings(p2War)){
                    console.log(`Player 1 draws: (${p1War[0]}), Player 2 draws: (${p2War[0]}). \nPlayer 2 wins`);
                    player2.playerCards = player2.playerCards.concat(warWinner);
                    player2.points += 1;
                }else {
                    console.log(`Player 1 draws: (${p1War[0]}), Player 2 draws: (${p2War[0]}). \nIt's a tie. Draw again`);
                    console.log(player1.playerCards);
                    console.log(player2.playerCards);
                    player1.playerCards.push(p1War);
                    player2.playerCards.push(p2War);
                    console.log(player1.playerCards);
                    console.log(player2.playerCards);
                    console.log(p1War);
                    console.log(p2War);
                };
                p1War.splice(0, 3);
                p2War.splice(0, 3);   
            };
            roundCount += 1;
            player1.selectedCard.pop;
            player2.selectedCard.pop;
            
            console.log('---------------End Of Round----------------\n');
            
            //I put a point limit on the game so it doesnt run forever 
            if(player1.points > 500 || player2.points > 500){
                break;
            }else if(Object.keys(player1.playerCards).length == 0 || Object.keys(player2.playerCards).length == 0){
                if(Object.keys(player1.playerCards).length == 0){
                    console.log("Player 1 ran out of cards")
                }else if(Object.keys(player2.playerCards).length == 0){
                    console.log("Player 2 ran out of cards")
                }
            }
        //Where I compair scores and print the winner 
        }if(player1.points > player2.points){
            console.log("Player 1 Wins!!!")
        }else if(player1.points < player2.points){
            console.log("Player 2 Wins!!!")
        }else {
            console.log("It's a tie!!!")
        }console.log(`Player 1 Score: ${player1.points} --- Player 2 Score: ${player2.points}`)
        console.log(`War total is: ${this.numOfWar}`);
    }
    //This is the function I use to split the card and determine if its a number card or a face card and assign a value to a face card
    findKings(z) {
        const myJSON = JSON.stringify(z);
        let card = myJSON.split("");
        if(card[4] == 'K'){
            return(13);
        }else if(card[4] == 'Q'){
            return(12);
        }else if(card[4] == 'A'){
            return(1);
        }else if(card[4] == 'J'){
            return(11);
        }else if (parseInt(card[4]) == 1) {
            return(10);
        }else{
            return(parseInt(card[4]));
        }
    };
};
let menu = new Menu;
menu.start();