---
title: "Elevate Your V Project With Unit Tests"
subtitle: V makes it easy to add tests to your project. Here's how to get started.
summary: The next blog post after The Complete Beginner's Guide to CLI Apps in V. We discuss why unit testing is important, shed some light on V's testing culture, and add unit tests to our toy project geo.
page: Blog
authorname: Subhomoy Haldar
authorlink: subhomoy-haldar
categories: ["tutorials"]
date: 2022-01-24T14:59:44+05:30
image: images/elevate-your-v-projects-with-unit-tests/hero.webp
---

## Previous Article

This article picks up after the previous one:
[The Complete Beginner's Guide to CLI Apps in V](/the-complete-beginners-guide-to-cli-apps-in-v/).
If you haven't already, we encourage you to read that article first.

Afterwards, you can obtain the full source code on
[GitHub](https://github.com/hungrybluedev/geo) and continue with this
article.

## Why Even Bother?

Let's start by addressing the question: _Why even bother with unit tests?_
Here are a few reasons why unit tests make sense:

1. **Unit tests are easy to write,** and can prevent a lot of bugs from
   reaching the final product.
2. Running a unit test usually does not take long, unlike other more
   extensive tests. This **speeds up the iteration process** and helps
   developers ship their software faster.
3. Unit tests act as a supplement to the documentation and illustrative
   examples. They outline the behaviour of the system, and provide
   **concrete examples** of how to use the corresponding APIs.

You can take a look at the Wikipedia article on
[Unit testing](https://en.wikipedia.org/wiki/Unit_testing)
to learn more about it.

## V's Testing Culture

I joined the V team in 2021. Before that, I had contributed to
the [`rand`](https://modules.vlang.io/rand.html) module along with other devs
which involved writing a lot of unit tests.

It was rather simple to do because all the developers before us had included
a lot of unit tests in vlib that we could use as a reference. This is still valid
today. Whenever we propose the addition of new code to V's standard library,
we make sure to include unit tests for it. Additionally, before merging code
into the main repository, the GitHub Actions CI runner runs a whole bunch of
tests on it, including all the unit tests. This helps make sure that new code
does not break any existing code.

This disciplined manner of software development is good to emulate in all V
projects.

## Prerequisites

We assume that you know your way around the command-line interface. If
you don't, here is a good article to help you get started:
[The Command Line for Complete Beginners](https://flaviocopes.com/cli-for-beginners/)

Prior exposure to V is required. You can follow this article
for a quickstart on V: [Getting Started with V](/getting-started-with-v/).

We will pick up from where we left off in the
[previous article](/the-complete-beginners-guide-to-cli-apps-in-v/),
so make sure to have your project set up and ready to go.

Alternatively, you can clone the
[`geo` repository](https://github.com/hungrybluedev/geo), delete the
`test` directory and follow along with the tutorial. More information
on V's support for testing can be found in the
[documentation](https://github.com/vlang/v/blob/master/doc/docs.md#testing).

## A Brief Recap of `geo`

In the [last tutorial](/the-complete-beginners-guide-to-cli-apps-in-v/)
we created a complete command-line application using the built-in `flag`
module. So we already have the directory structure like this:

```text
$ tree .
.
├── geometry
│   ├── metadata.v
│   ├── options.v
│   ├── quadrilateral.v
│   └── triangle.v
├── geo.v
└── v.mod
```

The `v.mod` file anchors the root of the project so that it becomes easier
to use the `geometry` module. It also contains information about the project
itself, like the version, description, license, and so on.

`geo.v` contains the main entry point of the application. It processes
the command-line arguments and calls the `generate_shape` function with the
appropriate arguments.

The `geometry` directory contains the source for our module spread across
multiple files. The `metadata.v` file contains the metadata about the module
that it reads from `v.mod`. Next, `options.v` defines the various enums
and helper structs that help standardise the input. Finally, the `triangle.v`
and `quadrilateral.v` files contain the actual code for generating the
desired shapes.

We took an architectural decision to keep the signature of all of the
shape generation functions the same:
`pub fn generate_xyz(options ShapeOptions) []string`. We will use this
to keep our testing strategy simple.

## First Steps

First, we create a `test` directory. Then we create a `unit_tests` directory.
Inside that, we create a file `triangle_test.v` in which we will write our
first test function.

In general, we take the following steps to write unit tests:

1. Prepare the input for a function to test.
2. Run the function.
3. Compare the result with the expected output.

The way we proceed is to create a new `ShapeOptions` struct with the
necessary options. Then we obtain the result of calling the required
`generate_xyz()` function. We will then proceed to check if it is the same
output as we expected. Let's start with the `generate_left_triangle` function.

The test looks like this:

```v {linenos=table}
import geometry

fn test_generate_left_triangle_big_6() {
	opts := geometry.ShapeOptions{
		size: 6
	}
	shape := geometry.generate_left_triangle(opts)
	assert shape == ['*', '**', '***', '****', '*****', '******']
}
```

Notice that we do not have a `module xyz` file at the top. We do not
need this line in our case because we're testing public functions.
However, you may need to test the private (module-only) functions in some
instances. In that case, the test file is put in the same folder as the
source file containing the code you want to test, and the test file
needs to have the module declaration at the top.

You may include a module declaration like `module geometry_test` at
the top of these files but that is not compulsory, as stated before.
Ideally, you should be testing all the public facing functions so that
you have room to refactor your private functions without any users noticing.

A few things are important to note here:

1. The test files need to have a `_test.v` suffix. Otherwise, the V
   testing command will simply ignore the file.
2. The functions to be executed must have a `test_` prefix. Any functions
   whose names do not start with `test_` will be skipped by `v test`, but
   may exist as helper functions for the tests. This is quite useful if
   you have common code shared by multiple tests.
3. The `assert (boolean_expression)` statement is how we check
   the result of a test. You can use any valid boolean expression you
   want, including but not limited to the comparison operators.
4. When we do not include the `module` declaration, we need to `import`
   it, just like normal code has to import it, to make the required functions
   available. This is not necessary when we define the test file right in the
   module and declare it to be a part of it.

## The `v test` Command

Running the test is simple. Navigate to the root of the repository in
the terminal. Then run `v test .`., which will recursively find all
`_test.v` files and run all the `test_` functions. We have only
one file and one function right now, so the output should be something
like:

```text
---- Testing... --------------------------------------------------------------------
 OK     314.481 ms /path/to/geo/test/unit_tests/triangle_test.v
------------------------------------------------------------------------------------
Summary for all V _test.v files: 1 passed, 1 total. Runtime: 315 ms, on 1 job.

```

Nice! Now that it works, we can add more functions progressively. I'm including the
full source here, which you can also find on the
[`test` directory](https://github.com/hungrybluedev/geo/tree/main/test/). The full
set of tests is written by [SheatNoisette](https://github.com/SheatNoisette).

### `triangle_test.v`

```v {linenos=table}
import geometry

// -----------------------------------------------------------------------------
// Left triangle
// -----------------------------------------------------------------------------

// Test to generate a left triangle of size 6 without custom symbol
fn test_generate_left_triangle_big_6() {
	opts := geometry.ShapeOptions{
		size: 6
	}
	shape := geometry.generate_left_triangle(opts)
	assert shape == ['*', '**', '***', '****', '*****', '******']
}

// Test to generate a left triangle of size 2 without custom symbol
fn test_generate_left_triangle_small_2() {
	opts := geometry.ShapeOptions{
		size: 2
	}
	shape := geometry.generate_left_triangle(opts)
	assert shape == ['*', '**']
}

// Test to generate a left triangle of size 2 with a custom symbol
fn test_generate_left_triangle_small_2_custom() {
	opts := geometry.ShapeOptions{
		size: 2
		symbol: `x`
	}
	shape := geometry.generate_left_triangle(opts)
	assert shape == ['x', 'xx']
}

// Invalid left triangle
fn test_generate_left_triangle_invalid() {
	opts := geometry.ShapeOptions{
		size: -1
	}
	shape := geometry.generate_left_triangle(opts)
	assert shape.len == 0
}

fn test_generate_left_triangle_unicode_1() {
	opts := geometry.ShapeOptions{
		size: 3
		symbol: `🔼`
	}
	shape := geometry.generate_left_triangle(opts)
	assert shape == ['🔼', '🔼🔼', '🔼🔼🔼']
}

fn test_generate_left_triangle_unicode_2() {
	opts := geometry.ShapeOptions{
		size: 2
		symbol: `ॐ`
	}
	shape := geometry.generate_left_triangle(opts)
	assert shape == ['ॐ', 'ॐॐ']
}

// -----------------------------------------------------------------------------
// Right triangle
// -----------------------------------------------------------------------------

// Test to generate a left triangle of size 6 without custom symbol
fn test_generate_right_triangle_big_6() {
	opts := geometry.ShapeOptions{
		size: 6
	}
	shape := geometry.generate_right_triangle(opts)
	assert shape == ['     *', '    **', '   ***', '  ****', ' *****', '******']
}

// Test to generate a left triangle of size 2 without custom symbol
fn test_generate_right_triangle_small_2() {
	opts := geometry.ShapeOptions{
		size: 2
	}
	shape := geometry.generate_right_triangle(opts)
	assert shape == [' *', '**']
}

// Test to generate a left triangle of size 2 with a custom symbol
fn test_generate_right_triangle_small_2_custom() {
	opts := geometry.ShapeOptions{
		size: 2
		symbol: `x`
	}
	shape := geometry.generate_right_triangle(opts)
	assert shape == [' x', 'xx']
}

// Invalid right triangle
fn test_generate_right_triangle_invalid() {
	opts := geometry.ShapeOptions{
		size: -1
	}
	shape := geometry.generate_right_triangle(opts)
	assert shape.len == 0
}

fn test_generate_right_triangle_unicode_1() {
	opts := geometry.ShapeOptions{
		size: 3
		symbol: `🔼`
	}
	shape := geometry.generate_right_triangle(opts)
	assert shape == ['  🔼', ' 🔼🔼', '🔼🔼🔼']
}

fn test_generate_right_triangle_unicode_2() {
	opts := geometry.ShapeOptions{
		size: 2
		symbol: `🀃`
	}
	shape := geometry.generate_right_triangle(opts)
	assert shape == [' 🀃', '🀃🀃']
}

// -----------------------------------------------------------------------------
// Pyramid
// -----------------------------------------------------------------------------

// Test to generate a left triangle of size 6 without custom symbol
fn test_generate_pyramid_big_6() {
	opts := geometry.ShapeOptions{
		size: 6
	}
	shape := geometry.generate_pyramid(opts)
	assert shape == ['     *', '    ***', '   *****', '  *******', ' *********', '***********']
}

// Test to generate a left triangle of size 2 without custom symbol
fn test_generate_pyramid_small_2() {
	opts := geometry.ShapeOptions{
		size: 2
	}
	shape := geometry.generate_pyramid(opts)
	assert shape == [' *', '***']
}

// Test to generate a left triangle of size 2 with a custom symbol
fn test_generate_pyramid_small_2_custom() {
	opts := geometry.ShapeOptions{
		size: 2
		symbol: `x`
	}
	shape := geometry.generate_pyramid(opts)
	assert shape == [' x', 'xxx']
}

// Invalid pyramid
fn test_generate_pyramid_invalid() {
	opts := geometry.ShapeOptions{
		size: -1
		symbol: `x`
	}
	shape := geometry.generate_pyramid(opts)
	assert shape.len == 0
}

fn test_generate_pyramid_unicode_1() {
	opts := geometry.ShapeOptions{
		size: 3
		symbol: `🔼`
	}
	shape := geometry.generate_pyramid(opts)
	assert shape == ['  🔼', ' 🔼🔼🔼', '🔼🔼🔼🔼🔼']
}

fn test_generate_pyramid_unicode_2() {
	opts := geometry.ShapeOptions{
		size: 2
		symbol: `🀃`
	}
	shape := geometry.generate_pyramid(opts)
	assert shape == [' 🀃', '🀃🀃🀃']
}

```

The source for `triangle_test.v` is available
[here](https://github.com/hungrybluedev/geo/blob/main/test/unit_tests/triangle_test.v).

### `quadrilateral_test.v`

```v {linenos=table}
import geometry

// -----------------------------------------------------------------------------
// Square
// -----------------------------------------------------------------------------

// Test to generate a square of size 6 without custom symbol
fn test_generate_square_big_6() {
	opts := geometry.ShapeOptions{
		size: 6
	}
	shape := geometry.generate_square(opts)
	assert shape == ['******', '******', '******', '******', '******', '******']
}

// Test to generate a small square of size 2 without custom symbol
fn test_generate_square_small_2() {
	opts := geometry.ShapeOptions{
		size: 2
	}
	shape := geometry.generate_square(opts)
	assert shape == ['**', '**']
}

// Test to generate a small square of size 2 with a custom symbol
fn test_generate_square_small_2_custom() {
	opts := geometry.ShapeOptions{
		size: 2
		symbol: `x`
	}
	shape := geometry.generate_square(opts)
	assert shape == ['xx', 'xx']
}

// Invalid square
fn test_generate_square_invalid() {
	opts := geometry.ShapeOptions{
		size: -1
	}
	shape := geometry.generate_square(opts)
	assert shape.len == 0
}

fn test_generate_square_unicode_1() {
	opts := geometry.ShapeOptions{
		size: 3
		symbol: `🔼`
	}
	shape := geometry.generate_square(opts)
	assert shape == ['🔼🔼🔼', '🔼🔼🔼', '🔼🔼🔼']
}

fn test_generate_square_unicode_2() {
	opts := geometry.ShapeOptions{
		size: 2
		symbol: `🀃`
	}
	shape := geometry.generate_square(opts)
	assert shape == ['🀃🀃', '🀃🀃']
}

// -----------------------------------------------------------------------------
// Diamond
// -----------------------------------------------------------------------------

// Test to generate a diamond of size 5 without custom symbol
fn test_generate_diamond_big_7() {
	opts := geometry.ShapeOptions{
		size: 5
	}
	shape := geometry.generate_diamond(opts)
	assert shape == ['    *', '   ***', '  *****', ' *******', '*********', ' *******', '  *****',
		'   ***', '    *']
}

// Test to generate a small diamond of size 2 without custom symbol
fn test_generate_diamond_small_2() {
	opts := geometry.ShapeOptions{
		size: 2
	}
	shape := geometry.generate_diamond(opts)
	assert shape == [' *', '***', ' *']
}

// Test to generate a small diamond of size 2 with a custom symbol
fn test_generate_diamond_small_2_custom() {
	opts := geometry.ShapeOptions{
		size: 2
		symbol: `x`
	}
	shape := geometry.generate_diamond(opts)
	assert shape == [' x', 'xxx', ' x']
}

// Invalid diamond
fn test_generate_diamond_invalid() {
	opts := geometry.ShapeOptions{
		size: -1
	}
	shape := geometry.generate_diamond(opts)
	assert shape.len == 0
}

fn test_generate_diamond_unicode_1() {
	opts := geometry.ShapeOptions{
		size: 3
		symbol: `🔼`
	}
	shape := geometry.generate_diamond(opts)
	assert shape == ['  🔼', ' 🔼🔼🔼', '🔼🔼🔼🔼🔼', ' 🔼🔼🔼', '  🔼']
}

fn test_generate_diamond_unicode_2() {
	opts := geometry.ShapeOptions{
		size: 2
		symbol: `শ`
	}
	shape := geometry.generate_diamond(opts)
	assert shape == [' শ', 'শশশ', ' শ']
}

```

The source for `quadrilateral_test.v` is available
[here](https://github.com/hungrybluedev/geo/blob/main/test/unit_tests/quadrilateral_test.v).

### Observations

You might have noticed that we're using unicode characters in the tests.
We've made our implementation robust enough to support them.

You can add more tests if you want. We do not need to consider all the
possible cases. It depends on how they are prioritized. Ideally,
every single public facing function should have an accompanying unit
test, and the test suite must execute all of the relevant lines in the
project (which we refer to as _coverage_).

Practically, we settle for certain thresholds (like 90% coverage), or unit
testing only the critical, unchanging components. If you're in a team, listen
to what your senior says. If you're the senior, don't set unrealistic
expectations for your team, or yourself.

## BONUS: Functional Testing

Until now, we assessed that our implementation is not blatantly wrong by
testing the functions of the `geometry` module directly. We would also like to
make sure the program can compile and generate coherent output. In order
to test this, we can make our test compile and run a separate V program, and
compare its output to our expected results.

### Checking the Help Text

We will need one of the functions from the `execute` family in the `os`
module. Starting with something simple, we can see if running the
executable with the `--help` flag produces an output with a few
expected phrases like _Description_, _Usage_, the various flags, etc.

The plan is to use the `os.execute_or_panic('...')` function to
spawn a new subprocess that will run the `v test .` command. However,
we need to take a few extra steps to make sure that we can actually
run the command properly on all systems. Next, we store the output
of the process and see if it contains a list of terms that we
specify in an array.

In a new directory called `command_line_tests` in the `tests` folder,
we create a new file `help_text_test.v`:

```v {linenos=table}
import os

const (
	output_search_terms = [
		'Usage',
		'Description',
		'Options',
		'-p, --shape <string>',
		'-z, --size <int>',
		'-m, --symbol <string>',
		'-h, --help',
		'--version',
	]
)

fn test_help() {
	flags := ['--help', '-h']

	for flag in flags {
		result := os.execute_or_panic('${os.quoted_path(@VEXE)} run . $flag')

		assert result.exit_code == 0
		for term in output_search_terms {
			assert result.output.contains(term)
		}
	}
}

```

Note that we do not simply use `'v run . $flag'`. This is because we may
be testing a development version of V that is not symlinked or added to path.
The `@VEXE` term is a compile-time constant that provides the path to the
V executable currently being run. Additionally, there may be instances
where people have `$` or spaces in their paths. In order to avoid confusing
the compiler, we use `os.quoted_path` to quote the path.

For the rest of code, we just use `asserts` normally.

The source for `help_text_test.v` is available
[here](https://github.com/hungrybluedev/geo/blob/main/test/command_line_tests/help_text_test.v).

### Checking the Exact Shape Outputs

In the `command_line_tests` directory, we create a file `multi_option_test.v`.

A lot of the code is repetitive so we use a struct to define our test
cases with the command-line arguments and the expected lines of output.
We also want to test cases where we specify all inputs and cases where we
specify only some of the parameters. For that, we use two different arrays
used in two separate test functions. The rest of the code is otherwise
very similar to the help text checking test.

The source code follows:

```v {linenos=table}
import os

struct RunConfig {
	shape  string
	size   int    = 5
	symbol string = '*'
	output []string
}

const (
	all_options_test_cases = [
		RunConfig{
			shape: 'square'
			size: 5
			symbol: '|'
			output: ['|||||', '|||||', '|||||', '|||||', '|||||']
		},
		RunConfig{
			shape: 'pyramid'
			size: 3
			symbol: '^'
			output: ['  ^', ' ^^^', '^^^^^']
		},
		RunConfig{
			shape: 'diamond'
			size: 4
			symbol: '*'
			output: ['   *', '  ***', ' *****', '*******', ' *****', '  ***', '   *']
		},
	]
	shape_only_test_cases = [
		RunConfig{
			shape: 'square'
			output: ['*****', '*****', '*****', '*****', '*****']
		},
		RunConfig{
			shape: 'pyramid'
			output: ['    *', '   ***', '  *****', ' *******', '*********']
		},
		RunConfig{
			shape: 'left-triangle'
			output: ['*', '**', '***', '****', '*****']
		},
	]
)

fn test_all_options() {
	for case in all_options_test_cases {
		result := os.execute_or_panic('${os.quoted_path(@VEXE)} run . --shape $case.shape --size $case.size --symbol "$case.symbol"')

		assert result.exit_code == 0
		assert result.output.split_into_lines() == case.output
	}
}

fn test_shapes_only() {
	for case in shape_only_test_cases {
		result := os.execute_or_panic('${os.quoted_path(@VEXE)} run . --shape $case.shape')

		assert result.exit_code == 0
		assert result.output.split_into_lines() == case.output
	}
}

```

As always, we run the tests with `v test .` from the root of the project.
If we need to run only the unit tests, we can type ` v test test/unit_tests`
instead. Remember to use `Tab` for autocomplete support for paths.

## BONUS: Running Specific Tests

If you run `v help test`, you will come across a lot of useful information.
Most of it has been demonstrated in this article, but there are some tid-bits
that you may find intriguing. One of these is the `-run-only` option:

```text
If you give `-run-only GPATTERN`, then *only* test functions, that do
match by name the given glob pattern `GPATTERN` will run. You can separate
multiple glob patterns with `,`.
If a _test.v file lacks matching functions for all of the glob patterns, it
will be ignored completely, so you can do in effect:
    `v test . -run-only test_your_fn_name`
... and V will run only that test function, no matter how many _test.v
files you have, and how many other test_ functions exist in them.
NB: glob patterns support `*` which matches anything, and `?`, that
matches any single character. They are *NOT* regular expressions however.
```

Let's try it on our project!

```text
$ v test . -run-only test_all_options
---- Testing... ------------------------------------------------------------------------
 OK     221.005 ms /path/to/geo/test/command_line_tests/multi_option_test.v
----------------------------------------------------------------------------------------
Summary for all V _test.v files: 1 passed, 1 total. Runtime: 221 ms, on 1 job.

$ v test . -run-only *generate*
---- Testing... ------------------------------------------------------------------------
 OK    [1/2]   231.238 ms /path/to/geo/test/unit_tests/quadrilateral_test.v
 OK    [2/2]   240.615 ms /path/to/geo/test/unit_tests/triangle_test.v
----------------------------------------------------------------------------------------
Summary for all V _test.v files: 2 passed, 2 total. Runtime: 241 ms, on 2 parallel jobs.
```

## Wrapping Up

This was a detailed example of how one would go about adding unit tests
to their V projects. Tests are good to have and instil confidence in the
maintainers of a project.

We covered a lot of ground with `geo` but not everything. Here are a list
of things that we did not do:

1. Testing the case when we don't specify a shape. The program will
   pause and prompt the user for input. This needs some careful
   planning to pull off correctly.
2. We did not check for the output of `--version`. This is a simple
   exercise and perhaps not as important to check for.
3. We could have tested for more configurations of command-line inputs.
4. We can have a better variety for the unit tests.

All of these are left as exercises for the interested reader.

Also, note that not all bugs can be eliminated using Unit Tests. There will
always be cases like malformed data, offline databases, failing infrastructure,
and so on that may not be your fault, but your software might need to
be robust enough to handle them. Above all else, user-testing is a must;
this ensures that the product _is_ indeed what the "client" asked for.
Unit testing is just a very efficient technique (one of many) to remove
a multitude of potential defects at once.

This article was a follow-up to
[The Complete Beginner's Guide to CLI Apps in V](/the-complete-beginners-guide-to-cli-apps-in-v/).
In the next one, we will discuss how to add support for GitHub Actions and
set up a Continuous Integration Pipeline.
