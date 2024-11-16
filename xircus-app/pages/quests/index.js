import { AppLayout } from "@/layouts/AppLayout"
import { Box, Heading, List } from "@chakra-ui/react"
import { useQuests } from "@xw3/maki-quest"
import Link from "next/link"

export default function Quests() {
  const { data: quests = [] } = useQuests()

  return (
    <AppLayout>
      <Heading mb={4}>Campaigns</Heading>
      <List spacing={3}>
      {
        quests.map(q => (
          <Box key={q._id} borderWidth={1} borderRadius="md">
            <Link  href={`/quests/${q._id}`}><Box p={4} >{q?.name}</Box></Link>
          </Box>
        ))
      }
      </List>
    </AppLayout>
  )
}