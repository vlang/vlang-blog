# Contribution Guidelines

## Repository Structure

```text
.
├── archetypes
├── content
├── docs
├── layouts
├── src
└── static

```

| Folder     | Description                                                                                  |
| ---------- | -------------------------------------------------------------------------------------------- |
| archetypes | Contains the default templates for new blogposts and contributor profiles.                   |
| content    | The actual markdown content for blogposts and contributor profiles goes here.                |
| docs       | Additional documentation, like the style guide, new post instructions, etc.                  |
| layouts    | Contains the HTML templates that are used by Hugo for rendering all the pages.               |
| src        | The SCSS and TypeScript sources go here.                                                     |
| static     | Icons, images, other files that are copied over verbatim are placed here. Hierarchy matters. |

## Creating A New Post

Follow the instructions [here](docs/new-post-instructions).

## Updating The Hugo Templates

There are several reasons why we would want to update the Hugo templates:

- Adding links to new third party libraries. This should be done only
  after approval from core contributors.
- Improving the skeletal structure of blog posts or contributor profiles.
  This might include changing the rendering logic for related pages, adding
  new sections, etc.

The relevant folder to search is the `layouts` folder.

If the change is substantial, please make fork the repository, make your
changes there, and then open a pull request.

## Updating The Default Markdown Templates

Work on the relevant file in the `archetypes` folder.

## Updating The TypeScript and SCSS Source

- Check the `ts` and `scss` subdirectories in the `src` directory.
- Please follow the established style. If you propose a change to the
  style for the better, please let us know in the Discord Server.
- Do not get carried away. It is nice to have fancy features, but
  the primary objective of the website is to be a source of reliable
  information for the V community. This primary function should not be
  hindered in any manner.
