# Text2Chart VS Code Extension

Text2Chart is a JavaScript library that creates interactive diagrams from simple text. This extension use [Text2Chart](https://github.com/solothought/text2chart/) library to generate the diagrams when you preview a ".stflow" file.

- [Syntax](https://github.com/NaturalIntelligence/text2obj): Contents of `stflow` file should follow predefind syntax specified by text2object library.
- [Online Application](https://solothought.com/text2chart/). You may try online application before installing this plugin. 

## Features

- Draw Flow chart from simple text (file saved with ".stflow" extension)
- Helps to simplify and understand complex algorithms
- Highlight a path in the chart that makes easy to follow a logic.
- Hide/Show step detail in the chart
- Save chart as image
- Highlight reserved keywords
- Algorithm observations
- Expand/Collapse brnach nodes

## Usage

- Create a `.stflow` file
```stflow
#bin_search.stflow
FLOW: Binary Search Algorithm
LOOP searching for target in array
  read low (initial index of array)
  read high (last index of array)
  IF low <=  high
    THEN calculate mid ((low + high) / 2)
    IF array[mid] = target
      found target at mid
      STOP
    ELSE_IF array[mid] < target
      update low to mid + 1
    ELSE
      update high to mid - 1
  ELSE
    ERR Target not found
    STOP

```
- Select "Preview SoloThought Flow Chart" from either context menu or from command palette (Ctrl+Shift+P)

![SoloThought Text2Chart Flow](https://github.com/solothought/text2chart/raw/main/static/sampleflow.png)

