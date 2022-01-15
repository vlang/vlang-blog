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

You should have V installed on your system. Ideally, you should also know
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

Let us take a look at the files that were created by `v new`. In the folder,
we find a `v.mod` file and a `geo.v` file.

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

## Accepting Command-Line Arguments

Let us start with how we want to accept command-line arguments. We can make
use of the built-in [`flag`](https://modules.vlang.io/flag.html) and
[`os`](https://modules.vlang.io/os.html) modules to do this. In order to use
these modules in our code, we will need to `import` them.

We will start simple and put everything in the `main` function which is the
entry point for the application. By default, all variables defined in V
are immutable. To make a variable mutable we need to use the `mut` keyword.
We will make use of this when we define a new `FlagParser` struct using the
`flag.new_flag_parser()` function.

The `FlagParser` can then be modified to add details about the application.
Additionally, we define the various types of flags that we want to accept
using functions such as `bool(...)`, `int(...)`, `string(...)`, etc. When
the function is called, it will match pieces of the command line arguments
to the flags we defined and we store the values in variables that will
be used later.

Right now, we can just print out the values we've parsed to the screen.
And when we're done, we need to call `finalize()` to finish the parsing,
and obtain the rest of the arguments provided by the user.

Note that the flag module automatically adds `-h/--help` and `--version`
when `finalize()` is called.

The code should now look like this:

```v {linenos=table}
module main

import os
import flag

fn main() {
	mut fp := flag.new_flag_parser(os.args)

	fp.application('geo')
	fp.version('0.0.1')
	fp.description('A sample CLI application that prints geometric shapes to the console.')
	fp.skip_executable()

	shape := fp.string('shape', `p`, 'none', 'The shape to use for the geometry.').to_lower()

	size := fp.int('size', `z`, 5, 'The size parameter for the shapes.')
	symbol := fp.string('symbol', `m`, '*', 'The symbol to use for the geometry.').runes()[0] or {
		`*`
	}

	additional_args := fp.finalize() ?

	if additional_args.len > 0 {
		println('Unprocessed arguments:\n$additional_args.join_lines()')
	}

	println(shape)
	println(size)
	println(symbol)
}
```

We define our parser in line 7. We initialize it with details such as the
name of the application, version, description, etc. Next, we define the various
flags that we want to use. The general syntax is
`` fp.<type>('<name>', `<short_name>`, <default_value>, '<description>') ``.

Note that we use backticks to represent a single character, which is also known
as a _rune_. Also, we use the `to_lower()` function to convert the shape input
to lowercase to simplify the processing down the road. We also make sure that
we protect against zero-length strings for the specified symbol using an `or {}`
block. If the user inputs something invalid, it will default to `*`.

After we're done processing the flags, we call `finalize()` to obtain the
remaining arguments. We don't do anything with them, so we list them as
ignored. In your application, you may use them to get the path of a file,
or the name of a directory, and so on.

Finally, we print out the values of the flags to the screen.

To run the code, we can use the `v run` command:

```text
$ v run .
none
5
*
```

Alternatively, we can build the executable and then run the application:

```text
$ v .
$ ./geo
none
5
*
```

Now we test the different command-line arguments:

```text
$ v run . --size 12
none
12
*
$ v run . --size 20 --symbol +
none
20
+
$ v run . -p pyramid --symbol 🔺
pyramid
5
🔺
```

The `flag` module automatically adds a `--version` flag when
we call `fp.finalize()`. Here's how to use it:

```text
$ v run . --version
geo 0.0.1
$ ./geo --version
geo 0.0.1
```

The same is also true for the `--help` or `-h` flag:

```text
$ v run . --help
# or
$ ./geo -h
geo 0.0.1
-----------------------------------------------
Usage: geo [options] [ARGS]

Description: A sample CLI application that prints geometric shapes to the console.

Options:
  -p, --shape <string>      The shape to use for the geometry.
  -z, --size <int>          The size parameter for the shapes.
  -m, --symbol <string>     The symbol to use for the geometry.
  -h, --help                display this help and exit
  --version                 output version information and exit
```

If you want to customise the output that is generated by the `--help`
and `--version` flags, you can redefine them and customise the behaviour.

## Working with Modules

We can start structuring our application so that we stay organised.

The recommended way to organise V code is with modules/subdirectories.
In our case, we want to create a module called `geometry` that contains the
relevant code not concerned with command-line argument processing. There
are two things we do to make this module.

1. In the root directory, create a new folder called `geometry`.
2. All the files inside this subdirectory will be part of the `geometry`
   module as long as they have the line `module geometry` at the top.

> If there is a file that does not include the `module geometry` line, then
> it will not be considered a part of the module and it won't have access to
> the non-public contents of the module. This is useful when you want to
> write unit tests and want to simulate external access to your module and
> ensure the public facing API is functioning correctly. Alternately, you
> can include the `module geometry` line in the test file and it can help you
> check the non-public parts of the module.

Now we can make a file `options.v` inside the geometry module folder. The
directory structure now looks like this:

```text
.
├── geometry
│   └── options.v
├── geo.v
└── v.mod
```

In this `options.v` file, we will start defining some structs, enums, and
functions that we will call from the `main` function in `geo.v`. We start
by defining an `enum` of the various types of shapes that we plan to
support:

```v
pub enum GeometricShapeKind {
	left_triangle
	right_triangle
	pyramid
	square
	diamond
}
```

Next, we define the configuration struct that we will store our user inputs
in to pass to the appropriate functions:

```v
pub struct ShapeOptions {
	kind   GeometricShapeKind
	size   int
	symbol rune = `*`
}

pub fn (options ShapeOptions) are_valid() bool {
	return options.size > 0 && options.symbol != 0
}
```

`ShapeOptions` stores the shape type, size, and symbol. We also define
a function `are_valid()` on the ShapeOptions type that checks if the
configuration provided is valid. Note that we apply a default value
of `*` to the symbol. So if it is left uninitialised, it will default
to `*`. V initialises every field in a struct with a zero-based value if
no further information is provided. In case of enums, the default value
is the first value specified in the enum.

Next, we define a map that makes it easy to convert strings to the
`GeometricShapeKind` enum. We also store the string keys to be used
later when we want to see if the user shape inputs are valid.

```v
pub const (
	shape_map = {
		'left-triangle':  GeometricShapeKind.left_triangle
		'right-triangle': GeometricShapeKind.right_triangle
		'pyramid':        GeometricShapeKind.pyramid
		'square':         GeometricShapeKind.square
		'diamond':        GeometricShapeKind.diamond
	}
	allowed_shapes = shape_map.keys()
)
```

Let's put in a temporary implementation of the `generate_shape()` function
which accepts a `ShapeOptions` variable:

```v
pub fn generate_shape(options ShapeOptions) []string {
	return match options.kind {
		.left_triangle { ['left_triangle'] }
		.right_triangle { ['right_triangle'] }
		.pyramid { ['pyramid'] }
		.square { ['square'] }
		.diamond { ['diamond'] }
	}
}
```

Putting everything together, here is the complete source for `options.v`
so far:

```v {linenos=table}
module geometry

pub enum GeometricShapeKind {
	left_triangle
	right_triangle
	pyramid
	square
	diamond
}

pub struct ShapeOptions {
	kind   GeometricShapeKind
	size   int
	symbol rune = `*`
}

pub fn (options ShapeOptions) are_valid() bool {
	return options.size > 0 && options.symbol != 0
}

pub const (
	shape_map = {
		'left-triangle':  GeometricShapeKind.left_triangle
		'right-triangle': GeometricShapeKind.right_triangle
		'pyramid':        GeometricShapeKind.pyramid
		'square':         GeometricShapeKind.square
		'diamond':        GeometricShapeKind.diamond
	}
	allowed_shapes = shape_map.keys()
)

pub fn generate_shape(options ShapeOptions) []string {
	return match options.kind {
		.left_triangle { ['left_triangle'] }
		.right_triangle { ['right_triangle'] }
		.pyramid { ['pyramid'] }
		.square { ['square'] }
		.diamond { ['diamond'] }
	}
}
```

Going back to `main` in `geo.v`, we make a few changes to properly
validate the user input for the shape. We use the `allowed_shapes`
list of strings to restrict the user input to the ones we will
implement. We also check that the size is greater than zero and that
the shape is either not specified, or that it is one of the allowed ones.

We use `'none'` as a dummy shape. If the user does not specify a shape,
we continuously ask for input from the user until they enter a valid
one or they quit by pressing `Ctrl-C`.

Finally, we can now call the `generate_shape()` function and pass in
the details for the `ShapeOptions` configuration struct.
If you are familiar with Python, this syntax is reminiscent of 
Python's named arguments.

The updated source code for `geo.v` is therefore:

```v {linenos=table}
module main

import os
import flag
import geometry

fn main() {
	mut fp := flag.new_flag_parser(os.args)

	fp.application('geo')
	fp.version('0.0.1')
	fp.description('A sample CLI application that prints geometric shapes to the console.')
	fp.skip_executable()

	shape := fp.string('shape', `p`, 'none', 'The shape to use for the geometry.' +
		'\n                            Allowed shapes are: ${geometry.allowed_shapes.join(', ')}').to_lower()

	size := fp.int('size', `z`, 5, 'The size parameter for the shapes.')
	symbol := fp.string('symbol', `m`, '*', 'The symbol to use for the geometry.').runes()[0] or {
		`*`
	}

	additional_args := fp.finalize() ?

	if additional_args.len > 0 {
		println('Unprocessed arguments:\n$additional_args.join_lines()')
	}

	if size <= 0 {
		println('Size parameter must be positive.')
		exit(1)
	}

	if shape !in geometry.allowed_shapes && shape != 'none' {
		println('Invalid shape: $shape')
		println(fp.usage())
		exit(1)
	}

	shape_kind := if shape == 'none' { get_shape_input() } else { geometry.shape_map[shape] }

	lines := geometry.generate_shape(kind: shape_kind, size: size, symbol: symbol)
	println(lines.join_lines())
}

// get_shape_input continuously asks the user for a shape until the user enters a valid shape
fn get_shape_input() geometry.GeometricShapeKind {
	for true {
		input_string := (os.input_opt('Enter a shape: ') or { 'none' }).to_lower()

		if input_string == 'none' || input_string !in geometry.allowed_shapes {
			println('Invalid shape: $input_string')
			println('Available options are: ${geometry.allowed_shapes.join(', ')}')
			continue
		}

		return geometry.shape_map[input_string]
	}
	return .left_triangle
}
```

We can run the project and make sure everything is working as it should:

```text
$ v run . --shape left-triangle --size 23 --symbol +
left_triangle
$ v run . --shape square --symbol .
square
$ v run .
Enter a shape: diamon
Invalid shape: diamon
Available options are: left-triangle, right-triangle, pyramid, square, diamond
Enter a shape: diamond
diamond
```

## Generating the Shapes

Now that we have the pipeline in place, we are ready to return proper
shapes as per the user input! We will return the shapes as a list of
strings, where each string is a line of the shape.

We add two new files to the `geometry` module:

1. `triangle.v` - for containing source code relevant to generation of
   triangular shapes.
2. `quadrilateral.v` - the same but for quadrilateral shapes.

The project structure will now be:

```text
├── geometry
│   ├── options.v
│   ├── quadrilateral.v
│   └── triangle.v
├── geo.v
└── v.mod
```

> It is important to note that we use arrays of `runes` to store
> the symbols. If we use bytes, we will only be able to support
> ASCII symbols. With the help of runes, we can support Unicode
> characters, such as emojis.

The logic to generate the shapes is rather straightforward. We will
verify that the options are valid, and if they are, we will return the
appropriate shape as an array of strings.

Here is the source code for the `triangle.v` file:

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

And here is the source code for the `quadrilateral.v` file:

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

All we are doing here is simple manipulations of arrays using nesting
and loops with interesting indices. Sometimes, we reuse the previous
lines and copy them over to simplify the shape generation, like we do
in the `generate_diamond` function.

In every function, we make use of `options.are_valid()` to check if
the options are valid. If they are, we return the shape. If they are
not, we return an empty array.

Finally, we can modify the `generate_shape` function to use the appropriate
functions and return the shapes as requested.

```v
pub fn generate_shape(options ShapeOptions) []string {
	return match options.kind {
		.left_triangle { generate_left_triangle(options) }
		.right_triangle { generate_right_triangle(options) }
		.pyramid { generate_pyramid(options) }
		.square { generate_square(options) }
		.diamond { generate_diamond(options) }
	}
}
```

Now when we run the project, we see the following outputs:

```text
$ v run .
Enter a shape: square
*****
*****
*****
*****
*****
$ v run . --size 10 --shape right-triangle --symbol "/"
         /
        //
       ///
      ////
     /////
    //////
   ///////
  ////////
 /////////
//////////
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

> `v run . --shape pyramid`

```text
    *
   ***
  *****
 *******
*********
```

> `v run . --shape diamond --size 5 --symbol "^"`

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

> ` v run .`

```text
Enter a shape: right-triangle
    *
   **
  ***
 ****
*****
```

> `v run . --help`

```text
geo x.y.z
-----------------------------------------------
Usage: geo [options] [ARGS]

Description: A sample CLI application that prints geometric shapes to the console.

Options:
  -p, --shape <string>      The shape to use for the geometry.
                            Allowed shapes are: left-triangle, right-triangle, pyramid, square, diamond
  -z, --size <int>          The size parameter for the shapes.
  -m, --symbol <string>     The symbol to use for the geometry.
  -h, --help                display this help and exit
  --version                 output version information and exit
```

> `v run . --version`
```text
geo x.y.z
```

## Concluding Thoughts

The full source code for the project is available
[here](https://github.com/hungrybluedev/geo).

It's very easy to make CLI applications really quickly in V. Especially
considering the fact that you do not need to validate the command-line
flags yourself. The user only needs to focus on building the business
logic for the application. In this tutorial, we built a sample application
of modest size that demonstrates how to use the `flag` module to
simplify command-line argument processing, and we also learned how to
structure a V application into modules.

It is important to note that structs, functions and constants not declared as
`pub` are all accessible to all files in the current module. In order to
access them outside the module, the `pub` keyword is necessary. This is
why we needed `pub` for `generate_shape`, `GeometricShape`, etc, for us to be
able to use them in the external `main` module (`geo.v`).

Hopefully, this tutorial has been helpful to you. You can get in touch with
the [V Discord community](https://discord.gg/vlang) if you have any questions
or suggestions. We are not quite done with `geo` yet, because we will
explore how to write unit tests in V and implement continuous integration
with GitHub Actions. Stay tuned!

## Acknowledgement

The idea for this demo project was provided by
[SheatNoisette](https://github.com/SheatNoisette) who also helped add the
unit tests.

I would also like to thank **spytheman** and **JalonSolov**, both of whom
are active on the [V Discord Server](https://discord.gg/vlang), and have
provided valuable feedback and suggestions.