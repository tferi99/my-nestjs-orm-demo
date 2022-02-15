import { Auth } from "@app/client-lib";

export interface AuthWithExpiration extends Auth {
  expiration: number;
  issued: number;
};
