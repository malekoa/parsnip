import { parse } from "../src/parser";
import { Rule, ParseTree } from "../src/types";

/**
 * Utility function to simplify expected parse tree representation.
 */
const createTree = (symbol: string, children?: ParseTree[]): ParseTree => ({ symbol, children });

describe("parse", () => {
  it("should return an empty array when given an empty token sequence", () => {
    const rules: Rule[] = [{ left: "S", right: ["NP", "VP"] }];
    expect(parse(rules, [])).toEqual([]);
  });

  it("should return a single-node parse tree when given a single token with no reductions", () => {
    const rules: Rule[] = [{ left: "S", right: ["NP", "VP"] }];
    const tokens = ["John"];
    expect(parse(rules, tokens)).toEqual([createTree("John")]);
  });

  it("should correctly parse a simple sentence with a known grammar", () => {
    const rules: Rule[] = [
      { left: "S", right: ["NP", "VP"] },
      { left: "NP", right: ["PN"] },
      { left: "PN", right: ["John"] },
      { left: "PN", right: ["Mary"] },
      { left: "VP", right: ["V_T", "NP"] },
      { left: "V_T", right: ["loves"] }
    ];

    const tokens = ["John", "loves", "Mary"];
    const expected = [
      createTree("S", [
        createTree("NP", [createTree("PN", [createTree("John")])]),
        createTree("VP", [
          createTree("V_T", [createTree("loves")]),
          createTree("NP", [createTree("PN", [createTree("Mary")])])
        ])
      ])
    ];

    expect(parse(rules, tokens)).toEqual(expected);
  });

  it("should return multiple parse trees for ambiguous grammars", () => {
    const rules: Rule[] = [
      { left: "S", right: ["S", "AND", "S"] },
      { left: "S", right: ["X"] },
      { left: "X", right: ["A"] }
    ];

    const tokens = ["A", "AND", "A"];
    const expected = [
      createTree("S", [
        createTree("S", [createTree("X", [createTree("A")])]),
        createTree("AND"),
        createTree("S", [createTree("X", [createTree("A")])])
      ])
    ];

    expect(parse(rules, tokens)).toEqual(expected);
  });

  it("should return without entering an infinite loop on an unrecognizable sequence", () => {
    const rules: Rule[] = [
      { left: "S", right: ["NP", "VP"] },
      { left: "NP", right: ["PN"] },
      { left: "PN", right: ["John"] }
    ];
  
    const tokens = ["Hello", "world"];
  
    expect(() => parse(rules, tokens)).not.toThrow();
  });
});
