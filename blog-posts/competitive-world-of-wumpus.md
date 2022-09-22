Competitive World of Wumpus
Documenting my hands on competition to teach AI development
1658600150
## What is World of Wumpus?
This project is based on the World of Wumpus, a toy game coined by early AI  
researchers to put their AIs to practice. The game is set in a 2D tile map  
with pits, Wumpus (a monster), and treasure. The objective is for the  
playing AI to traverse the map to find treasure without running into either  
the pits or Wumpus.

However, the AI is only able to observe a subset of the world through  
the use of their limited sensors. When the AI is on a tile, they can  
only tell:

- If there is a stench (an adjacent tile contains Wumpus)
- If there is a breeze (an adjacent tile contains a pit)
- If there is a shine (an adjacent tile contains treasure)

As the AI wanders around, they take stock of their surroundings and  
attempt to guess what the world around them is like (i.e. if the tile  
next to them is dangerous or not). By combining their observations with  
logic, they can more confidently reach their objectives.

## Project Purpose
There are plenty of online JS versions of this game, like on this person's [Github](https://thiagodnf.github.io/wumpus-world-simulator/). And while this game is easy enough to play for a human, programming an AI to play the game is a good way to introduce someone to coding bots. This project turns WoW into a competitive game by pitting these bots against each other in concurrent, networked game play.

When I was learning programming, an upperclassman setup a coding competition where students would score points by solving FizzBuzz problems. At every session, the room was packed with competitors all trying to complete the problem set faster than anyone else; the intensity of these competitions made learning to code more exciting.

My project borrows from the same spirit: ideally this competition would be played in a room with a large projector screen so that everyone can see the scoreboard and AI gameplay.

## Competition
This program is split up into a competition server and the client AIs.  
The server is already implemented along with the client networking code.  
All that is left is for a competitor to implement the logic behind their  
AI.

Once each competitor is ready, they connect to the server and   
concurrently play their own games of World of Wumpus. For each map   
provided in the maps directory, the server:

1. Makes sure each competitor is connected to the TCP server
2. Informs each client the match is starting and informs them of game   
   metadata such as width/height
3. Prompts each client to make a decision
  1. Provides the observable world state
  2. Waits until they respond with their movement direction
4. Stalls until all able clients respond
  1. Clients are **disabled** if:
    1. They disconnect (killed until the next match)
    2. They die to Wumpus or a pit
    3. They completed the match by collecting all golds
5. Repeats step 2-4 until all clients are **disabled** (the match  
   is over)

The server will repeat steps 1-5 for each provided map, then spit out  
scores at the end.

## Repository and Plans
My latest work is available on Github at this [repository](https://github.com/jnorman-us/competitive-wow). In the next few pushes, I intend to add:

- 2D graphic map drawn by the server using Java Graphics
- Time limits to decision making
- Killing the Wumpus by stabbing in a direction
- Scores based on how many moves were used, gold collected, and monsters slain
- Scoreboard tallied over however many games are played

Of course, I will keep the blog updated with more posts, screenshots, and results.