# blockly-init.js

This file takes the standard Blockly object and modifies it, by adding custom blocks and changing code generation.
Blockly is a large project, and this readme will only give a brief overview.
Please reference Blockly documentation at https://developers.google.com/blockly/guides/overview for a more thorough explanation.

## Block definitions
How a block looks is defined with `Blockly.Blocks['block_name']`.
The code that a block generates is defined with `Blocky.JavaScript['block_name']`.
As per Blockly standard, the block names start with the category the block belongs to.

The code for how blocks looks was mostly developed with the Block Factory:
https://blockly-demo.appspot.com/static/demos/blockfactory/index.html

All blocks defined here need to be included in utilities/blockly-toolbox.js, otherwise they won't show up in the toolbox.
That is also where you define what other blocks and values they come prefilled with.

## Redefined blocks

In addition to adding custom blocks, it was necessary to redefine some of the standard Blockly Blocks.
What is changed for these is mostly code generation, not the looks of the blocks.
The reason for the different code is that the generated code is placed inside an app object, which requires some different syntax.
The code for these redefined is mostly copied from Blocky directly, with only some minor changes to comply with that syntax.

## Non-block code
Blockly can add code not directly defined by blocks
There is the init function, which runs before the code generation for any blocks run
and the finish function, which runs after all the code generation for any blocks has finished
Here we add information from the other tabs; the Board Editor and the Game Assets
Again, the code here is copied from blockly, which some strategic additions to add our information and comply with the syntax needed.

