import type { MetadataRoute } from "next";
import { butlerModels } from "@/app/products/butler-matrix/data";
import {
  type DigitalAttenuatorModel,
  digitalAttenuatorModelIds,
  parseDigitalAttenuatorModel,
} from "@/app/products/digital-attenuators/data";
import { matrixModels } from "@/app/products/matrix-systems/data";
import { meshModels } from "@/app/products/mesh-attenuators/data";
import { absoluteUrl, productFamilies } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
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

  return [
    ...staticRoutes,
    ...digitalRoutes,
    ...meshRoutes,
    ...butlerRoutes,
    ...matrixRoutes,
    splitterRoute,
  ];
}
