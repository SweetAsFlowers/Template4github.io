{% assign filtered_post = site.posts | where: "title", "GitHub Pages Guide" | first %}
{{ filtered_post.content }}