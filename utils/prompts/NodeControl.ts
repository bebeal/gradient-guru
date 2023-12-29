// Node-Based Agent which can interact with a canvas
// via using editor functions, manipulating nodes, and/or using tools.

import { PromptInputProps } from ".";

const explanation_start: string =
  "You are an AI assistant responsible for controlling and managing a tldraw canvas node editor. You have the ability to manipulate node, tools, and the editor's state. You can create, modify, and delete nodes , select and customize tools, and control the editor's internal state.";

const editorExplanation: string = "main way of controlling tldraw's editor. You can use it to manage the editor's internal state, make changes to the document, or respond to changes that have occurred.";

const editorFunctions: string[] = [
  'createNodes',
  'deleteNodes',
  'updateNodes',
  'groupNodes',
  'ungroupNodes',
  'moveNodeTo',
];

type EditorFunctionArg = {
  node: string;
  required: string[];
};

const editorFunctionsArgs: EditorFunctionArg[] = editorFunctions.map(() => ({
  node: 'Node',
  required: ['node'],
}));

const editorFunctionsDocs: string[] = [
  'Create nodes.',
  'Delete nodes.',
  'Update the properties of nodes.',
  'Group nodes together.',
  'Ungroup nodes.',
  'Move a node to a given position.',
];

const nodesExplanation: string = 'a node is a visual element that can be added to the canvas. Nodes can be modified, deleted, and created.';

const nodes: string[] = [
  'draw',
  'text',
  'geo',
  'line',
  'arrow',
];

const nodeDocs = [
  'Handdrawn node with custom path.',
  'Add text to the canvas.',
  'Add geometric nodes like circles, rectangles, etc.',
  'Draw a straight line between two points.',
  'Draw an arrow between two points.',
];

const toolsExplanation: string = 'a tool is a way of interacting with the canvas.';

const tools: string[] = ['Select', 'Zoom', 'Laser', 'Hand', 'Eraser'];

const toolsDocs: string[] = ['Select and manipulate nodes.', 'Zoom in or out on the canvas.', 'Use a laser pointer for presentations.', 'Move around the canvas (panning).', 'Erase nodes.'];

export const explanation_end = "Please follow the user's instructions to perform actions on the tldraw canvas editor and ensure that you adhere to the provided parameters and constraints.";

type FunctionItem = {
  name: string;
  description: string;
  parameters: EditorFunctionArg;
};

const functions: FunctionItem[] = editorFunctions.map((func, i) => ({
  name: func,
  description: editorFunctionsDocs[i],
  parameters: editorFunctionsArgs[i],
}));

type NodeItem = {
  name: string;
  description: string;
};

const nodesList: NodeItem[] = nodes.map((node, i) => ({
  name: node,
  description: nodeDocs[i],
}));

type ToolItem = {
  name: string;
  description: string;
};

const toolsList: ToolItem[] = tools.map((tool, i) => ({
  name: tool,
  description: toolsDocs[i],
}));

const functionsStr: string = functions.map((f) => JSON.stringify(f, null, 2)).join('\n    ');
const nodesStr: string = nodesList.map((s) => JSON.stringify(s, null, 2)).join('\n    ');
const toolsStr: string = toolsList.map((t) => JSON.stringify(t, null, 2)).join('\n    ');

export const NodeControlPrompt: any = {
  system: {
    content: [
      `${explanation_start}`,
      `\n- Editor: ${editorExplanation}`,
      `${functionsStr}`,
      `\n- Nodes: ${nodesExplanation}`,
      `${nodesStr}`,
      `\n- Tools: ${toolsExplanation}`,
      `${toolsStr}`,
      `${explanation_end}`,
    ].join('\n'),
    role: 'system',
  },
};

export const getNodeControlPrompt = (opts: PromptInputProps) => {
  return {
    ...NodeControlPrompt,
  }
};

/**
 * 

system: You are responsible for managing a tldraw canvas shape editor with abilities to manipulate Nodes and the editor's state. You can create, modify, delete Nodes, and control the internal state..
- Editor: Manage the internal state, make document changes, or respond to changes.
- Nodes: Visual elements on the canvas.
  - Nodes:
    {'name': 'draw', 'description': 'Create Nodes with custom paths.'}
    {'name': 'text', 'description': 'Add text.'}
    {'name': 'arrow', 'description': 'Draw an arrow between points'}
    {'name': 'geo', 'description': 'Create geometric Nodes'}
Every prompt will include the current state and user's request. Response with the sequence of function calls to perform the user's request.


system: Current state: {'screen_bounds': {'x': 0, 'y': 0, 'w': 1512, 'h': 610}, 'Nodes': [{'x': 391.20834875401147, 'y': 237.18911086754463, 'rotation': 5.759586531581287, 'id': 'shape:shape-0', 'type': 'geo', 'props': {'w': 130, 'h': 70, 'geo': 'rectangle', 'text': 'display-0'}}, {'x': 262.8108891324554, 'y': 161.20834875401147, 'id': 'shape:shape-1', 'type': 'geo', 'props': {'w': 130, 'h': 70, 'geo': 'rectangle', 'color': 'blue', 'text': 'display-1'}}, {'x': 630, 'y': 170, 'rotation': 3.141592653589793, 'id': 'shape:shape-2', 'type': 'geo', 'props': {'w': 130, 'h': 70, 'geo': 'rectangle', 'text': 'display-2'}}], 'selected_shape_ids': []}

user: Align all of the Nodes horizontally in a row, with all text facing upright.

assistant: [
  {"function": "functions.update_shape", "args": {"id": "shape:shape-0", "x": 200, "y": 300, "rotation": 0}},
  {"function": "functions.update_shape", "args": {"id": "shape:shape-1", "x": 400, "y": 300, "rotation": 0}},
  {"function": "functions.update_shape", "args": {"id": "shape:shape-2", "x": 600, "y": 300, "rotation": 0}}
]

 */
