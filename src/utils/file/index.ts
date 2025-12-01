export function base64ToFile(base64: string, filename: string): File {
  const [header, data] = base64.split(",");
  const mimeMatch = header.match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : "image/jpeg";

  const byteString = atob(data);
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([ab], { type: mime });
  return new File([blob], filename, { type: mime });
}

export function downloadBlobFromResponse(
  response: any,
  fallbackFilename: string,
  mimeType = "application/octet-stream"
) {
  const blob = new Blob([response.data], { type: mimeType });

  let disposition: string | null = "";

  if (response.headers?.get) {
    disposition = response.headers.get("content-disposition");
  } else if (typeof response.headers === "object") {
    disposition =
      response.headers["content-disposition"] ||
      response.headers["Content-Disposition"];
  }

  let filename = fallbackFilename;

  if (disposition) {
    // eslint-disable-next-line no-useless-escape
    const filenameStarMatch = disposition.match(/filename\*\=UTF-8''(.+)/i);
    if (filenameStarMatch && filenameStarMatch[1]) {
      try {
        filename = decodeURIComponent(filenameStarMatch[1]);
      } catch {
        filename = filenameStarMatch[1];
      }
    } else {
      const filenameMatch = disposition.match(
        /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
      );
      if (filenameMatch && filenameMatch[1]) {
        filename = filenameMatch[1].replace(/['"]/g, "");
      }
    }
  }

  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
