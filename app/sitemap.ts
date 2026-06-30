import type { MetadataRoute } from "next";
import { butlerModels } from "@/app/products/butler-matrix/data";
import {
  type DigitalAttenuatorModel,
  digitalAttenuatorModelIds,
  parseDigitalAttenuatorModel,
} from "@/app/products/digital-attenuators/data";
import { matrixModels } from "@/app/products/matrix-systems/data";
import { meshModels } from "@/app/products/mesh-attenuators/data";
import { client, urlFor } from "@/lib/sanity";
import { absoluteUrl, productFamilies } from "@/lib/site";

// Refresh the sitemap periodically so newly published blogs/webinars appear.
export const revalidate = 3600;

type SanityBlog = {
  slug?: { current?: string };
  _updatedAt?: string;
  publishedAt?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mainImage?: any;
};

type SanityWebinar = {
  _id: string;
  _updatedAt?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  thumbnail?: any;
};

const BLOG_SITEMAP_QUERY = `*[_type == "blog" && defined(slug.current)]{
  slug, _updatedAt, publishedAt, mainImage
}`;

const WEBINAR_SITEMAP_QUERY = `*[_type == "webinar" && category == "on-demand"]{
  _id, _updatedAt, thumbnail
}`;

async function getBlogRoutes(): Promise<MetadataRoute.Sitemap> {
  try {
    const blogs = await client.fetch<SanityBlog[]>(BLOG_SITEMAP_QUERY);
    return blogs
      .filter((blog) => blog.slug?.current)
      .map((blog) => ({
        url: absoluteUrl(`/resources/blogs/${blog.slug!.current}`),
        lastModified: new Date(blog._updatedAt ?? blog.publishedAt ?? Date.now()),
        changeFrequency: "monthly" as const,
        priority: 0.7,
        ...(blog.mainImage
          ? { images: [urlFor(blog.mainImage).width(1200).height(630).url()] }
          : {}),
      }));
  } catch {
    return [];
  }
}

async function getWebinarRoutes(): Promise<MetadataRoute.Sitemap> {
  try {
    const webinars = await client.fetch<SanityWebinar[]>(WEBINAR_SITEMAP_QUERY);
    return webinars.map((webinar) => ({
      url: absoluteUrl(`/resources/webinars/${webinar._id}`),
      lastModified: new Date(webinar._updatedAt ?? Date.now()),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      ...(webinar.thumbnail
        ? { images: [urlFor(webinar.thumbnail).width(1200).height(675).url()] }
        : {}),
    }));
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      images: [absoluteUrl("/images/group-atten.webp")],
    },
    {
      url: absoluteUrl("/about-us"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/products"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      images: productFamilies.map((family) => absoluteUrl(family.image)),
    },
    ...productFamilies.map((family) => ({
      url: absoluteUrl(family.path),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.85,
      images: [absoluteUrl(family.image)],
    })),
    {
      url: absoluteUrl("/resources/blogs"),
      lastModified,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/resources/webinars"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const digitalRoutes = digitalAttenuatorModelIds
    .map((id) => parseDigitalAttenuatorModel(id))
    .filter((model): model is DigitalAttenuatorModel => model !== null)
    .map((model) => ({
      url: absoluteUrl(`/products/digital-attenuators/${model.id}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: [absoluteUrl(model.image)],
    }));

  const meshRoutes = meshModels.map((model) => ({
    url: absoluteUrl(`/products/mesh-attenuators/${model.id}`),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
    images: [absoluteUrl(model.image)],
  }));

  const butlerRoutes = butlerModels.map((model) => ({
    url: absoluteUrl(`/products/butler-matrix/${model.id}`),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
    images: [absoluteUrl(model.image)],
  }));

  const matrixRoutes = matrixModels.map((model) => ({
    url: absoluteUrl("/products/matrix-systems"),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
    images: [absoluteUrl(model.image)],
  }));

  const splitterRoute = {
    url: absoluteUrl("/products/splitters"),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.75,
    images: [absoluteUrl("/images/splitter.webp")],
  };

  const [blogRoutes, webinarRoutes] = await Promise.all([
    getBlogRoutes(),
    getWebinarRoutes(),
  ]);

  return [
    ...staticRoutes,
    ...digitalRoutes,
    ...meshRoutes,
    ...butlerRoutes,
    ...matrixRoutes,
    splitterRoute,
    ...blogRoutes,
    ...webinarRoutes,
  ];
}
