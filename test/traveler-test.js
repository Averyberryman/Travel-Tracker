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
  it("should make unique IDs for each traveler", () => {
    const ids = travelers.map((traveler) => traveler.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).to.equal(travelers.length);
  });

  it("should be able to access all travelerTypes", () => {
    const allowedTravelerTypes = [
      "relaxer",
      "thrill-seeker",
      "shopper",
      "photographer",
      "history buff",
    ];

    travelers.forEach((traveler) => {
      expect(allowedTravelerTypes).to.include(traveler.travelerType);
    });
  });

  it("should not create any undefined traveler properties", () => {
    travelers.forEach((traveler) => {
      expect(traveler.id).to.not.be.undefined;
      expect(traveler.name).to.not.be.undefined;
      expect(traveler.travelerType).to.not.be.undefined;
    });
  });
  it("should have unique names for travelers", () => {
    const names = travelers.map((traveler) => traveler.name);
    const uniqueNames = new Set(names);
    expect(uniqueNames.size).to.equal(travelers.length);
  });

  it("should have valid IDs for each traveler", () => {
    travelers.forEach((traveler) => {
      expect(traveler.id).to.be.a("number").that.is.at.least(1);
    });
  });

  it("should have travelerType values that are strings", () => {
    travelers.forEach((traveler) => {
      expect(traveler.travelerType).to.be.a("string");
    });
  });

  it("should have unique destinations for each trip", () => {
    const tripDestinationPairs = trips.map(
      (trip) => `${trip.userID}-${trip.destinationID}`
    );
    const uniqueTripDestinations = new Set(tripDestinationPairs);

    expect(
      uniqueTripDestinations.size,
      "Duplicate trip destinations found"
    ).to.equal(trips.length);
  });

  it("should have the right number of travelers for each trip", () => {
    trips.forEach((trip) => {
      expect(
        trip.travelers,
        `Invalid number of travelers for trip with ID: ${trip.id}`
      )
        .to.be.a("number")
        .that.is.at.least(1);
    });
  });

  it("should have approved trips with valid status for each traveler", () => {
    travelers.forEach((traveler) => {
      const travelerTrips = trips.filter((trip) => trip.userID === traveler.id);

      travelerTrips.forEach((trip) => {
        expect(trip.status).to.equal("approved");
      });
    });
  });

  it("should have estimated costs per destination", () => {
    destinations.forEach((destination) => {
      expect(destination.estimatedLodgingCostPerDay)
        .to.be.a("number")
        .that.is.at.least(0);
      expect(destination.estimatedFlightCostPerPerson)
        .to.be.a("number")
        .that.is.at.least(0);
    });
  });

  it("should have image URL addresses for each destination", () => {
    destinations.forEach((destination) => {
      expect(destination.image).to.be.a("string").that.is.not.empty;
    });
  });

});