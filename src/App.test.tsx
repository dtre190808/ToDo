import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

describe('App', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('добавляет задачу', () => {
    render(<App />)
    const input = screen.getByPlaceholderText(/Add Task/i)
    const button = screen.getByText(/Add/i)
    fireEvent.change(input, { target: { value: 'Test task' } })
    fireEvent.click(button)
    expect(screen.getByText(/Test task/i)).toBeInTheDocument()
  })

  test('переключает статус задачи', () => {
    render(<App />)
    const input = screen.getByPlaceholderText(/Add Task/i)
    const button = screen.getByText(/Add/i)
    fireEvent.change(input, { target: { value: 'Task' } })
    fireEvent.click(button)
    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)
    expect(checkbox).toBeChecked()
  })

  test('фильтрует по активным', () => {
    render(<App />)
    const input = screen.getByPlaceholderText(/Add Task/i)
    const button = screen.getByText(/Add/i)
    fireEvent.change(input, { target: { value: 'Task 1' } })
    fireEvent.click(button)
    fireEvent.change(input, { target: { value: 'Task 2' } })
    fireEvent.click(button)
    const checkboxes = screen.getAllByRole('checkbox')
    fireEvent.click(checkboxes[0])
    fireEvent.click(screen.getByText(/Active/i))
    expect(screen.getByText(/Task 2/i)).toBeInTheDocument()
    expect(screen.queryByText(/Task 1/i)).not.toBeInTheDocument()
  })

  test('сохраняет в localStorage', () => {
    render(<App />)
    const input = screen.getByPlaceholderText(/Add Task/i)
    const button = screen.getByText(/Add/i)
    fireEvent.change(input, { target: { value: 'Saved task' } })
    fireEvent.click(button)
    const saved = JSON.parse(localStorage.getItem('tasks')!)
    expect(saved[0].task).toBe('Saved task')
  })

  test('загружает из localStorage', () => {
    localStorage.setItem('tasks', JSON.stringify([{ task: 'Saved', completed: false }]))
    render(<App />)
    expect(screen.getByText(/Saved/i)).toBeInTheDocument()
  })
})