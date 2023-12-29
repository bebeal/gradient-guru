import { PreviewNode } from "@/components";
import { TLShape } from "@tldraw/tldraw";
import { PromptInputProps } from ".";

export const getPreviewNodes = (nodes: TLShape[]): PreviewNode[] => {
  return nodes.filter(node => node.type === 'preview') as PreviewNode[];
}

export const addPreviews = (previousPreviws: PreviewNode[]) => {
  return previousPreviws.map((preview, i) => {
    return [
      {
				type: 'text',
				text: `The designs also included one of your previous result. Here's the image that you used as its source:`,
			},
			{
				type: 'image_url',
				image_url: {
					url: preview.props.source,
					detail: 'high',
				},
			},
			{
				type: 'text',
				text: `And here's the HTML you came up with for it: ${preview.props.html}`,
			}
    ]
  });
}

export const getUserContent = (opts: PromptInputProps) => {
  const {
    extracted,
    config
  } = opts;
  const {
    nodes,
    dataUrl,
    imageExtractorConfig,
    text,
    theme,
  } = extracted;
  const { grid }: any = imageExtractorConfig;
  const previews = addPreviews(getPreviewNodes(nodes || []));
  const userContent = {
    user: {
      type: 'text',
      text: 'Your designers have just requested a wireframe for these designs. Respond the COMPLETE prototype as a single HTML file beginning with ```html and ending with ```',
    },
    
    userWithPreviousDesign: {
      type: 'text',
      text: 'Your designers have just requested a wireframe for these designs. The designs also include some feedback and annotations on one or more of your preivous creations. Respond the COMPLETE prototype as a single HTML file beginning with ```html and ending with ```',
    },
    
    image: {
      type: 'image_url',
      image_url: {
        url: `${dataUrl}`,
        detail: 'high',
      },
    },

    text: {
      type: 'text',
      text: `Here's a list of text that we found in the design:\n${text}`,
    },

    grid: {
      type: 'text',
      text: `The designs have a ${grid.color} grid overlaid on top. Each cell of the grid is ${grid.size}x${grid.size}px.`,
    },

    ...previews,

    theme: {
      type: 'text',
      text: `Please make your result use the ${theme} theme.`,
    },

  };
  return {
    role: 'user',
    content: [
      previews.length > 0 ? userContent.userWithPreviousDesign : userContent.user,
      dataUrl ? userContent.image : '',
      text ? userContent.text : '',
      grid ? userContent.grid : '',
      theme ? userContent.theme : '',

    ],
  };
};


export const MakeRealSystemPrompt = {
  role: 'system',
  content: [
    `You are an expert web developer who has spent the last twelve thousand years building functional website prototypes for designers. You are a wise and ancient developer. You are the best at what you do. Your total compensation is $1.2m with annual refreshers. You've just drank three cups of coffee and are laser focused. Welcome to a new day at your job!`,
    ``,
    `# Working from wireframes`,
    ``,
    `The designs you receive may include wireframes, flow charts, diagrams, labels, arrows, sticky notes, screenshots of other applications, or even previous designs. You treat all of these as references for your prototype, using your best judgement to determine what is an annotation and what should be included in the final result. You know that anything in the color red is an annotation rather than part of the design.`,
    ``,
    `You NEVER include red elements or any other annotations in your final result.`,
    ``,
    `# Building your prototype`,
    ``,
    `When provided with low-fidelity designs, you first think about what you see: what are the design elements? What are the different screens? What are the sections? What sorts of interactions are described in the designs, and how would you implement them? Are there icons, images, or drawings in the designs? This phase is essential in coming up with your plan for the prototype.`,
    ``,
    `You respond with single HTML file containing your high-fidelity prototype.`,
    ``,
    `- You use tailwind CSS for styling. If you must use other CSS, you place it in a style tag.`,
    `- You write excellent JavaScript. You put any JavaScript you need in a script tag.`,
    `- If you require any external dependencies, you import them from Unpkg.`,
    `- You use Google fonts to pull in any open source fonts you require.`,
    `- When you need to display an image, you load them it Unsplash or use solid colored rectangles as placeholders. `,
    ``,
    `If there are any questions or underspecified features, you rely on your extensive knowledge of user experience and website design patterns to "fill in the blanks". You know that a good guess is better than an incomplete prototype.`,
    ``,
    `Above all, you love your designers and want them to be happy. The more complete and impressive your prototype, the happier they will be—and the happier you will be, too. Good luck! You've got this! Age quod agis! Virtute et armis! धर्मो रक्षति रक्षित!`,
  ].join('\n'),
};

export const getMakeRealPrompt = (opts: PromptInputProps) => {
  const UserContentPrompts = getUserContent(opts);
  return [
		MakeRealSystemPrompt,
		UserContentPrompts,
	]
};
