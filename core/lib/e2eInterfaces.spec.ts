import { LatLngToCoords, Coordinates } from "./e2eInterfaces";

describe("e2e Interfaces", () => {
  it("Test LatLng to coords convert.", () => {
    expect(LatLngToCoords(10, -3.141)).toStrictEqual<Coordinates>({
      latitude: 10,
      longitude: -3.141
    });
  });
});
