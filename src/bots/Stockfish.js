const stockfish = require("stockfish");
const ChessUtils = require("../utils/ChessUtils");

var engine = stockfish();
engine.onmessage = function(e) {
    console.log(e);
    var gBM = e; // getBestMove
    if (typeof gBM === "string") {
        gBM = gBM.split("");
        if (gBM[0] === "b") {
            gBM = gBM.join("").split(" ")[1];
            console.log(gBM);
            return gBM;
        }
    }
};

class StockfishEngine {

    constructor() {
        this.timeLeft = 15000;
    }
    getNextMove(moves) {
        return new Promise(r=>{
            const chess = new ChessUtils();
            chess.applyMoves(moves);
            engine.postMessage("position fen " + chess.fen());
            if (this.timeLeft > 15000) {
                engine.postMessage("go movetime 1000"); // Think 1s per move
                console.log(this.timeLeft);
            } else {
                engine.postMessage("go movetime 100"); // Think 1s per move
                console.log(this.timeLeft + '    <  ----');
            }
            console.log("position fen " + chess.fen());
            engine.onmessage = function(e) {
                console.log(e);
                var gBM = e; // getBestMove
                if (typeof gBM === "string") {
                    gBM = gBM.split("");
                    if (gBM[0] === "b") {
                        gBM = gBM.join("").split(" ")[1];
                        console.log(gBM);
                        r(gBM);
                    }
                }
            };
        });
    }

    getReply(chat) {
        return "@seanysean testing @tailuge's stuff."
    }
    
}

/*const sf = new StockfishEngine();
sf.getNextMove(['e2e3','e7e5','d1h5','d7d5']);*/

module.exports = StockfishEngine;

