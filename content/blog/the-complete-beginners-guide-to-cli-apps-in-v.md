---
title: "The Complete Beginner's Guide to CLI Apps in V"
subtitle: Learn how to make a fully featured CLI app in V in under an hour.
summary: Blog post that shows beginners how easy it is to build a CLI application in V. We build a sample app called geo that prints geometric shapes to the screen.
page: Blog
authorname: Subhomoy Haldar
authorlink: subhomoy-haldar
categories: ["tutorials"]
date: 2021-12-20T18:34:27+05:30
image: images/the-complete-beginners-guide-to-cli-apps-in-v/hero.webp
---

## Goal

Our goal is to make a simple CLI application that prints various geometric
shapes to the screen depending on the options provided. It will be able to
recognise command-line arguments with the help of the
[`flag`](https://modules.vlang.io/flag.html) module.

Here's a sample output of our application:

```text
$ ./geo --shape pyramid --symbol ▲ --size 10
         ▲
        ▲▲▲
       ▲▲▲▲▲
      ▲▲▲▲▲▲▲
     ▲▲▲▲▲▲▲▲▲
    ▲▲▲▲▲▲▲▲▲▲▲
   ▲▲▲▲▲▲▲▲▲▲▲▲▲
  ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
 ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
```

Interested? Let's get started...

## Prerequisites

You should have V installed in your system. Ideally, you should also know
the basic syntax of V. If you need help with these, refer to
[this guide](/getting-started-with-v/).

Once you have V installed, make sure you have the latest version of V by
doing `v up`. It should automatically update your V installation. In case
of any technical difficulties, you can get in touch with us on the
[V Discord Server](https://discord.gg/vlang).

The source code for this project is available at
[this repository](https://github.com/hungrybluedev/geo).

## Initialising the Project

Navigate to a directory that you own. For example, `~/Projects` for Linux/MacOS
users and `C:\Projects` for Windows users. Then type the following command:

```text
v new
```

The tool will prompt you for the project name, description, version, and
license. Fill in the details as you see fit. Here is an example of what we can
enter.

```text
$ v new
Input your project name: geo
Input your project description: Sample CLI application that prints shapes to the screen.
Input your project version: (0.0.0) 0.0.1
Input your project license: (MIT)
Initialising ...
Complete!
```

Let us take a look at the files that were create by `v new`. In the folder, we
find a `v.mod` file and a `geo.v` file.

The `v.mod` file looks like this:

```text {linenos=table}
Module {
	name: 'geo'
	description: 'Sample CLI application that prints shapes to the screen.'
	version: '0.0.1'
	license: 'MIT'
	dependencies: []
}
```

And this is what `geo.v` contains:

```v {linenos=table}
module main

fn main() {
	println('Hello World!')
}
```

Let us make sure that we can run the project out of the box by typing the
command `v run .`:

```text
$ v run .
Hello World!
```

## Setting Up Modules

We can start structuring our application so that we stay organised. In the
root directory, create a new folder called `geometry`. Now we can make a
file `options.v`.

The directory structure now looks like this:

```text
.
├── geometry
│   └── options.v
├── geo.v
└── v.mod
```

We will put more files in the `geometry` folder as we progress but this is
a good starting point.

## Parsing Command-Line Arguments with the `flag` Module

In the main `geo.v` file, we can start with the following code:

```v {linenos=table}
module main

import os
import flag
import geometry

// get_shape_input continuously asks the user for a shape until the user enters a valid shape
fn get_shape_input() geometry.GeometricShape {
	for true {
		input_string := os.input_opt('Enter a shape: ') or { 'none' }

		if input_string == 'none' || input_string !in geometry.allowed_shapes {
			println('Invalid shape: $input_string')
			println('Available options are: ${geometry.allowed_shapes.join(', ')}')
			continue
		}

		return geometry.shape_map[input_string]
	}
	return geometry.GeometricShape.left_triangle
}

fn main() {
	mut fp := flag.new_flag_parser(os.args)

	fp.application('geo')
	fp.version('0.0.1')
	fp.description('A sample CLI application that prints geometric shapes to the console.')
	fp.skip_executable()

	show_help := fp.bool('help', `h`, false, 'Show this help text.')

	mut shape := fp.string('shape', `p`, 'none', 'The shape to use for the geometry.' +
		'\n                            Allowed shapes are: ${geometry.allowed_shapes.join(', ')}')

	shape_options := geometry.ShapeOptions{
		size: fp.int('size', `z`, 5, 'The size parameter for the shapes.')
		symbol: fp.string('symbol', `m`, '*', 'The symbol to use for the geometry.').runes()[0]
	}

	if show_help {
		println(fp.usage())
		exit(0)
	}

	if !shape_options.are_valid() {
		println('Size parameter must be positive.')
		exit(1)
	}

	if shape !in geometry.allowed_shapes && shape != 'none' {
		println('Invalid shape: $shape')
		println(fp.usage())
		exit(1)
	}

	shape_enum := if shape == 'none' { get_shape_input() } else { geometry.shape_map[shape] }

	lines := geometry.generate_shape(shape_enum, shape_options)
	println(lines.join_lines())
}

```

A few things to note here:

1. The `get_shape_input()` function takes input from the user and returns a
   valid `GeometricShape` when no shape is provided in the command-line
   arguments. It loops repeatedly until the user quits with `Ctrl+C` or enters
   a valid shape.
2. The `flag` module contains the `FlagParser` struct that provides a simple way
   to parse command-line arguments. We use it to progressively define the
   way in which the user can interact with the application. The options can be
   extracted as soon as they are defined.
3. Once all the relevant flags have been defined and all the metadata is
   entered, the `fp.usage()` lists all the data entered so far. We use this in
   lines 42 and 53, _after_ all the options have been defined and implemented.
4. The documentation for the `flag` module is available
   [here](https://modules.vlang.io/flag.html).

We have not yet defined `geometry.ShapeOptions` and `geometry.generate_shape`.
So let us do that in `geometry/options.v`:

```v {linenos=table}
module geometry

pub enum GeometricShape {
	left_triangle
	right_triangle
	pyramid
	square
	diamond
}

pub struct ShapeOptions {
	size   int
	symbol rune = `*`
}

pub fn (options ShapeOptions) are_valid() bool {
	return options.size > 0 && options.symbol != 0
}

pub const (
	shape_map = {
		'left-triangle':  GeometricShape.left_triangle
		'right-triangle': GeometricShape.right_triangle
		'pyramid':        GeometricShape.pyramid
		'square':         GeometricShape.square
		'diamond':        GeometricShape.diamond
	}
	allowed_shapes = shape_map.keys()
)

pub fn generate_shape(shape GeometricShape, options ShapeOptions) []string {
	return match shape {
		.left_triangle { [] }
		.right_triangle { [] }
		.pyramid { [] }
		.square { [] }
		.diamond { [] }
	}
}
```

The code is self-explanatory but here are some clarifications for the most
important parts of the code:

1. The `GeometricShape` enum contains the different shapes that we can use.
2. The `ShapeOptions` struct contains the options that we can use to generate
   the shapes: the size and the symbol.
3. `generate_shape` generates the shapes according to the parameters
   passed to it. Right now, it just returns an empty list for all the shapes.
   We will implement the logic in the next section.
4. We use the `shape_map` constant to map the string representation of the
   shape to the `GeometricShape` enum.
5. Also, these string representations are allowed user inputs. They are
   defined with `-` instead of `_` in their names. For convenience, we
   store them in `allowed_shapes`.
6. There is also an `are_valid()` function that checks if the options are
   valid. It is just simple check of only two logical checks but can be
   updated later to be more robust.

## The Shape Generation Logic

The actual functions for generating the shapes are stored in separate files.

V supports Unicode characters through the `rune` datatype. So whenever we
are dealing with individual characters, we use runes instead of bytes.

For the triangle functions, we store them in the `geometry/triangle.v` file:

```v {linenos=table}
module geometry

pub fn generate_left_triangle(options ShapeOptions) []string {
	if !options.are_valid() {
		return []
	}

	mut lines := []string{cap: options.size}
	for i in 0 .. options.size {
		line_length := i + 1
		mut line := []rune{cap: line_length}
		for _ in 0 .. line_length {
			line << options.symbol
		}
		lines << line.string()
	}
	return lines
}

pub fn generate_right_triangle(options ShapeOptions) []string {
	if !options.are_valid() {
		return []
	}

	mut lines := []string{cap: options.size}
	for i in 0 .. options.size {
		line_length := i + 1
		mut line := []rune{cap: options.size}
		for _ in 0 .. (options.size - i - 1) {
			line << ` `
		}
		for _ in 0 .. line_length {
			line << options.symbol
		}
		lines << line.string()
	}
	return lines
}

pub fn generate_pyramid(options ShapeOptions) []string {
	if !options.are_valid() {
		return []
	}

	mut lines := []string{cap: options.size}
	for i in 0 .. options.size {
		line_length := 2 * i + 1
		mut line := []rune{cap: options.size}
		for _ in 0 .. (options.size - i - 1) {
			line << ` `
		}
		for _ in 0 .. line_length {
			line << options.symbol
		}
		lines << line.string()
	}
	return lines
}
```

The square and diamond go in `geometry/quadrilateral.v`:

```v {linenos=table}
module geometry

pub fn generate_square(options ShapeOptions) []string {
	if !options.are_valid() {
		return []
	}

	single_line := options.symbol.repeat(options.size)
	lines := []string{len: options.size, init: single_line}
	return lines
}

pub fn generate_diamond(options ShapeOptions) []string {
	if !options.are_valid() {
		return []
	}

	mut lines := []string{cap: options.size * 2 - 1}

	// top half
	for i in 0 .. options.size {
		mut current_line := []rune{cap: options.size + i + 1}
		for _ in 0 .. (options.size - i - 1) {
			current_line << ` `
		}
		for _ in 0 .. (2 * i + 1) {
			current_line << options.symbol
		}
		lines << current_line.string()
	}

	// bottom half
	for i := options.size - 2; i >= 0; i-- {
		lines << lines[i]
	}
	return lines
}
```

So now, the structure of the project should look like the following:

```text
.
├── geometry
│   ├── options.v
│   ├── quadrilateral.v
│   └── triangle.v
├── geo.v
└── v.mod

```

## Final Touches

For future maintainability, we moved the application information to the
`geometry/metadata.v` file:

```v {linenos=table}
module geometry

import v.vmod

const manifest = vmod.from_file('v.mod') or { panic(err) }

pub const (
	version     = manifest.version
	name        = manifest.name
	description = manifest.description
)
```

Now we are directly extracting the name, version, description from the
`v.mod` file. So we only need to keep the information updated in one place.
We can modify the relevant part of the `geo.v` file as well:

```v
// ...

fn main() {
	mut fp := flag.new_flag_parser(os.args)

	fp.application(geometry.name)
	fp.version(geometry.version)
	fp.description(geometry.description)
	fp.skip_executable()
	// ...
}
```

Now, when we want to bump the version number for the project, we can just do
`v bump --patch`, `v bump --minor` or `v bump --major` at the root of the
repository.

## Final Demonstration

We can now run the application with the following commands:

1. `v run . --shape left-triangle --size 7 --symbol "x"`
2. `v .` or `v -prod .` which would produce the `geo` executable.
   Then `./geo --shape pyramid` or something similar to
   run the final executable with the command line options.
3. The `--help` command should also work.

Some sample runs are as follows:

> `v run . --shape left-triangle --size 7 --symbol "x"`

```text
x
xx
xxx
xxxx
xxxxx
xxxxxx
xxxxxxx
```

> `./geo --shape pyramid`

```text
    *
   ***
  *****
 *******
*********
```

> `./geo --shape diamond --size 5 --symbol "^"`

```text
    ^
   ^^^
  ^^^^^
 ^^^^^^^
^^^^^^^^^
 ^^^^^^^
  ^^^^^
   ^^^
    ^

```

> ` ./geo`

```text
Enter a shape: right-triangle
    *
   **
  ***
 ****
*****
```

> `./geo --help`

```text
geo x.y.z
-----------------------------------------------
Usage: geo [options] [ARGS]

Description: A sample CLI app for printing geometric shapes to the terminal.

Options:
  -h, --help                Show this help text.
  -p, --shape <string>      The shape to use for the geometry.
                            Allowed shapes are: left-triangle, right-triangle, pyramid, square, diamond
  -z, --size <int>          The size parameter for the shapes.
  -m, --symbol <string>     The symbol to use for the geometry.
```

## Concluding Thoughts

The full source code for the project is available
[here](https://github.com/hungrybluedev/geo).

It's very easy to make CLI applications really quickly in V. Especially
considering the fact that you do not need to validate the command-line
flags yourself. The user only needs to focus on building the business
logic for the application. In this tutorial, we built a sample application
of modest size that demonstrates how to use the `FlagParser` struct to
simplify command-line argument processing, and we also learned how to
structure a V application into modules.

It is important to note that structs, functions and constants not declared as
`pub` are all accessible to all files in the current module. In order to
access them outside the module, the `pub` keyword is necessary. This is
why we need `pub` for `generate_shape`, `GeometricShape`, etc, for us to be
able to use them in the external `main` module (`geo.v`).

Hopefully, this tutorial has been helpful to you. You can get in touch with
the [V Discord community](https://discord.gg/vlang) if you have any questions
or suggestions. We are not quite done with `geo` yet, because we will
explore how to write unit tests in V and implement continuous integration
with GitHub Actions. Stay tuned!
