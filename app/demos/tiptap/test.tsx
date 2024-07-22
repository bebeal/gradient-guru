import Mountains from '@/public/images/mountains.jpg';

export const boldTextExample = `
<b>Carl Friedrich Gauss, often referred to as the 'Prince of Mathematicians', made significant contributions to many fields, including number theory.</b>
`;

export const italicTextExample = `
<em>Gottfried Wilhelm Leibniz, a polymath, co-invented calculus independently of Isaac Newton.</em>
`;

export const underlineTextExample = `
<u>Pythagoras of Samos was an ancient Ionian Greek philosopher and the eponymous founder of Pythagoreanism.</u>
`;

export const strikethroughTextExample = `
<s>Isaac Newton was an English mathematician, physicist, astronomer, theologian, and author who is widely recognised as one of the most influential scientists of all time.</s>
`;

export const paragraphExample = `
<p>Newton's Principia formulated the laws of motion and universal gravitation, which dominated scientists' view of the physical universe for the next three centuries.</p>
`;

export const hyperlinkExample = `
<a href="https://example.com/leibniz">Learn more about Leibniz's work in calculus and philosophy</a>
`;

export const mathemeticianList = `<li>Carl Friedrich Gauss</li>
<li>Gottfried Wilhelm Leibniz</li>
<li>Pythagoras of Samos</li>
<li>Isaac Newton</li>
<li>Hypatia</li>
<li>Archimedes of Syracuse</li>
<li>Leonhard Euler</li>
<li>Euclid</li>
<li>Erwin Schrödinger</li>
<li>Lise Meitner</li>
<li>Alan Turing</li>
<li>Albert Einstein</li>
<li>Niels Bohr</li>
<li>Max Planck</li>
<li>Galileo Galilei</li>
<li>Marie Curie</li>
<li>Johannes Kepler</li>
<li>Nikola Tesla</li>
<li>Stephen Hawking</li>
<li>Charles Darwin</li>
<li>Louis Pasteur</li>
<li>Michael Faraday</li>
<li>Richard Feynman</li>
<li>Ada Yonath</li>
<li>Enrico Fermi</li>
<li>James Clerk Maxwell</li>
<li>Robert Koch</li>
<li>Rosalind Franklin</li>
<li>Max Born</li>
<li>Archimedes</li>
<li>Avicenna</li>`;

export const orderedListExample = `
<ol>
${mathemeticianList}
</ol>
`;

export const unorderedListExample = `
<ul>
${mathemeticianList}
</ul>
`;

export const taskListExample = `<ul data-type="taskList">
<li data-type="taskItem" data-checked="true">flour</li>
<li data-type="taskItem" data-checked="true">baking powder</li>
<li data-type="taskItem" data-checked="true">salt</li>
<li data-type="taskItem" data-checked="false">sugar</li>
<li data-type="taskItem" data-checked="false">milk</li>
<li data-type="taskItem" data-checked="false">eggs</li>
<li data-type="taskItem" data-checked="false">butter</li>
</ul>`;

export const blockquoteExample = `<p><blockquote>
Mathematics is the queen of sciences and number theory is the queen of mathematics.
</blockquote>—Carl Friedrich Gauss</p>`;

export const codeExample = `<code>const gaussFormula = (n)  => {
  return n * (n + 1) / 2;
}
</code>
`;

export const codeBlockExample = `
<pre><code class="language-js">const gaussFormula = (n)  => {
  return n * (n + 1) / 2;
}</code></pre>
`;

export const tableExample = `
<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th colspan="3">Description</th>
    </tr>
    <tr>
      <td>Cyndi Lauper</td>
      <td>singer</td>
      <td>songwriter</td>
      <td>actress</td>
    </tr>
  </tbody>
</table>
`;

export const superscriptExample = `
<p>
  The area of a circle is πr<sup>2</sup>.
</p>
`;

export const subscriptExample = `
<p>
  The formula for water is H<sub>2</sub>O.
</p>
`;

export const emojiExample = `
<p>
These <span data-type="emoji" data-name="smiley"></span>
are <span data-type="emoji" data-name="fire"></span>
some <span data-type="emoji" data-name="smiley_cat"></span>
emojis <span data-type="emoji" data-name="exploding_head"></span>
rendered <span data-type="emoji" data-name="ghost"></span>
as <span data-type="emoji" data-name="massage"></span>
inline <span data-type="emoji" data-name="v"></span>
nodes.
</p>
`;

export const typographyExample = `
| Name                | Description                                                                             |
| ------------------- | --------------------------------------------------------------------------------------- |
| emDash              | Converts double dashes \`--\` to an emdash \`—\`.                                       |
| ellipsis            | Converts three dots \`...\` to an ellipsis character \`…\`                              |
| openDoubleQuote     | \`“\`Smart” opening double quotes.                                                      |
| closeDoubleQuote    | “Smart\`”\` closing double quotes.                                                      |
| openSingleQuote     | \`‘\`Smart’ opening single quotes.                                                      |
| closeSingleQuote    | ‘Smart\`’\` closing single quotes.                                                      |
| leftArrow           | Converts <code><&dash;</code> to an arrow \`←\` .                                       |
| rightArrow          | Converts <code>&dash;></code> to an arrow \`→\`.                                        |
| copyright           | Converts \`(c)\` to a copyright sign \`©\`.                                             |
| registeredTrademark | Converts \`(r)\` to registered trademark sign \`®\`.                                    |
| trademark           | Converts \`(tm)\` to registered trademark sign \`™\`.                                   |
| servicemark         | Converts \`(sm)\` to registered trademark sign \`℠\`.                                   |
| oneHalf             | Converts \`1/2\` to one half \`½\`.                                                     |
| oneQuarter          | Converts \`1/4\` to one quarter \`¼\`.                                                  |
| threeQuarters       | Converts \`3/4\` to three quarters \`¾\`.                                               |
| plusMinus           | Converts \`+/-\` to plus/minus sign \`±\`.                                              |
| notEqual            | Converts <code style="font-variant-ligatures: none;">!=</code> to a not equal sign \`≠\`. |
| laquo               | Converts \`<<\` to left-pointing double angle quotation mark \`«\`.                     |
| raquo               | Converts \`>>\` to right-pointing double angle quotation mark \`»\`.                    |
| multiplication      | Converts \`2 * 3\` or \`2x3\` to a multiplcation sign \`2×3\`.                          |
| superscriptTwo      | Converts \`^2\` a superscript two \`²\`.                                                 |
| superscriptThree    | Converts \`^3\` a superscript three \`³\`.  
`;

export const alignmentExample = `
<p style="text-align: left">left aligned</p>
<p style="text-align: center">center aligned</p>
<p style="text-align: right">right aligned</p>
`;

export const mentionExample = `
<span data-type="mention" data-id="Carl Friedrich Gauss"></span>
`;

export const horizontalRuleExample = `
<hr>
`;

export const highlightExample = `
<p><mark data-color="#b01919">Ada Lovelace was an English mathematician and writer, chiefly known for her work on Charles Babbage's proposed mechanical general-purpose computer, the Analytical Engine.</mark></p>
`;

export const hardBreakExample = `
<p>
This<br>
is<br>
a<br>
single<br>
paragraph<br>
with<br>
line<br>
breaks.
</p>
`;

export const invisibleCharacterExample = `
<h1>
This is a heading.
</h1>
<p>
This<br>is<br>a<br>paragraph.
</p>
<p>
This is a paragraph, but without breaks.
</p>
`;

export const fontFamilyExample = `
<p><span style="font-family: Inter">Did you know that Inter is a really nice font for interfaces?</span></p>
<p><span style="font-family: Comic Sans MS, Comic Sans">It doesn’t look as professional as Comic Sans.</span></p>
<p><span style="font-family: serif">Serious people use serif fonts anyway.</span></p>
<p><span style="font-family: monospace">The cool kids can apply monospace fonts aswell.</span></p>
<p><span style="font-family: cursive">But hopefully we all can agree, that cursive fonts are the best.</span></p>
`;

export const colorExample = `
<p><span style="color: #958DF1">Oh, for some reason that’s purple.</span></p>
`;

export const mathExample = `
<h1>
This editor supports $\\LaTeX$ math expressions.
</h1>
<p>
Did you know that $3 * 3 = 9$? Isn't that crazy? Also Pythagoras' theorem is $a^2 + b^2 = c^2$.<br />
Also the square root of 2 is $\\sqrt{2}$. If you want to know more about $\\LaTeX$ visit <a href="https://katex.org/docs/supported.html" target="_blank">katex.org</a>.
</p>
<p>
Do you want go deeper? Here is a list of all supported functions:
</p>
<ul>
<li>$\\sin(x)$</li>
<li>$\\cos(x)$</li>
<li>$\\tan(x)$</li>
<li>$\\log(x)$</li>
<li>$\\ln(x)$</li>
<li>$\\sqrt{x}$</li>
<li>$\\sum_{i=0}^n x_i$</li>
<li>$\\int_a^b x^2 dx$</li>
<li>$\\frac{1}{x}$</li>
<li>$\\binom{n}{k}$</li>
<li>$\\sqrt[n]{x}$</li>
<li>$\\left(\\frac{1}{x}\\right)$</li>
<li>$\\left\\{\\begin{matrix}x&\\text{if }x>0\\\\0&\\text{otherwise}\\end{matrix}\\right.$</li>
</ul>
`;

export const hexColor = `<p>
You can also teach the editor new things. For example to recognize hex colors and add a color swatch on the fly:

#ef4591

#ef459177

#ffef45

</p>`;

export const imageExample = `
<p>Try to move the cursor after the image with your arrow keys! You should see a horizontal blinking cursor below the image. This is the gapcursor.</p>
<img src="${Mountains.src}" alt="Mountains" />
`;

export const youtubeEmbedExample = `
<div data-youtube-video>
  <iframe src="https://www.youtube.com/watch?v=QYSJ83rl6nI"></iframe>
</div>
`;

export const contentString = `
${codeExample}\n
${codeBlockExample}\n
${mathExample}\n
${hexColor}\n
${youtubeEmbedExample}\n
${imageExample}\n
${boldTextExample}\n
${italicTextExample}\n
${underlineTextExample}\n
${strikethroughTextExample}\n
${paragraphExample}\n
${alignmentExample}\n
${horizontalRuleExample}\n
${hyperlinkExample}\n
${orderedListExample}\n
${unorderedListExample}\n
${taskListExample}\n
${blockquoteExample}\n
${tableExample}\n
${superscriptExample}\n
${subscriptExample}\n
${emojiExample}\n
${typographyExample}\n
${mentionExample}\n
${highlightExample}\n
${hardBreakExample}\n
${fontFamilyExample}\n
${colorExample}\n
${invisibleCharacterExample}\n
`;
