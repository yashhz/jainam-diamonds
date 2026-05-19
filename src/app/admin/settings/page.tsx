import SettingsForm from "./SettingsForm";
import { getConfig } from "../../actions";

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const config = await getConfig();
  return <SettingsForm initialConfig={config} />;
}
