import { stateToString, treeToString, toLatexString } from "../src/parseUtils";
import { ParseTree } from "../src/types";

describe("stateToString", () => {
  it("should return an empty string for an empty state", () => {
    expect(stateToString([])).toBe("");
  });

  it("should return a string for a single-node state", () => {
    const state: ParseTree[] = [{ symbol: "S" }];
    expect(stateToString(state)).toBe("S");
  });

  it("should return a comma-separated string for multiple nodes", () => {
    const state: ParseTree[] = [{ symbol: "NP" }, { symbol: "VP" }];
    expect(stateToString(state)).toBe("NP,VP");
  });

  it("should handle nested parse trees correctly", () => {
    const state: ParseTree[] = [
      { symbol: "S", children: [{ symbol: "NP" }, { symbol: "VP" }] }
    ];
    expect(stateToString(state)).toBe("S(NP,VP)");
  });
});

describe("treeToString", () => {
  it("should return the symbol for a leaf node", () => {
    const tree: ParseTree = { symbol: "N" };
    expect(treeToString(tree)).toBe("N");
  });

  it("should return the correct string for a single level tree", () => {
    const tree: ParseTree = {
      symbol: "S",
      children: [{ symbol: "NP" }, { symbol: "VP" }]
    };
    expect(treeToString(tree)).toBe("S(NP,VP)");
  });

  it("should return the correct string for a deep tree", () => {
    const tree: ParseTree = {
      symbol: "S",
      children: [
        { symbol: "NP", children: [{ symbol: "N", children: [{ symbol: "John" }] }] },
        { symbol: "VP", children: [{ symbol: "V", children: [{ symbol: "runs" }] }] }
      ]
    };
    expect(treeToString(tree)).toBe("S(NP(N(John)),VP(V(runs)))");
  });
});

describe("toLatexString", () => {
  it("should return a LaTeX string for a leaf node", () => {
    const tree: ParseTree = { symbol: "N" };
    expect(toLatexString(tree)).toBe("[ N ]");
  });

  it("should return a LaTeX string for a single-level tree", () => {
    const tree: ParseTree = {
      symbol: "S",
      children: [{ symbol: "NP" }, { symbol: "VP" }]
    };
    const expected = `[ S
  [ NP ]
  [ VP ]
]`;
    expect(toLatexString(tree)).toBe(expected);
  });

  it("should return a LaTeX string for a deep tree", () => {
    const tree: ParseTree = {
      symbol: "S",
      children: [
        { symbol: "NP", children: [{ symbol: "N", children: [{ symbol: "John" }] }] },
        { symbol: "VP", children: [{ symbol: "V", children: [{ symbol: "runs" }] }] }
      ]
    };
    const expected = `[ S
  [ NP
    [ N
      [ John ]
    ]
  ]
  [ VP
    [ V
      [ runs ]
    ]
  ]
]`;
    expect(toLatexString(tree)).toBe(expected);
  });
});
