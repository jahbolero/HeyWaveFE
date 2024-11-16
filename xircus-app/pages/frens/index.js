import { AppLayout } from "@/layouts/AppLayout"
import { Box, Heading } from "@chakra-ui/react"
import { QuestFriends } from "@xw3/maki-quest"

export default function Frens() {
  return (
    <AppLayout>
      <Heading>Frens</Heading>
      <QuestFriends />
    </AppLayout>
  )
}