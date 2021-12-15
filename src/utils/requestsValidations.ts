import { createRequestValidate } from "./createRequestValidation";

export const body = createRequestValidate("body");
export const params = createRequestValidate("params");
export const query = createRequestValidate("query");
