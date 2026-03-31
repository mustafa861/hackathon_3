import { auth } from "./auth";

export async function GET(request: Request) {
  return auth.api.getSession({
    request,
  });
}
