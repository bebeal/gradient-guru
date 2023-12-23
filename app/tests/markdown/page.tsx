
'use client'

import { Markdown } from "@/components";

const pythonCode = `\`\`\`python
import numpy as np

def dot_product(v1, v2):
    return np.dot(v1, v2)

def cross_product(v1, v2):
    return np.cross(v1, v2)

def mat_mul(m1, m2):
    return np.matmul(m1, m2)
\`\`\`
`

const markdownList = `
* Item 1
* Item 2
    * Nested Item 1
    * Nested Item 2
* Item 3
`

const MarkdownPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-auto bg-primary text-primary">
      <div className="flex flex-col gap-2 w-full justify-center items-center">
      <Markdown>
        {pythonCode}
        {markdownList}
      </Markdown>
      </div>
    </div>
  );
};

export default MarkdownPage;
