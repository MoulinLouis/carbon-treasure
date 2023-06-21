<!-- Language : English -->

## Langues
- [English](README.md)
- [Français](README.fr.md)

# Treasure Map

## Context

The Peruvian government has authorized adventurers to explore the 85,182 km² area of Madre de Dios. Your task is to create a system that tracks the movements and treasure collections of these adventurers. The Peruvian government emphasizes the importance of high-quality, readable, and maintainable code, which includes writing tests.

## Problem description

### The map

The Madre de Dios map is a rectangular grid, where each cell has the same size. The map contains plains, mountains, and treasures.

The dimensions of the map are defined in the input file as follows:

```
# {C as Carte} - {Number of columns} - {Number of rows}
C - 3 - 4
```

By default, all cells on the map are plains that adventurers can traverse without any obstacles. The cells are numbered from west to east and from north to south, starting from zero.

Mountains are impassable obstacles for adventurers. Each mountain in the Madre de Dios map is indicated in the input file as follows:

```
# {M as Mountain} - {Horizontal coordinate} - {Vertical coordinate}
M - 1 - 1
```

The most important aspect for adventurers is the treasure. Multiple treasures can be located on the same cell, and the number of treasures on a cell is indicated in the input file as follows:

```
# {T as Treasure} - {Horizontal coordinate} - {Vertical coordinate} - {Number of treasures}
T - 0 - 3 - 2
```

Example for a 3x4 map:

```
C - 3 - 4
M - 1 - 1
M - 2 - 2
T - 0 - 3 - 2
T - 1 - 3 - 1
```

Which can be represented as:

```
. . .
. M .
. . M
T(2) T(1) .
```

### The Adventurers

An adventurer is characterized by their position on the map and their orientation (north, south, east, or west). They can only move one cell at a time in the direction determined by their orientation. However, they can change their orientation by turning 90 degrees to the right or left. Adventurers start with an initial orientation (north, south, east, or west) and a predefined movement sequence consisting of actions (Advance, Turn Left, Turn Right). Adventurers are not mountaineers, so they cannot traverse mountain cells.

Example movement sequence:
```
AGGADADA will become: Advance, Turn Left, Turn Left, Advance, Turn Right, Advance, Turn Right, Advance.
```

The adventurers present on the map are indicated in the input file as follows:

```
# {A as Adventurer} - {Adventurer's name} - {Horizontal coordinate} - {Vertical coordinate} - {Orientation} - {Movement sequence}
A - Indiana - 1 - 1 - S - AADADA
```

Example for a 3x4 map:

```
Initially:
. . .
. A .
M . .
. . .

After the movements, indicated by the number in parentheses:
. . .
. . .
M (1) .
A (2) .
```

### Input file format

The program should be able to read the input file in the following format:

```
C - 3 - 4
M - 1 - 0
M - 2 - 1
T - 0 - 3 - 2
T - 1 - 3 - 3
A - Lara - 1 - 1 - S - AADADAGGA
```

### Output file format

The program should write the output file in the following format:

```
C - 3 - 4
M - 1 - 0
M - 2 - 1
T - 1 - 3 - 2
A - Lara - 0 - 3 - S - 3
```

## Usage

- Install the necessary dependencies using npm:

```npm install```

- Write an input file on `./data/input.txt`. An example is already ready, feel free to edit it.

- Run the program using the following command:

```npm start```

- The output will be written to the `./data/output.txt` file.



## Testing

You can run the unit tests using the following command:

```npm test```