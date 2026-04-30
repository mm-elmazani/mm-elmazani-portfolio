import type { Metadata } from "next";
import { getActivity } from "@/data/activities";
import ActivityPageContent from "@/components/ActivityPageContent";

const SLUG = "montage-pc-gaming-2024";
const activity = getActivity(SLUG);

export const metadata: Metadata = activity
  ? {
      title: `${activity.title} — Portfolio`,
      description: activity.description,
    }
  : { title: "Activité introuvable" };

export default function Page() {
  return <ActivityPageContent slug={SLUG} />;
}
