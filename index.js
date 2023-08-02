const express = require('express'); //
const cors = require('cors');
const bodyParser = require('body-parser'); // 
const serveStatic = require('serve-static');
const path = require('path');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use('/', serveStatic(path.join(__dirname, 'public'))); 

let playerLatinum = 100;

const rollDie = () => Math.floor(Math.random() * 6) + 1;

app.post('/play', (req, res) => {
    const playerBet = req.body.bet;

    if (playerBet > playerLatinum) {
        res.json({
            message: 'You do not have enough latinum for this bet!',
            playerLatinum: playerLatinum
        });
        return;
    }

    const player1Roll = rollDie();
    const player2Roll = rollDie();

    if (player1Roll > player2Roll) {
        playerLatinum += playerBet;
        res.json({
            message: `Player 1 wins with a roll of ${player1Roll} against Player 2's roll of ${player2Roll}. You won ${playerBet} bars of latinum!`,
            playerLatinum: playerLatinum
        });
    } else if (player2Roll > player1Roll) {
        playerLatinum -= playerBet;
        res.json({
            message: `Player 2 wins with a roll of ${player2Roll} against Player 1's roll of ${player1Roll}. You lost ${playerBet} bars of latinum!`,
            playerLatinum: playerLatinum
        });
    } else {
        res.json({
            message: `It's a draw, both players rolled a ${player1Roll}`,
            playerLatinum: playerLatinum
        });
    }
});

app.listen(port, () => {
    console.log(`Ferengi Tanga Game server listening at http://localhost:${port}`);
});
