type Props = {
  noteId?: string
}

export default function () {
  const request = async ({ noteId }: Props) => {
    const result = await fetch(`/notes/${noteId}`)
    const json = await result.json()

    return json
  }
  return request
}
