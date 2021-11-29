---
title: "Showcase #1: Vex by nedpals"
subtitle: An easy-to-use, modular web framework for V.
summary: A showcase of the Vex framework that resembles ExpressJS but in written in V.
page: Blog
authorname: Subhomoy Haldar
authorlink: subhomoy-haldar
categories: ["showcase"]
date: 2021-11-06T17:57:39+05:30
image: images/vex-showcase/hero.webp
---

## Introduction

Vex is an easy-to-use, modular web framework for V. It is inspired by
projects such as Express, and is a great library to quickly build web
applications with. It was created a fellow V Developer: [Ned](/people/ned-palacios/)

**Note:** The built-in web framework for V
[VWeb](https://github.com/vlang/v/tree/master/vlib/vweb)
is similar to Flask (the routes are defined as attributes). It is currently in
active development. It is also multi-threaded while Vex is not (yet). You
can choose whichever web framework you wish. The purpose of this article is to
showcase Vex's utility and showing off its features by building a toy API with
it.

## Getting Started With Vex

## Prerequisites

First, make sure that you have V installed and are familiar with the syntax.
Follow [this guide](/getting-started-with-v/) if you need help with that.

Next, make sure you have updated V recently. Just do `v up` and you should
be good to go.

### Creating A New Project

In a derired location, run the following command `v new`. Then follow the
prompts to initialise a new V project. Alternatively, you can create the
project folder and then do `v init`.

### Installing Vex

Then navigate to the **`v.mod`** file and add `'nedpals.vex'` to the dependency
list. Your file should look something like this:

```text {linenos=table}
Module{
	name: 'vex_example'
	description: 'A project that showcases the Vex web framework.'
	version: '0.0.1'
	license: 'MIT'
	dependencies: ['nedpals.vex']
}
```

The source for v.mod can be accessed
[here](https://github.com/hungrybluedev/vex-random-api/blob/main/v.mod).

Once you've updated the file, run `v install`. It will check the dependencies
listed in the module file and install them in the `VMODULES` directory.

### Hello, World!

Now that everything's installed, we can get started with a traditional
"Hello, World!" app.

The detailed instructions can be accessed from
[the Wiki](https://github.com/nedpals/vex/wiki/Introduction). The
condensed version is presented here.

Open the project folder in your favourite text editor. We recommend
[VSCode](https://code.visualstudio.com/) because we have published
an official plugin for it
[here](https://marketplace.visualstudio.com/items?itemName=vlanguage.vscode-vlang).

Modify the main `.v` file in the project and write the following code:

```v {linenos=table}
module main

import nedpals.vex.server
import nedpals.vex.ctx
import nedpals.vex.router

fn main() {
	mut app := router.new()
	app.route(.get, '/users/:name', fn (req &ctx.Req, mut res ctx.Resp) {
		name := req.params['name']
		res.send('Hello, $name!', 200)
	})
	server.serve(app, 8000)
}

```

To run the web server, type `v run .` in the terminal. Then navigate to
[localhost:8080/users/ned](http://localhost:8080/users/ned). You should
see something like this:

{{< rawhtml >}}

<figure>
<img
src="/images/vex-showcase/hello-world-vex.webp"
alt="Screenshot showing the text 'Hello, ned!' and the URL is localhost:8080/users/ned">
<figcaption>Hello World in Vex</figcaption>
</figure>

{{< /rawhtml >}}

**Tip:** In order to watch changes and recompile on save, use `v watch run .`
instead. You will need to refresh the page, but you won't need to restart
the web server.

## Explanation

Line 1 states that we are in the `main` module. This module's scope is
all of the files in the root directory, and this module should have a
main function (by convention).

Lines 3-5 import the various submodules in vex that we will make use of.

The `main` function starts from line 7. In it, we define a mutable instance
of the `app`, on which we define one or more routes. Here, we add a route
to `/users/:name` through the `.get` method, and pass a handler to it.

Inside the function handler, we retrieve the path variable `name` and then
return a custom response based on the path entered.

Finally, we serve the app on port 8080.

## Vex Random API

Now that Vex is functional, we can design a more complicated example to
utilise more features available in Vex such as:

1. HTML Templating
2. Static File Serving

In this example, we make a web app that returns a pseudorandom number
based on a set of parameters.

### API Design

We will expose two endpoints in the app.

1. The homepage is a static HTML page which will be served at the
   root `/` as the homepage.
2. An application endpoint at `/:generator` where the generator can be one
   of the supported PRNGs present in
   [vlib](https://modules.vlang.io/rand.html).
   It will also take query parameters that control the nature of output.

### Code

The complete and updated source code for this project is available
[here](https://github.com/hungrybluedev/vex-random-api).

Here is a brief description of all the files.

`v.mod` is the same as we already have. It lists `nedpals.vex` as a
dependency. Link to full
[source code](https://github.com/hungrybluedev/vex-random-api/blob/main/v.mod).

`vex_example.v` (or whatever you named your project) will contain
the `main` function. Inside the main function, we define the `app`,
and the various routes that it will be able to accept. Here is a
_condensed version_:

```v
module main

// imports

// constants

struct APIResult {
	title       string
	description string
	value       string
}

// valdation function

fn main() {
	mut app := router.new()

	// Serve the static files first
	app.route(.get, '/', fn (req &ctx.Req, mut res ctx.Resp) {
		res.send_file('static/index.html', 200)
	})

	app.route(.get, '/style.css', fn (req &ctx.Req, mut res ctx.Resp) {
		res.send_file('static/style.css', 200)
	})

	// Handle PRNG API requests
	app.route(.get, '/:generator', fn (req &ctx.Req, mut res ctx.Resp) {
		query_parameters := req.parse_query() or { defaults }

		min := validate('min', query_parameters)
		max := validate('max', query_parameters)
		float := validate('float', query_parameters)
		json := validate('json', query_parameters)

		generator := req.params['generator']

		result := generate_random_number(
			generator: generator
			min: min
			max: max
			float: float == 'true'
		)

		if json == 'true' {
			res.send_json(result, 200)
		} else {
			if result.value == '' {
				content := [
					html.tag(
						name: 'p'
						text: 'An error occured.'
					),
					html.tag(
						name: 'pre'
						text: result.description
					),
				]
				res.send_html(layout(result, content).html(), 200)
			} else {
				normalised_max := if max == '-1' { 'unspecified' } else { max }

				content := [
					// list of html.tag()'s
				]
				res.send_html(layout(result, content).html(), 200)
			}
		}
	})

	server.serve(app, port)
}
```

For the full updated source code, refer to
[this file](https://github.com/hungrybluedev/vex-random-api/blob/main/vex_example.v).

`layout.v` is in the same directory as the rest of the code. By default,
all files in the root directory (which contains `v.mod` as an anchor)
are considered to belong to the `main` module. All functions in all
files are accessible to other files in the same module (directory).
If the function (and constants) are declared public with `pub`, then
they are accessible outside the module as well.

This file contains the `layout` function that takes in a list of
`html.Tag` structs and properly formats them into a tree of tags.
The tree is then rendered into semantic HTML (by Vex) and returned
as the result of a GET request. A truncated version of the code follows:

```v
module main

import nedpals.vex.html

fn layout(result APIResult, content []html.Tag) html.Tag {
	title_text := '$result.title | Vex Random Number API'
	return html.html([
		html.block(
			name: 'head'
			children: [
				// meta tags
			]
		),
		html.block(
			name: 'body'
			children: [
				html.block(
					name: 'header'
					children: [
						html.tag(
							name: 'h1'
							attr: {
								'id': 'hero-heading'
							}
							text: result.title
						),
					]
				),
				html.block(
					name: 'main'
					children: content
				),
			]
		),
	])
}
```

The complete version of the code is available
[here](https://github.com/hungrybluedev/vex-random-api/blob/main/layout.v).

Finally, we have `generate.v` which is responsible for generating the
pseudorandom numbers based on the given options. We leverage the
in-built `rand` module (and its submodules) for this. This file makes use
of the **configuration struct** approach - V's recommended way for managing
named parameter arguments. The struct `GeneratorConfigStruct` is
initialised with the arguments necessary. The ones left uninitialised are
assigned the default zero values. This is in-line with V's philosophy of
avoiding undefined, nullable values as much as possible.

The source for `generator.v` follows.

```v {linenos=table}
module main

import rand
import rand.seed
import rand.wyrand
import rand.mt19937
import rand.splitmix64

const generators = {
	'rng': get_rng()
	'mt':  get_mt()
	'sm':  get_sm()
}

const generator_names = {
	'rng': 'Default V RNG'
	'mt':  'Mersenne Twister 19937'
	'sm':  'Splittable Random from Java 8'
}

fn get_rng() rand.PRNG {
	mut rng := wyrand.WyRandRNG{}
	rng.seed(seed.time_seed_array(2))
	return rng
}

fn get_mt() rand.PRNG {
	mut rng := mt19937.MT19937RNG{}
	rng.seed(seed.time_seed_array(2))
	return rng
}

fn get_sm() rand.PRNG {
	mut rng := splitmix64.SplitMix64RNG{}
	rng.seed(seed.time_seed_array(2))
	return rng
}

struct GeneratorConfigStruct {
	generator string
	min       string
	max       string
	float     bool
}

fn generate_random_number(config GeneratorConfigStruct) APIResult {
	mut rng := generators[config.generator] or {
		valid_generators := generators.keys().join(', ')
		return APIResult{
			title: 'Invalid generator'
			description: 'An invalid generartor was specified. The valid generators are ${valid_generators}.'
			value: ''
		}
	}
	no_max := config.max == '-1'

	if config.float {
		range_min := config.min.f64()
		mut value := 0.0
		if no_max {
			value = rng.f64() + range_min
		} else {
			range_max := config.max.f64()
			value = rng.f64_in_range(range_min, range_max)
		}

		return APIResult{
			title: 'Value: $value'
			description: 'The server returned the value: $value'
			value: value.str()
		}
	} else {
		range_min := config.min.int()
		mut value := 0
		if no_max {
			value = rng.int31() + range_min
		} else {
			range_max := config.max.int()
			value = rng.int_in_range(range_min, range_max)
		}

		return APIResult{
			title: 'Value: $value'
			description: 'The server returned the value: $value'
			value: value.str()
		}
	}
}

```

Link to source
[on GitHub](https://github.com/hungrybluedev/vex-random-api/blob/main/generate.v).

### Running The App

Running the app is easy. In the root directory, run `v run .` to start
the server.

{{< rawhtml >}}

<figure>
<img
src="/images/vex-showcase/vex-random-api-example.webp"
alt="Screenshot showing a sample response of 4 returned by the API at the URL localhost:8080/min=1&max=10">  
<figcaption>A sample response from the API</figcaption>
</figure>

{{< /rawhtml >}}

If you want to change the port, add an environment variable `PORT` and set
it to your desired port number. Alternately in bash (and related shells),
you can start the server with `PORT=5555 v run .` which will set the
environment variable and run the server in a single line.

You do not need to have V installed if you want to deploy the app to a
server. You can create an executable simply by running `v .` as a command.
Additionally, you can create an optimised executable by running `v -prod .`,
for which you need to have a dedicated C compiler like GCC, Clang, or
MSVC installed. Make sure to compile the app on the same OS and architecture
as the deployment target. Then you can take the executable and just run it.
No other dependencies required.

## Closing Thoughts

Vex is a very simple framework and it takes very little effort to start
being productive with it. It leverages several features of V, such as
the strong typing, convenient syntax, and good developer experience to
help make the life of the developer easier. This combination is generally
resistant to runtime errors (by eliminating them at compile time).

If you're open to experimentation, and want to make an efficient app quickly,
you can try Vex. Let us know about your experience in our official
[Discord Server](https://discord.gg/vlang)!

## Contributing To Vex

If you want to help improve Vex, the best place to start would be building
more stuff in Vex. The more people use it, the more bugs will surface and
they will be fixed sooner. You can also help discuss and implement new
features such as support for multi-threading, expanding middleware support,
etc.
