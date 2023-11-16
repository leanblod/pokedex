import { NamedApiResource } from "@models/poke-api";

/* Common modules */

export interface VersionGameIndex {
  /** The internal id of an API resource within game data. */
  game_index: number;
  /** The version relevent to this game index. */
  version: NamedApiResource;
}
