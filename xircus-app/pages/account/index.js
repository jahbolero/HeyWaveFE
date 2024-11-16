import { AppLayout } from "@/layouts/AppLayout"
import { Heading } from "@chakra-ui/react"
import { UserAdminButton } from "@xw3/maki-quest"

export default function Account() {
  return (
    <AppLayout>
      <Heading>Account</Heading>
      <UserAdminButton>Admin</UserAdminButton>
    </AppLayout>
  )
}