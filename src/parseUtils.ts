import { ParseTree } from "./types";

/**
 * Generates a string representation of the given parse tree state.
 * Used to track visited states and avoid redundant processing.
 * @param {ParseTree[]} state - The current parse tree state.
 * @returns {string} A string representation of the state.
 */
export const stateToString = (state: ParseTree[]): string  => {
  return state.map(node => treeToString(node)).join(',');
}

/**
 * Converts a parse tree into a human-readable string representation.
 * This function is recursive and includes nested structures for nonterminal symbols.
 * @param {ParseTree} node - The root node of the parse tree.
 * @returns {string} A string representation of the parse tree.
 */
export const treeToString = (node: ParseTree): string => {
  if (!node.children || node.children.length === 0) {
    return node.symbol;
  } else {
    return `${node.symbol}(${node.children.map(child => treeToString(child)).join(',')})`;
  }
}

/**
 * Converts a parse tree into a LaTeX-compatible string representation.
 * @param {ParseTree} node - The root node of the parse tree.
 * @param {number} indent - The indentation step size for formatting child nodes (default: 2).
 * @param {string} prefix - The current indentation level (default: '').
 * @returns {string} A LaTeX-compatible string representation of the parse tree.
 */
export const toLatexString = (node: ParseTree, indent: number = 2, prefix: string = ''): string => {
  if (node.children && node.children.length > 0) {
      const childIndent = prefix + ' '.repeat(indent); // Maintain constant indentation for all children
      return `${prefix}[ ${node.symbol}\n${node.children.map(child => toLatexString(child, indent, childIndent)).join('\n')}\n${prefix}]`;
  } else {
      return `${prefix}[ ${node.symbol} ]`;
  }
}