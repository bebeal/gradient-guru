// Node-Based Agent which can interact with a canvas
// via using editor functions, manipulating nodes, and/or using tools.

const explanation_start: string =
  "You are an AI assistant responsible for controlling and managing a tldraw canvas node editor. You have the ability to manipulate node, tools, and the editor's state. You can create, modify, and delete nodes , select and customize tools, and control the editor's internal state.";

const editorExplanation: string = "main way of controlling tldraw's editor. You can use it to manage the editor's internal state, make changes to the document, or respond to changes that have occurred.";

const editorFunctions: string[] = [
  // 'getShapes',
  // 'getSelectedShapes',
  // 'bringForward',
  // 'bringToFront',
  // 'pan',
  // 'pageToScreen',
  // 'screenToPage',
  // 'rotateShapesBy',
  // 'setCurrentTool',
  // 'setCamera',
  // 'sendBackward',
  // 'sendToBack',
  // 'setOpacity',
  // 'groupShapes',
  // 'ungroupShapes',
  // 'zoomToSelection',
  'moveNodeTo',
];

type EditorFunctionArg = {
  shape: string;
  required: string[];
};

const editorFunctionsArgs: EditorFunctionArg[] = editorFunctions.map(() => ({
  shape: 'Node',
  required: ['node'],
}));

const editorFunctionsDocs: string[] = [
  // 'Bring the selected shape one level forward.',
  // 'Bring the selected shape to the front of all shapes.',
  // 'Retrieve all shapes on the canvas.',
  // 'Retrieve all currently selected shapes.',
  // 'Pan the canvas to a specific position.',
  // 'Convert page coordinates to screen coordinates.',
  // 'Convert screen coordinates to page coordinates.',
  // 'Rotate the selected shapes by a given angle.',
  // 'Set the current tool in use.',
  // 'Set the camera view for the canvas.',
  // 'Send the selected shape one level backward.',
  // 'Send the selected shape to the back of all shapes.',
  // 'Set the opacity level for the selected shapes.',
  // 'Group selected shapes together.',
  // 'Ungroup selected shapes.',
  // 'Zoom the view to the selected shapes.',
  'Move a node to a given position.',
];

const nodesExplanation: string = 'a node is a visual element that can be added to the canvas. Nodes can be modified, deleted, and created.';

const nodes: string[] = [
  // 'draw',
  'text',
  'geo',
  'line',
  // 'arrow',
  // 'note',
  // 'frame',
  // 'image',
  // 'video',
  // 'embed',
  // 'highlight',
];

const nodeDocs = [
  // 'Handdrawn node with custom path.',
  'Add text to the canvas.',
  'Add geometric nodes like circles, rectangles, etc.',
  'Draw a straight line between two points.',
  // 'Draw an arrow between two points.',
  // 'Add a note or annotation to the canvas.',
  // 'Create a frame around selected shapes.',
  // 'Add an image to the canvas.',
  // 'Add a video to the canvas.',
  // 'Embed an external object or website.',
  // 'Highlight a specific area or shape on the canvas.',
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

export const node_based_agent: any = {
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

export const getCurrentState = (screenBounds: any, nodes: any[], selectedNodeIds: any[]): string => {
  return `Current state:
- Screen bounds: ${JSON.stringify(screenBounds, null, 2)}
- Nodes: ${JSON.stringify(nodes, null, 2)}
- Selected node ids: ${JSON.stringify(selectedNodeIds, null, 2)}`;
};

/**
 * 

system: You are responsible for managing a tldraw canvas shape editor with abilities to manipulate shapes and the editor's state. You can create, modify, delete shapes, and control the internal state..
- Editor: Manage the internal state, make document changes, or respond to changes.
- Shapes: Visual elements on the canvas.
  - Shapes:
    {'name': 'draw', 'description': 'Create shapes with custom paths.'}
    {'name': 'text', 'description': 'Add text.'}
    {'name': 'arrow', 'description': 'Draw an arrow between points'}
    {'name': 'geo', 'description': 'Create geometric shapes'}
Every prompt will include the current state and user's request. Response with the sequence of function calls to perform the user's request.


system: Current state: {'screen_bounds': {'x': 0, 'y': 0, 'w': 1512, 'h': 610}, 'shapes': [{'x': 391.20834875401147, 'y': 237.18911086754463, 'rotation': 5.759586531581287, 'id': 'shape:shape-0', 'type': 'geo', 'props': {'w': 130, 'h': 70, 'geo': 'rectangle', 'text': 'display-0'}}, {'x': 262.8108891324554, 'y': 161.20834875401147, 'id': 'shape:shape-1', 'type': 'geo', 'props': {'w': 130, 'h': 70, 'geo': 'rectangle', 'color': 'blue', 'text': 'display-1'}}, {'x': 630, 'y': 170, 'rotation': 3.141592653589793, 'id': 'shape:shape-2', 'type': 'geo', 'props': {'w': 130, 'h': 70, 'geo': 'rectangle', 'text': 'display-2'}}], 'selected_shape_ids': []}

user: Align all of the shapes horizontally in a row, with all text facing upright.

assistant: [
  {"function": "functions.update_shape", "args": {"id": "shape:shape-0", "x": 200, "y": 300, "rotation": 0}},
  {"function": "functions.update_shape", "args": {"id": "shape:shape-1", "x": 400, "y": 300, "rotation": 0}},
  {"function": "functions.update_shape", "args": {"id": "shape:shape-2", "x": 600, "y": 300, "rotation": 0}}
]

 */
