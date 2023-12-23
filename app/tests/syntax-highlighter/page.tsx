
'use client'

import { SyntaxHighlighter } from "@/components";

const javascriptCode = `// Fibonacci
const fib = n => n <= 1 ? n : fib(n-1) + fib(n-2);
  
// Euler's formula: e^(i*pi) + 1 = 0
const euler = () => Math.cos(Math.PI) + Math.sin(Math.PI) * 1i + 1;
`

const pythonCode = `import numpy as np

def dot_product(v1, v2):
    return np.dot(v1, v2)

def cross_product(v1, v2):
    return np.cross(v1, v2)

def mat_mul(m1, m2):
    return np.matmul(m1, m2)
`

const SyntaxHighlighterPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-auto bg-primary text-primary">
      <div className="flex flex-col gap-10 w-full justify-center items-center">
        <div className="flex border border-primary rounded-md p-4">
      <SyntaxHighlighter code={javascriptCode} language={"javascript"} />
        </div>
        <div className="flex border border-primary rounded-md p-4">
      <SyntaxHighlighter code={pythonCode} language={"python"} />
      </div>
      </div>
    </div>
  );
};

export default SyntaxHighlighterPage;
