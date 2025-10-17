import { useState } from "react";

export default function PostImage({
  src,
  alt,
  width = 1200,
  height = 800,
  loading = "lazy",
}) {
  const [error, setError] = useState(false);
  const fallBackSrc = "/img/fallBack.jpg";

  const resolvedSrc = Array.isArray(src) ? src[0] : src;
  const imgSrc = !error && resolvedSrc ? resolvedSrc : fallBackSrc;

  return (
    <img
      alt={alt || "image"}
      width={width}
      height={height}
      src={imgSrc}
      loading={loading || "lazy"}
      onError={() => setError(true)}
    />
  );
}
