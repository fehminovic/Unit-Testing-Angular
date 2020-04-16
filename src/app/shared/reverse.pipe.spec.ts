import { ReversePipe } from "./reverse.pipe";

describe("IsolatedPipe", () => {
  it("should reverse the text", () => {
    let reversePipe = new ReversePipe();
    expect(reversePipe.transform("hello")).toEqual("olleh");
  });
});
