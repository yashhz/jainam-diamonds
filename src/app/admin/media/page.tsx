import MediaForm from "./MediaForm";
import { getConfig } from "../../actions";

export const dynamic = 'force-dynamic';

export default async function MediaPage() {
  const config = await getConfig();
  return <MediaForm initialConfig={config} />;
}
