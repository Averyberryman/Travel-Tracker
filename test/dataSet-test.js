import { expect } from "chai";
import Dataset from "../src/Dataset";
import travelers from "../src/data/travelerData";
import trips from "../src/data/tripData";
import destinations from "../src/data/destinationData";

describe("Dataset Class", () => {
  it("should be a constructor function", () => {
    expect(Dataset).to.be.a("function");
  });

  let travelerDataset;
  let tripDataset;
  let destinationDataset;

  beforeEach(() => {
    travelerDataset = new Dataset(travelers);
    tripDataset = new Dataset(trips);
    destinationDataset = new Dataset(destinations);
  });

  it("should be a Dataset class", () => {
    expect(tripDataset).to.be.an.instanceOf(Dataset);
  });

  it("should give the correct dataset data", () => {
    expect(tripDataset.data).to.deep.equal(trips);
    expect(destinationDataset.data).to.deep.equal(destinations);
  });

  it("should get unique destination with a singular destination", () => {
    expect(
      destinationDataset.findSelectedDestination("Lima, Peru")
    ).to.deep.equal(destinations[0]);
    expect(
      destinationDataset.findSelectedDestination("Stockholm, Sweden")
    ).to.deep.equal(destinations[1]);
  });
});
