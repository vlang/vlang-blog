---
title: "Getting Started With V"
subtitle: Hit the ground running with this collection of resources
summary: A beginners guide to finding documentation, seeking help, and feeling comfortable with V.
page: Blog
authorname: Subhomoy Haldar
authorlink: subhomoy-haldar
categories: ["tutorials"]
date: 2021-10-28T10:47:53+05:30
image: images/getting-started-with-v/hero.webp
---

## Introduction

V is a simple, fast, safe, compiled general purpose programming language
for developing maintainable software. There are several compelling reasons for using V,
which you can learn more about here: [The V Programming Language](https://vlang.io/)

In this post, we focus on getting new users up to speed so that they can start
working with V right away.

## Installing (and Updating) V

Since V is in active development, there will be a lot of breaking changes often.
Therefore, it is recommended that you install V from source.

### Installing V from source

```bash
git clone https://github.com/vlang/v
cd v
make # make.bat on Windows
```

V compiles itself really fast and requires no dependencies and libraries for self
compilation. For more information, see
[Installing V from source](https://github.com/vlang/v#installing-v-from-source).
You can optionally leverage established C compilers like GCC, Clang, or MSVC to
generate optimized binaries.

### Weekly Release

V makes weekly releases (besides the normal semantic version update releases)
if you do not prefer compiling from source.
You can find the releases here: [Releases](https://github.com/vlang/v/releases).

### Symlinking

The V executable generated (or obtained) is not automatically added to your PATH.
V provides a convenient solution to this.

```text
# On Linux, Mac OS, and other similar systems
sudo ./v symlink

# On Windows, open an Administrator shell and run the following.
# NOTE: This is the ONLY command that neeeds to be run from an Administrator shell.
.\v.exe symlink
```

Refer to this section for more information: [Symlinking](https://github.com/vlang/v#symlinking).

### Updating V

Similar to `rustup`, V supports the following command:

```text
v up
```

This command updates the V compiler to the latest version available from the main [Github repository](https://github.com/vlang/v).

## Learning V

Syntactically, V is similar to Go. Therefore GoLang devs can feel at home when they
write V code. Knowledge of Go is not necessary; the language is very simple and the
main concepts can be learned over a weekend.

The official documentation for the language is written in a single markdown document:
[V Documentation](https://github.com/vlang/v/blob/master/doc/docs.md).

The documentation for all of the modules included in the V standard library (vlib) is
available here: [vlib Documentation](https://modules.vlang.io/). You are encouraged to use
the search bar to find the functions and structs you need for your project.

For a taste of V here is a truncated example of TOML file parsing. The sample TOML file is
available here: [TOML Example](https://github.com/toml-lang/toml/blob/3b11f6921da7b6f5db37af039aa021fee450c091/README.md#Example)

```v {linenos=table}
import toml
import toml.to

// Multiline string
const toml_text = '# This is a TOML document.

title = "TOML Example"

[owner]
name = "Tom Preston-Werner"
...
Truncated
...
'

fn main() {
	doc := toml.parse_text(toml_text) or { panic(err) }
	title := doc.value('title').string()
	println('title: "$title"')
	ip := doc.value('servers.alpha.ip').string()
	println('Server IP: "$ip"')

	toml_json := to.json(doc)
	println(toml_json)
}

```

Source code: [toml.v](https://github.com/vlang/v/blob/master/examples/toml.v)

## Setting up your Development Environment

### Code Editor

You are free to use any code editor you prefer. We recommend
[Visual Studio Code](https://code.visualstudio.com/)
for beginners because we support it officially through the
[VSCode extension](https://marketplace.visualstudio.com/items?itemName=vlanguage.vscode-vlang).
For help with other editors, please join our [Discord Server](https://discord.gg/vlang).

### Language Server

The [V Language Server](https://github.com/vlang/vls) (WIP) is an
[LSP](https://microsoft.github.io/language-server-protocol/)
compatible language server. The VSCode extension should be able to automatically
download and install VLS. In case of errors,
check out the [pre-built binaries](https://github.com/vlang/vls/releases), or
[build VLS from source](https://github.com/vlang/vls#build-from-source). If your find any bugs,
get them confirmed in the **#vls** channel on our server and then report them on
[Github](https://github.com/vlang/vls/issues). We are also open to contributions!

### Running a V Program

Your project should have at least one `main` function. Then you can compile and run
you code in one of two ways:

1. Directly run the program with `v run file.v` or `v run directory`.
   You can even do `v run .` to run the only main function in the directory.
2. Compile the program with `v file.v` (optionally as `v -prod file.v`) and then run
   the generated executable.

### Miscellaneous

You need `git` to clone and update V. Make sure that it is installed on your machine.

Additionally, use `v new` and `v init` as necessary, and use `v fmt -w /path/`
to automatically format your source code. Consult `v help init` and `v help fmt`
for more information.

## Getting Help and Reaching Out

It is recommended that you make frequent use of `v help`, consult the
[language documentation](https://github.com/vlang/v/blob/master/doc/docs.md)
and the
[modules documentation](https://modules.vlang.io/).
If you want to get specific help, reach out to us directly, or just hang out with
the V community members, join our [Discord Server](https://discord.gg/vlang). Use the
appropriate channels for your needs.

While developing in V, you may encounter bugs. Please report them in the **#bugs** channel, and file [Github issues](https://github.com/vlang/v/issues) about them with `v bug file.v`.
