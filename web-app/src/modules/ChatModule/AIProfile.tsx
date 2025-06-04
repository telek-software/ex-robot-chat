import { useState } from 'react'

import { Button, Flex, Input } from '~components'

type AIProfileProps = {
  handlePost: (context: string) => void
}

/**
 * AIProfile
 *
 */
function AIProfile(props: AIProfileProps) {
  const { handlePost } = props
  const [value, setValue] = useState('')
  const handleChange = (v: unknown) => {
    setValue(v as string)
  }
  const send = () => handlePost(value)

  return (
    <Flex className="column">
      <Flex as="label">
        <Input onChange={handleChange} value={value} />
      </Flex>
      <Button onClick={send} icon="Send" />
    </Flex>
  )
}
export default AIProfile
