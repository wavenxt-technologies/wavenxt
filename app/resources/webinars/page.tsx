import { client } from "@/lib/sanity";
import WebinarsView, { type Webinar } from "./webinars-view";

// Server-rendered so webinar cards & internal links are in the initial HTML —
// crawlable by search engines without running JS. Time-based filtering of live
// sessions re-evaluates on each revalidation.
export const revalidate = 300;

const WEBINARS_QUERY = `*[_type == "webinar" && (
  (defined(startDateTime) && dateTime(now()) < dateTime(startDateTime)) ||
  !defined(startDateTime)
)] | order(createdAt desc) {
  _id,
  "category": select(defined(startDateTime) => "live", "on-demand"),
  title, thumbnail, description, speaker,
  meetingLink, startDateTime, createdAt,
  "videoUrl": video.asset->url
}`;

export default async function WebinarsPage() {
  let webinars: Webinar[] = [];
  try {
    webinars = await client.fetch<Webinar[]>(WEBINARS_QUERY);
  } catch {
    webinars = [];
  }

  return <WebinarsView webinars={webinars} />;
}
