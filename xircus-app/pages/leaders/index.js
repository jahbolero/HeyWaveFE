import { AppLayout } from "@/layouts/AppLayout"
import { Box } from "@chakra-ui/react"
import { Leaderboard } from "@xw3/maki-quest"

export default function Leaders() {
  return (
    <AppLayout>
      <Box>Leaders</Box>
      <Leaderboard />
    </AppLayout>
  )
}