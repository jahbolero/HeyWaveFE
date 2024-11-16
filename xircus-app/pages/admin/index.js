import { MyAdminPanel } from "@/admin/MyAdminPanel";
import { QuestAdmin } from "@xw3/maki-quest";

export default function Admin() {
  const tabs = [
    { key: 'admin', label: 'My Admin' }
  ]

  const sections = {
    admin: MyAdminPanel
  }

  return <QuestAdmin 
    tabs={tabs} 
    sections={sections}
  />
}