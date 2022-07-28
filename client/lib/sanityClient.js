import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "3hlr1k54",
  dataset: "production",
  apiVersion: "v1",
  token:
    "skwKZ0XAa7mVMTFAKG8gNNlAQg9ddKyBT1UOAms0QhhdFdTDWihHnHumQW2B8izCkedPevnua07gu9OgJQ74aOoCiDiRw2DWXeZcMMhBGzHai4wp8CCTZh1bSE720smApNDHyzZYCR9p1WofmQHo1SusMh2TihmYr2s5az8l8hHMoBGyTQqE",
  useCdn: false,
});
