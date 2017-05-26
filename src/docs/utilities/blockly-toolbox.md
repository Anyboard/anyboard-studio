# blockly-toolbox.py

Creates and exports a single String called toolbox.
The string contains all the information on which blocks Blockly should include in the tabs to the left of the workspace
and which tabs to include at all.
The string is structured as xml.
The <category> tags define what tabs will be created, and what color those should have.
The <block> tags, placed inside a <category>, add that block to that category.
These blocks are both the standard ones defined in Blockly, and the custom ones added to Blockly in `blockly-init`.
Inside block tags is further information on how inputs should be filled out in the toolbox.
Of particular interest are inputs that are other blocks. For these, the  <shadow> tag is used.
Blocks defined by <shadow> tags look a bit more transparant than their normal counter parts.
They can't be moved, but inputs can still be changed. If they are replaced by a normal block, they will vanish.
The purpose of shadow blocks is to give an idea of what blocks might be used as the inputs there,
as well as using the more common blocks for that purpose, so that in many cases the user can just leave the shadow block there.
