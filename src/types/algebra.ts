export interface VariablePart {
  name: string;
  exponent: number;
}

export interface TermData {
  id: string;
  raw: string;
  sign: '+' | '-';
  coefficient: number; // positive absolute value (sign is stored separately)
  variables: VariablePart[];
}

export interface Level1Exercise {
  id: string;
  title: string;
  expression: string;
  terms: TermData[];
  commonFactor: string;
  parenthesisFactor: string;
  factoredExpression: string;
  explanation: string;
  steps: string[];
}

export interface AreaSection {
  id: string;
  termString: string;
  widthLabel: string;
  widthValue: string;
  colorBg: string;
}

export interface Level2Exercise {
  id: string;
  title: string;
  expression: string;
  height: string; // Common factor
  heightOptions: string[];
  sections: AreaSection[];
  totalBase: string; // e.g. "x + 3"
  factoredExpression: string;
  steps: string[];
}

export interface Level3Exercise {
  id: string;
  title: string;
  expression: string;
  terms: TermData[];
  coefficients: number[];
  gcd: number;
  gcdOptions: number[];
  allVariables: string[];
  commonVariables: string[];
  variableMinExponents: Record<string, number>;
  commonFactorString: string;
  quotients: { original: string; divided: string }[];
  factoredExpression: string;
  steps: string[];
}

export interface FactorPair {
  m: number;
  n: number;
  product: number;
  sum: number;
  isCorrect: boolean;
}

export interface Level4Exercise {
  id: string;
  title: string;
  expression: string; // e.g. "x² + 7x + 12"
  variable: string; // e.g. "x"
  b: number; // 7
  c: number; // 12
  m: number; // 3
  n: number; // 4
  factorPairs: FactorPair[];
  factoredExpression: string; // "(x + 3)(x + 4)"
  steps: string[];
}
