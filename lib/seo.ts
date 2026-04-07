import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site";

type MetadataInput = {
  title?: string;
  description: string;
  path: string;
  keywords?: string[];
  openGraphType?: "website" | "article";
};

type BreadcrumbItem = {
  name: string;
  path: string;
};

type CollectionItem = {
  name: string;
  path: string;
  description?: string;
};

type ProductInput = {
  name: string;
  description: string;
  path: string;
  image: string;
  sku?: string;
  category?: string;
  additionalProperties?: Array<{ name: string; value: string }>;
};

function fullTitle(title?: string) {
  return title ? `${title} | ${siteConfig.name}` : siteConfig.title;
}

function organizationEntity() {
  return {
    "@type": "Organization",
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/logo.png"),
    email: siteConfig.email.sales,
    telephone: siteConfig.phone.mobileDisplay,
    address: {
      "@type": "PostalAddress",
      ...siteConfig.address,
    },
  };
}

export function createMetadata({
  title,
  description,
  path,
  keywords = [],
  openGraphType = "website",
}: MetadataInput): Metadata {
  return {
    title,
    description,
    keywords: Array.from(new Set([...siteConfig.keywords, ...keywords])),
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: openGraphType,
      locale: siteConfig.locale,
      url: absoluteUrl(path),
      siteName: siteConfig.name,
      title: fullTitle(title),
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle(title),
      description,
    },
  };
}

export function createOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    ...organizationEntity(),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: siteConfig.email.sales,
        telephone: siteConfig.phone.mobileDisplay,
        areaServed: "Worldwide",
        availableLanguage: ["en"],
      },
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: siteConfig.email.support,
        telephone: siteConfig.phone.landlineDisplay,
        areaServed: "Worldwide",
        availableLanguage: ["en"],
      },
    ],
  };
}

export function createWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    alternateName: siteConfig.legalName,
    url: absoluteUrl("/"),
    description: siteConfig.description,
    publisher: organizationEntity(),
    inLanguage: "en",
  };
}

export function createBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function createCollectionPageJsonLd({
  name,
  description,
  path,
  items,
}: {
  name: string;
  description: string;
  path: string;
  items: CollectionItem[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: absoluteUrl("/"),
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: absoluteUrl(item.path),
        description: item.description,
      })),
    },
  };
}

export function createAboutPageJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name,
    description,
    url: absoluteUrl(path),
    about: organizationEntity(),
  };
}

export function createContactPageJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name,
    description,
    url: absoluteUrl(path),
    mainEntity: createOrganizationJsonLd(),
  };
}

export function createProductJsonLd({
  name,
  description,
  path,
  image,
  sku,
  category,
  additionalProperties = [],
}: ProductInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    sku,
    category,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    manufacturer: organizationEntity(),
    url: absoluteUrl(path),
    image: [absoluteUrl(image)],
    additionalProperty: additionalProperties.map((property) => ({
      "@type": "PropertyValue",
      name: property.name,
      value: property.value,
    })),
  };
}
