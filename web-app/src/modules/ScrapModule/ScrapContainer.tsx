import { useState } from 'react'
import axios from 'axios'
import * as Cheerio from 'cheerio'

import { Button, Flex } from '~components'
import { logger } from '~utils/config.utils'

const URLS = [
  'https://studio.camsyoga.fr/programs/detendre-le-haut-du-dos-epaules',
  'https://studio.camsyoga.fr/programs/12-salutations-au-soleil',
  'https://studio.camsyoga.fr/programs/ameliorer-son-sommeil',
  'https://studio.camsyoga.fr/programs/ancrage-et-equilibre',
  'https://studio.camsyoga.fr/programs/comment-avoir-son-grand-ecart',
  'https://studio.camsyoga.fr/programs/construire-sa-force-et-son-courage',
  'https://studio.camsyoga.fr/programs/booster-son-energie',
  'https://studio.camsyoga.fr/programs/gagner-en-ouverture-de-hanches',
  'https://studio.camsyoga.fr/programs/detendre-le-psoas-et-liberer-les-emotions-partie-2',
  'https://studio.camsyoga.fr/programs/regles-douloureuses',
  'https://studio.camsyoga.fr/programs/sassouplir-les-jambes',
  'https://studio.camsyoga.fr/programs/revenir-a-lessentiel',
]
type Scrapped = {
  title: string
  description: string
  tags: string[]
}

function ScrapContainer() {
  const [list, setList] = useState<Scrapped>([])

  const scrapeDataAreaValues = (html: string): string[] => {
    const $ = Cheerio.load(html)
    const values: string[] = []
    logger.info($)
    $('[data-area=program-title]').each((_, element) => {
      logger.info(element)
      const value = $(element).attr('data-area')
      if (value) values.push(value)
    })
    return values
  }

  const takeData = async (url: string) => {
    try {
      const response = await axios.get(url)
      if (!response.data) return
      const values = scrapeDataAreaValues(response.data as string)
      logger.info(values)
    } catch (error) {
      console.error(`Error scraping the website: ${JSON.stringify(error)}`)
    }
  }

  const launch = () =>
    URLS.forEach((url) => {
      void takeData(url)
    })

  return (
    <Flex>
      <Button label="Launch scrap" onClick={launch} />
    </Flex>
  )
}
export default ScrapContainer
