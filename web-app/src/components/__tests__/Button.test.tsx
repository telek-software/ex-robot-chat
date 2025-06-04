import Button from '~components/Button'
import { fireEvent, render, screen } from '~utils/test.utils'

test('render Button', () => {
  const onClick = jest.fn()
  render(<Button onClick={onClick} label="Test Button" />)
  const button = screen.getByText('Test Button')
  expect(button).toBeInTheDocument()
  expect(onClick).not.toHaveBeenCalled()
  fireEvent.click(button)
  expect(onClick).toHaveBeenCalled()
})
