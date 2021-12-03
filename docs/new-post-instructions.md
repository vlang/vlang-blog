# Instructions For New Blog Post

## Fork The Repository

Each blog post needs to be written on a separate fork. Most of the contents
should be markdown and optimised images. Once the Pull Request is approved
by 2 or more V devs (not counting the author), the new post will be added.

This rule applies to V developers as well. Not just external contributors.

## Line Length

Although Markdown allows users to fit entire paragraphs into one line, we
recommend following a soft limit of 80 characters per line. This is to
make the experience of reviewers, maintainers, and future contributors
more pleasant. Comparing diffs is also easier when you do not have to
scroll back and forth.

## Initialising A New Blog Post

Use the command:

```
hugo new blog/post-title-goes-here.md
```

This will create an empty blogpost with the current date and
the modified title. The template for this is
[default.md](https://github.com/vlang/vlang-blog/blob/main/archetypes/default.md)

## Initialising A New Contributor Profile

Use the command:

```
hugo new people/firstname-lastname.md
```

This will create an empty profile page for the contributor which can be filled
in with necessary information. The template for this is
[people.md](https://github.com/vlang/vlang-blog/blob/main/archetypes/people.md)

## Adding Images

1. Download the images in a directory outside the report and optimize them.
   One easy to use tool is [squoosh.app](https://squoosh.app/).
2. The recommended extension is WebP and the size should ideally be under 500 K.
   Best if under 100 K. If you need to preserve detail, don't resize too much.
   Keep it at 4K, 1440p, or 1080p.
3. The recommended place to store the optimized image is in the images folder
   static directory, under the directory with the same name as the post.
4. Check the existing structure to see how the images are stored.
5. It is recommended to use the `{{< rawhtml >}}...{{< /rawhtml >}}` shortcode
   to directly embed a `<figure>` tag with `<img src="..." alt="..." />` and
   `<figcaption>`.
   See [here](https://github.com/vlang/vlang-blog/blob/3875369629ea4ab1e1fe80689d462531195a9037/content/blog/vex-showcase.md?plain=1#L102-L111)
   for an example.
6. Making proper use of `alt` and `<figcaption>` is **mandatory**.

For hero images, follow the guidelines outlined [here](hero-image.md).
