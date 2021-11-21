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

```toml {linenos=table}
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
<img src="/images/vex-showcase/hello-world-vex.webp" alt="">  
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

### Code

### Running The App

## Closing Thoughts

## Contributing To Vex

If you want to help improve Vex, the best place to start would be building
more stuff in Vex. The more people use it, the more bugs will surface and
they will be fixed sooner. You can also help discuss and implement new
features such as support for multi-threading, expanding middleware support,
etc.
