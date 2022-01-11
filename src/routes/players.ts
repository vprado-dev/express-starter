import { Router } from "express";
import {
  playersDeleteOne,
  playersGetMany,
  playersGetOne,
  playersPatchOne,
  playersPostOne,
} from "../endpoint/players";
import { auth } from "../middlewares/auth";
import { body, params } from "../utils/requestsValidations";
import {
  playersGetOneParams,
  playersPatchOneBody,
  playersPostOneBody,
} from "../validations/players";

const router = Router();

/**
 * POST /players
 * @tag Players
 * @security BearerAuth
 * @bodyContent {PlayerPostBody} application/json
 * @response 201
 * @responseContent {Player} 201.application/json
 * @response default
 * @responseContent {Error} default.application/json
 */
router.post("/players", auth, body(playersPostOneBody), playersPostOne);

/**
 * GET /players
 * @tag Players
 * @response 200
 * @responseContent {Player[]} 200.application/json
 * @response default
 * @responseContent {Error} default.application/json
 */
router.get("/players", playersGetMany);

/**
 * GET /players/{playerId}
 * @tag Players
 * @pathParam {string} playerId
 * @response 200
 * @responseContent {Player} 200.application/json
 * @response default
 * @responseContent {Error} default.application/json
 */
router.get("/players/:playerId", params(playersGetOneParams), playersGetOne);

/**
 * PATCH /players/{playerId}
 * @tag Players
 * @security BearerAuth
 * @pathParam {integer} playerId
 * @bodyContent {PlayersPatchOneBody} application/json
 * @response 200
 * @responseContent {Player} 200.application/json
 * @response default
 * @responseContent {Error} default.application/json
 */
router.patch(
  "/players/:playerId",
  auth,
  params(playersGetOneParams),
  body(playersPatchOneBody),
  playersPatchOne,
);

/**
 * DELETE /players/{playerId}
 * @tag Players
 * @security BearerAuth
 * @pathParam {integer} playerId
 * @response 204
 * @response default
 * @responseContent {Error} default.application/json
 */
router.delete(
  "/players/:playerId",
  auth,
  params(playersGetOneParams),
  playersDeleteOne,
);

export default router;
