import { College } from "../interfaces";
import { CollegeName } from "../enums";
import { Colour } from "../icons";

export const Colleges: College[] = [
  {
    name: CollegeName.eastbourne,
    coords: [50.78829, 0.271392],
    colour: Colour.orange
  },
  {
    name: CollegeName.lewes,
    coords: [50.870314, 0.015465],
    colour: Colour.blue
  },
  {
    name: CollegeName.hastings,
    coords: [50.85811, 0.577994],
    colour: Colour.green
  }
];
