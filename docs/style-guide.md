# Design Guide

This document contains the design language specifications for the V Blog.

**Note**: Before making any changes, please consult with @danieldaeschle, @hungrybluedev,
@Terisback, or any of the [V Developers](https://github.com/orgs/vlang/people)
assigned to web projects. The changes must be reflected in the relevant
[stylesheets](/src/scss). Easiest way to get in contact is to join the
[Discord Server](https://discord.gg/vlang)

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

| Name                            | Value     | Sample                                                                                            |
| ------------------------------- | --------- | :------------------------------------------------------------------------------------------------ |
| Background Color                | `#f8f8f8` | <div style="border: 1px solid black; height: 20px; width: 50px; background-color: #f8f8f8"></div> |
| Secondary Background Color      | `#eee`    | <div style="border: 1px solid black; height: 20px; width: 50px; background-color: #eee"></div>    |
| Dark Background Color           | `#1a202c` | <div style="border: 1px solid black; height: 20px; width: 50px; background-color: #1a202c"></div> |
| Secondary Dark Background Color | `#1b1e24` | <div style="border: 1px solid black; height: 20px; width: 50px; background-color: #1b1e24"></div> |
| Text Color                      | `#222`    | <div style="border: 1px solid black; height: 20px; width: 50px; background-color: #222"></div>    |
| Secondary Text Color            | `#353535` | <div style="border: 1px solid black; height: 20px; width: 50px; background-color: #353535"></div> |
| Menu Background Color           | `#4b6c88` | <div style="border: 1px solid black; height: 20px; width: 50px; background-color: #4b6c88"></div> |
| Menu Text Color                 | `#fff`    | <div style="border: 1px solid black; height: 20px; width: 50px; background-color: #fff"></div>    |
| News Category                   | `#d7e9f8` | <div style="border: 1px solid black; height: 20px; width: 50px; background-color: #d7e9f8"></div> |
| Tutorials Category              | `#f3d8b4` | <div style="border: 1px solid black; height: 20px; width: 50px; background-color: #f3d8b4"></div> |
| Showcase Category               | `#f3b4c7` | <div style="border: 1px solid black; height: 20px; width: 50px; background-color: #f3b4c7"></div> |
| Copyright Text                  | `#eee`    | <div style="border: 1px solid black; height: 20px; width: 50px; background-color: #eee"></div>    |
