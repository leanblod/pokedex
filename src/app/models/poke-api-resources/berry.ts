import { NamedApiResource } from "@models/poke-api";

export interface Berry {
  id: number;
  name: string;
  growth_time: number;
  max_harvest: number;
  natural_gift_power: number;
  size: number;
  smoothness: number;
  soil_dryness: number;
  firmness: unknown;
  flavors: unknown[];
  item: NamedApiResource;
  natural_gift_type: NamedApiResource;
}
