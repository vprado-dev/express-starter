import { createAuth } from "@ev-fns/auth";

export const auth = createAuth({ token: "" + process.env.API_TOKEN });
