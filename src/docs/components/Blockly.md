# Blockly.md

Blockly is the component were the Code Builder is defined.

## Template

The crucial part of the template is the blockly-wrapper div, where Blockly will inject itself.
Everything inside that wrapper is then handled by Blockly.

## Script

Once the component is mounted, which implies that all the relevant divs have been created, the script calls
a blocklyInit through the store. The blocklyInit script can be found in utilities, and takes care of modifying
Blockly with custom blocks, and then injecting it into the blockly-wrapper div.
