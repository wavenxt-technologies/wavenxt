import { client } from "@/lib/sanity";
import BlogsView, { type Blog } from "./blogs-view";

// Server-rendered so blog cards & internal links are in the initial HTML —
// crawlable by search engines and discoverable without running JS.
export const revalidate = 600;

const BLOGS_QUERY = `*[_type == "blog"] | order(publishedAt desc) {
  _id, title, slug, mainImage, excerpt, category, tags, author, publishedAt
}`;

export default async function BlogsPage() {
  let blogs: Blog[] = [];
  try {
    blogs = await client.fetch<Blog[]>(BLOGS_QUERY);
  } catch {
    blogs = [];
  }

  return <BlogsView blogs={blogs} />;
}
