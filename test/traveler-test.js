import { expect } from "chai";
import Traveler from "../src/Traveler";
import Dataset from "../src/Dataset";
import travelers from "../src/data/travelerData";
import trips from "../src/data/tripData";
import destinations from "../src/data/destinationData";

describe("TESTING SUITE FOR TRAVELER DATA", () => {
  it("should have the accurate count of travelers", () => {
    expect(travelers).to.have.lengthOf(10);
  });

  it("should consist of an array containing travelers", () => {
    expect(travelers).to.be.an("array");
  });

  it("each traveler should possess the required attributes", () => {
    travelers.forEach((traveler) => {
      expect(traveler).to.have.property("id");
      expect(traveler).to.have.property("name");
      expect(traveler).to.have.property("travelerType");
    });
  });

  it("should exhibit distinct IDs for each traveler", () => {
    const ids = travelers.map((traveler) => traveler.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).to.equal(travelers.length);
  });

 
});