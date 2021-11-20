# Blog | The V Programming Language

This repository contains the source code as well as the the content for
V Lang's blog hosted at: [blog.vlang.io](https://blog.vlang.io/)

## Overview

The whole website is statically generated using Hugo. The source files are
included in the `src` directory, which contain the stylesheet files written
using SCSS and the scripts written using TypeScript.

There are three convenience shell scripts present at the root of the
repository, which help streamline the process of writing new blog posts,
as well as modifying the stylesheets and scripts.

## Instructions

### Prerequisites

1. NPM and Node - any recent version will do.
2. Hugo.
3. Sass and TypeScript installed using `npm`.

### Local Testing

1. Navigate to the root of the repository.
2. Run `./watch.sh` to start the watch process for Hugo, SCSS, and TypeScript.
3. Navigate to `localhost:1313` to access the website.
4. Once done, run `./kill.sh` to stop the watch processes.

### Adding New Posts

Please follow the guidelines provided
[here](https://github.com/vlang/vlang-blog/blob/main/docs/new-post-instructions.md).

### Deployment

1. From the root of the repository, run the `build.sh` script.
(Some environments prefer `sh build.sh` instead of `./build.sh`)
2. The output is stored in the `public` directory, which should be served
as the static website.
3. For CloudFlare pages, make sure to set the Hugo, Node, and NPM versions
as environment variables.
