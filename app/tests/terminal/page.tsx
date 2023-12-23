
'use client'

import { Terminal } from "@/components";

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

const cppCode = `#include <iostream>
#include <vector>

std::vector<int> getFibonacci(int n) {
    std::vector<int> fib = {0, 1};
    for(int i = 2; i <= n; ++i) {
        fib.push_back(fib[i-1] + fib[i-2]);
    }
    return fib;
}

void printVector(const std::vector<int>& vec) {
    for(int num : vec) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
}
`;

const TerminalPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-auto bg-primary text-primary">
      <div className="flex flex-col gap-2 w-full h-auto justify-center items-center overflow-auto p-10">
        <Terminal code={javascriptCode} language={"javascript"} />
        <Terminal code={pythonCode} language={"python"} />
        <Terminal code={cppCode} language={"cpp"} />
      </div>
    </div>
  );
};

export default TerminalPage;
