/**
 * Represents a rewrite rule in a context-free grammar.
 * A rule consists of a left-hand side (nonterminal) and a right-hand side (a sequence of symbols).
 * 
 * @property {string} left - The left-hand side of the rule (nonterminal).
 * @property {string[]} right - The right-hand side of the rule, an array of symbols (terminals or nonterminals).
 * 
 * @example
 * // Example rule:
 * const rule: Rule = { left: "S", right: ["NP", "VP"] }  // S -> NP VP
 */

export type Rule = {
  left: string;
  right: string[];
};

/**
 * Represents a node in a parse tree.
 * Each node has a symbol and may have children if it is not a leaf node.
 * 
 * @property {string} symbol - The symbol at this node (terminal or leaf).
 * @property {ParseTree[]} [children] - Optional child nodes, representing the parsed structure.
 */
export type ParseTree = {
  symbol: string;
  children?: ParseTree[];
};