import { RequestHandler } from "express";

interface PlayerProps {
  id: number;
  nickName: string;
  age: number;
  level: number;
  classType: string;
  description: string;
}

const players: PlayerProps[] = [];

const id = (() => {
  let _id = 0;
  return () => ++_id;
})();

export const playersPostOne: RequestHandler = async (req, res) => {
  const player = req.body;

  const playerToInsert = { id: id(), ...player };

  players.push(playerToInsert);

  res.status(201).json(playerToInsert);
};

export const playersGetMany: RequestHandler = async (req, res) => {
  res.status(200).json(players);
};

export const playersGetOne: RequestHandler = async (req, res) => {
  const { playerId } = req.params as any;

  const playerFound = players.find((item) => item.id === playerId);

  if (!playerFound) {
    res.status(404).json({ message: "player not found" });
    return;
  }

  res.status(200).json(playerFound);
};

export const playersPatchOne: RequestHandler = async (req, res) => {
  const { playerId } = req.params as any;

  const index = players.findIndex((item) => item.id === playerId);

  if (index === -1) {
    res.status(404).json({ message: "player not found" });
  }

  const player = { ...players[index], ...req.body };

  players[index] = player;

  res.status(200).json(player);
};

export const playersDeleteOne: RequestHandler = async (req, res) => {
  const { playerId } = req.params as any;

  const index = players.findIndex((item) => item.id === playerId);
  if (index === -1) {
    res.status(404).json({ message: "player not found" });
  }

  players.splice(index, 1);

  res.status(204).end();
};
