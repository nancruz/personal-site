import matter from 'gray-matter'

export async function getAllPosts() {
  const context = require.context('../posts', false, /\.md$/);
  const posts = [];

  for(const key of context.keys()){
    const post = key.slice(2);
    const content = await import(`../posts/${post}`);
    const meta = matter(content.default);

    posts.push({
      slug: post.replace('.md',''),
      title: meta.data.title,
      tags: meta.data.tags ?? [],
      date: new Date(meta.data.date).valueOf()
    });
  }

  return posts.sort((a, b) => b.date - a.date);
}

export async function getPostBySlug(slug) {
  const fileContent = await import(`../posts/${slug}.md`);
  const meta = matter(fileContent.default);

  return {
    title: meta.data.title,
    content: meta.content,
    tags: meta.data.tags ?? [],
    date: new Date(meta.data.date).valueOf(),
    description: meta.data.description
  };
}

export async function getAllPostsByTag(tag) {
  const posts = await getAllPosts();
  
  return posts.filter((post) => post.tags.includes(tag));
}

export async function getAllTags() {
  const posts = await getAllPosts();
  const tags = [];

  for(const post of posts) {
    tags.push(...post.tags);
  }

  return [...new Set(tags)];
}