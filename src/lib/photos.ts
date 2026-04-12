export interface Photo {
  id: string;
  width: number;
  height: number;
  caption?: string;
}

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

function isExternal(id: string) {
  return (
    id.startsWith("http://") ||
    id.startsWith("https://") ||
    id.startsWith("/")
  );
}

export function thumbUrl(id: string, width = 800) {
  if (isExternal(id) || !CLOUD) return id;
  return `https://res.cloudinary.com/${CLOUD}/image/upload/c_limit,w_${width},q_auto,f_auto/${id}`;
}

export function fullUrl(id: string) {
  if (isExternal(id) || !CLOUD) return id;
  return `https://res.cloudinary.com/${CLOUD}/image/upload/c_limit,w_2400,q_auto:good,f_auto/${id}`;
}

export function tinyUrl(id: string) {
  if (isExternal(id) || !CLOUD) return id;
  return `https://res.cloudinary.com/${CLOUD}/image/upload/w_24,q_10,e_blur:200,f_auto/${id}`;
}

export function srcSet(id: string) {
  return [400, 600, 800, 1200, 1600]
    .map((w) => `${thumbUrl(id, w)} ${w}w`)
    .join(", ");
}

export interface PhotoGroup {
  id: string;
  title: string;
  photos: Photo[];
}

export interface GalleryData {
  groups: PhotoGroup[];
}

export interface FlatPhoto extends Photo {
  groupIndex: number;
  groupId: string;
  indexInGroup: number;
}

export function flattenGroups(groups: PhotoGroup[]): FlatPhoto[] {
  const out: FlatPhoto[] = [];
  groups.forEach((g, gi) => {
    g.photos.forEach((p, pi) => {
      out.push({ ...p, groupIndex: gi, groupId: g.id, indexInGroup: pi });
    });
  });
  return out;
}

const CACHE_KEY = "photo_groups_v1";

export async function getPhotoGroups(): Promise<PhotoGroup[]> {
  try {
    const res = await fetch("/api/photos", { cache: "no-store" });
    if (!res.ok) return [];
    const data = (await res.json()) as { groups?: PhotoGroup[] };
    return data.groups ?? [];
  } catch (err) {
    console.error("Error fetching photo groups:", err);
    return [];
  }
}

export function readCachedPhotoGroups(): PhotoGroup[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as PhotoGroup[];
  } catch {
    return [];
  }
}

export function writeCachedPhotoGroups(groups: PhotoGroup[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(groups));
  } catch {
    // ignore quota/serialization errors
  }
}
