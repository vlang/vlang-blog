# Design Guide

This document contains the design language specifications for the V Blog.

**Note**: Before making any changes, please consult with
[danieldaeschle](https://github.com/danieldaeschle),
[hungrybluedev](https://github.com/hungrybluedev),
[Terisback](https://github.com/Terisback),
or any of the [V Developers](https://github.com/orgs/vlang/people)
assigned to web projects. The changes must be reflected in the relevant
[stylesheets](/src/scss). Easiest way to get in contact is to join the
[Discord Server](https://discord.gg/vlang).

## Fonts

1. Headings and displays: [Jost](https://fonts.google.com/specimen/Jost)
2. General body text: [PT Serif](https://fonts.google.com/specimen/PT+Serif)
3. Source code listing: [PT Mono](https://fonts.google.com/specimen/PT+Mono)

## Colour Palette

Most of the colours are derived from the
[vdoc styles](https://github.com/vlang/v/blob/master/cmd/tools/vdoc/resources/doc.css).
Relevant SCSS variables are defined in
[lines 13-29](https://github.com/vlang/vlang-blog/blob/3875369629ea4ab1e1fe80689d462531195a9037/src/scss/default.scss#L13-L29).
They are reiterated here for convenience:

| Name                            | Value     |
| ------------------------------- | --------- |
| Background Color                | `#f8f8f8` |
| Secondary Background Color      | `#eee`    |
| Dark Background Color           | `#1a202c` |
| Secondary Dark Background Color | `#1b1e24` |
| Text Color                      | `#222`    |
| Secondary Text Color            | `#353535` |
| Menu Background Color           | `#4b6c88` |
| Menu Text Color                 | `#fff`    |
| News Category                   | `#d7e9f8` |
| Tutorials Category              | `#f3d8b4` |
| Showcase Category               | `#f3b4c7` |
| Copyright Text                  | `#eee`    |
