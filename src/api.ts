import { Router } from "express";
import { redisClient } from "./app";
import gamelist from "./gamelist.json";

const router = Router();

router.get("/", async (_req, res, _next) => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }

  const result = await redisClient.json.get("ldn");

  if (result == null || typeof result != "object") {
    return res.sendStatus(404);
  }

  return res.send(result);
});

router.get("/public_games", async (req, res, _next) => {
  let gameFilter = "";

  if (req.query.titleid != null && (req.query.titleid as string)?.length > 0) {
    gameFilter = req.query.titleid as string;
  }

  if (!redisClient.isOpen) {
    await redisClient.connect();
  }

  const results = await redisClient.json.get("games");

  if (results == null || typeof results != "object") {
    return res.sendStatus(404);
  }

  const games = Object.entries(results)
    .map(([_, game]) => {
      const modifiedGame = { ...game };
      
      const gameListEntry = gamelist.find(
        g => g.id.toLowerCase() === `0x${game.title_id.toLowerCase()}`
      );

      if (gameListEntry) {
        modifiedGame.game_name = gameListEntry.name;
      }

      return modifiedGame;
    })
    .filter(game => {
      // Hide ghost lobbies (assume anything older than 16 hours)
      return game.created_at > Date.now() - 57600000;
    });

  if (gameFilter.length > 0) {
    return res.send(games.filter((game) => game.title_id === gameFilter));
  }

  return res.send(games);
});

export default router;
