import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

export const revalidate = 60;

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const ROOT = "casorio";

const GROUP_LABELS: Record<string, { title: string; order: number }> = {
  noivos: { title: "Os Noivos", order: 10 },
  igrejamisc: { title: "A Igreja", order: 20 },
  familianoiva: { title: "Família da Noiva", order: 30 },
  familianoivo: { title: "Família do Noivo", order: 40 },
};

interface CloudinaryFolder {
  name: string;
  path: string;
}

interface CloudinaryResource {
  public_id: string;
  display_name?: string;
  width: number;
  height: number;
}

type ResourcesByAssetFolderFn = (
  assetFolder: string,
  options: { max_results?: number }
) => Promise<{ resources: CloudinaryResource[] }>;

export async function GET() {
  try {
    const { folders } = (await cloudinary.api.sub_folders(ROOT)) as {
      folders: CloudinaryFolder[];
    };

    const resourcesByAssetFolder = (
      cloudinary.api as unknown as {
        resources_by_asset_folder: ResourcesByAssetFolderFn;
      }
    ).resources_by_asset_folder;

    const results = await Promise.all(
      folders.map(async (f) => {
        const res = await resourcesByAssetFolder(`${ROOT}/${f.name}`, {
          max_results: 500,
        });

        const photos = [...res.resources]
          .sort((a, b) =>
            (a.display_name ?? a.public_id).localeCompare(
              b.display_name ?? b.public_id
            )
          )
          .map((r) => ({
            id: r.public_id,
            width: r.width,
            height: r.height,
          }));

        const meta = GROUP_LABELS[f.name];
        return {
          id: f.name,
          title: meta?.title ?? f.name,
          order: meta?.order ?? 1000,
          unknown: !meta,
          photos,
        };
      })
    );

    const groups = results
      .sort((a, b) => {
        if (a.order !== b.order) return a.order - b.order;
        return a.id.localeCompare(b.id);
      })
      .map(({ order, unknown, ...g }) => g);

    return NextResponse.json({ groups });
  } catch (err) {
    console.error("Error listing Cloudinary photos:", err);
    return NextResponse.json({ groups: [] }, { status: 502 });
  }
}
