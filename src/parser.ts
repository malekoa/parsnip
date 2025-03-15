export { Rule, ParseTree } from "./types";
import { Rule, ParseTree } from "./types";
import { stateToString } from "./parseUtils";

/**
 * Parses a sequence of input tokens using a given set of rewrite rules to generate all possible parse trees.
 * 
 * @param {Rule[]} rules - The grammar rules defining valid reductions.
 * @param {string[]} tokens - The sequence of tokens to parse.
 * @returns {ParseTree[]} An array of parse trees representing all possible valid parses.
 * 
 * @example
 * // Define a simple grammar:
 * const rules: Rule[] = [
 *   { left: "S", right: ["NP", "VP"] },   // S -> NP VP
 *   { left: "NP", right: ["PN"] },        // NP -> PN
 *   { left: "PN", right: ["John"] },      // PN -> John
 *   { left: "PN", right: ["Mary"] },      // PN -> Mary
 *   { left: "VP", right: ["V_T", "NP"] }, // VP -> V_T NP
 *   { left: "V_T", right: ["loves"] }     // V_T -> loves
 * ];
 * 
 * // Define a sequence of tokens:
 * const tokens = ["John", "loves", "Mary"];
 * 
 * // Parse the tokens:
 * const parseTrees = parse(rules, tokens);
 * 
 * // Example output:
 * console.log(parseTrees);
 * // [
 * //   {
 * //     symbol: "S",
 * //     children: [
 * //       { symbol: "NP", children: [{ symbol: "PN", children: [{ symbol: "John" }] }] },
 * //       { symbol: "VP", children: [
 * //         { symbol: "V_T", children: [{ symbol: "loves" }] },
 * //         { symbol: "NP", children: [{ symbol: "PN", children: [{ symbol: "Mary" }] }] }
 * //       ]}
 * //     ]
 * //   }
 * // ]
 */
export const parse = (rules: Rule[], tokens: string[]): ParseTree[] => {
  const initialState: ParseTree[] = tokens.map(token => ({ symbol: token }));
  let states: ParseTree[][] = [initialState]; // for search tree
  const completedParses: ParseTree[] = []; // for parses that reach a single root node
  const seen = new Set<string>(); // to avoid infinite loops

  while (states.length > 0) {
    const newStates: ParseTree[][] = [];
    for (const state of states) {
      if (state.length === 1) completedParses.push(state[0]); // complete parse reached

      for (const newState of applyReductions(state, rules)) { // try to apply reductions
        const repr = stateToString(newState);
        if (!seen.has(repr)) { // new state found ? mark as explored : do nothing
          seen.add(repr);
          newStates.push(newState);
        }
      }
    }
    states = newStates;
  }
  
  return completedParses;
}

/**
 * Attempts to apply all possible single-step reductions to a given state using the provided grammar rules.
 * @param {ParseTree[]} state - The current state represented as an array of parse tree nodes.
 * @param {Rule[]} rules - The set of grammar rules to apply for reductions.
 * @returns {ParseTree[][]} An array of new states, each representing a different reduction result.
 */
const applyReductions = (state: ParseTree[], rules: Rule[]): ParseTree[][] => {
  const newStates: ParseTree[][] = [];

  for (let i = 0; i < state.length; i++) {
    for (let j = i + 1; j <= state.length; j++) {
      const segment = state.slice(i, j); // consider each contiguous segment of the state
      // for each rule...
      for (const rule of rules) {
        // check if the segment's symbols match the rule's rhs
        if (
          rule.right.length === segment.length &&
          segment.every((node, index) => node.symbol === rule.right[index])
        ) {
          // If it does, reduce the matched segment using the production, and create the new state
          const newNode: ParseTree = {
            symbol: rule.left,
            children: segment
          };
          const newState = [
            ...state.slice(0, i),
            newNode,
            ...state.slice(j)
          ];
          newStates.push(newState);
        }
      }
    }
  }
  return newStates;
}