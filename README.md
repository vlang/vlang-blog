# Blog | The V Programming Language

This repository contains the source code as well as the the content for V Lang's blog hosted at: LINK TO BLOG

## Overview

The whole website is statically generated using Hugo. The source files are included in the `src` directory, which contain the stylesheet files written using SCSS and the scripts written using TypeScript.

There are three convenience shell scripts present at the root of the repository, which help streamline the process of writing new blog posts, as well as modifying the stylesheets and scripts.

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

#### Blog Post

Use the command:

```
hugo new blog/post-title-goes-here.md
```

This will create an empty blogpost with the current date and the modified title. The template for this is [default.md](archetypes/default.md)

#### Contributor Profile

Use the command:

```
hugo new people/firstname-lastname.md
```

This will create an empty profile page for the contributor which can be filled in with necessary information. The template for this is [people.md](archetypes/people.md)

### Deployment

1. From the root of the repository, run the `build.sh` script. (Some environments prefer `sh build.sh` instead of `./build.sh`)
2. The output is stored in the `public` directory, which should be served as the static website.
3. For CloudFlare pages, make sure to set the Hugo, Node, and NPM versions as environment variables.