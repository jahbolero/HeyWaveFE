import { Box } from "@chakra-ui/react"
import { useChatData, useTelegramChatData, useTelegramLogin } from "@xw3/maki"
import { GramLayout, FixedFooter, FixedHeader, NavBar } from "@xw3/maki-chakra"
import { useReferralInvite } from '@xw3/maki-quest'
import { motion } from "framer-motion"
import { AppHeader } from "./AppHeader"

export const AppLayout = ({ children, footer }) => {
  useTelegramLogin()
  const { chatData } = useTelegramChatData(useChatData())
  useReferralInvite(chatData)

  const navs = [
    {
      key: 'home',
      url: '/',
      label: 'Home',
      icon: 'TbBuildingCircus'
    },
    {
      key: 'quests',
      url: '/quests',
      label: 'Campaigns',
      icon: 'TbSparkles'
    },
    {
      key: 'shop',
      url: '/shop',
      label: 'Shop',
      icon: 'TbShoppingBag'
    },       
    {
      key: 'frens',
      url: '/frens',
      label: 'Frens',
      icon: 'TbUsers'
    },
  ]  

  return (
    <GramLayout>
      <FixedHeader backdropFilter="blur(30px)">
        <AppHeader />
      </FixedHeader>
      <Box bg="white" as={motion.div} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} px={6} _dark={{ bg: 'black' }}> 
        { children }
      </Box>
      <FixedFooter>
        { footer && footer }
        <NavBar 
          navs={navs}
          />
      </FixedFooter>
    </GramLayout>
  )
}
