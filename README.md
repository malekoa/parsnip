<p align="center">
  <img src="https://raw.githubusercontent.com/malekoa/parsnip/refs/heads/main/assets/parsnip_transparent.png" alt="Project Logo" width="128">
</p>

# Parsnip

A lightweight parser for token sequences that supports context-free grammars. Takes a set of rewrite rules and input tokens, then generates all possible parse trees.

## 🚀 Features
- Parses input tokens into structured trees
- Supports multiple valid parses (ambiguity-friendly!)
- Converts trees to human-readable and LaTeX formats (Forest package).

## 📦 Installation
```sh
npm install @malekoa/parsnip
```

## 🔧 Usage
### **1. Define Your Grammar Rules**
```typescript
const rules: Rule[] = [
  { left: "S", right: ["NP", "VP"] },  // S → NP VP
  { left: "NP", right: ["PN"] },       // NP → PN
  { left: "PN", right: ["John"] },      // PN → John
  { left: "PN", right: ["Mary"] },      // PN → Mary
  { left: "VP", right: ["V_T", "NP"] }, // VP → V_T NP
  { left: "V_T", right: ["loves"] }    // V_T → loves
];
```

### **2. Provide Your Input Tokens**
```typescript
const tokens = ["John", "loves", "Mary"];
```

### **3. Parse the Tokens**
```typescript
const parseTrees = parse(rules, tokens);
console.log(parseTrees);
```
#### **Example Output**
```json
[
  {
    "symbol": "S",
    "children": [
      { "symbol": "NP", "children": [{ "symbol": "PN", "children": [{ "symbol": "John" }] }] },
      { "symbol": "VP", "children": [
        { "symbol": "V_T", "children": [{ "symbol": "loves" }] },
        { "symbol": "NP", "children": [{ "symbol": "PN", "children": [{ "symbol": "Mary" }] }] }
      ]}
    ]
  }
]
```

## 🎨 Formatting Options
- **Human-readable tree representation**:
  ```typescript
  console.log(treeToString(parseTrees[0]));
  ```
  **Output:**
  ```
  S(NP(PN(John)),VP(V_T(loves),NP(PN(Mary))))
  ```

- **LaTeX-compatible tree format (Forest package)**:
  ```typescript
  console.log(toLatexString(parseTrees[0]));
  ```
  **Output:**
  ```
  [ S
    [ NP
      [ PN
        [ John ]
      ]
    ]
    [ VP
      [ V_T
        [ loves ]
      ]
      [ NP
        [ PN
          [ Mary ]
        ]
      ]
    ]
  ]
  ```

## 🛠 Development
### **Run Tests**
```sh
npm test
```

### **File Structure**
```
/src
  ├── index.ts        # Main parser implementation
  ├── parseUtils.ts   # Helper functions (formatting, conversions)
  ├── types.ts        # Type definitions
```

## 💡 Why Use This?
- You need a lightweight parsing engine for a toy language, DSL, or academic project.
- You just love seeing words turn into trees.

## ⚖ License
MIT

