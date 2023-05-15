import { createImageBuilder, useSanityClient } from "astro-sanity";
import type { SanityImage } from "./api/food";

export const imageBuilder = createImageBuilder(useSanityClient());

export function urlForImage(
  source: SanityImage | null | undefined,
  height: number
): string {
  if (source) {
    return imageBuilder.image(source).height(height).url();
  }

  // FIXME: Return URL to a fallback image
  return "";
}
