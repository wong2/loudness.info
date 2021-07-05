import React, { useCallback, useRef } from 'react'

interface Props {
  accept?: string
  onSelect?: (file: File) => void
}

const FileInput: React.FC<Props> = (props) => {
  const { accept, onSelect, children } = props

  const input = useRef<HTMLInputElement>(null)

  const onClick = useCallback(() => {
    input.current?.click()
  }, [])

  const onInputChange = useCallback(
    (event) => {
      const file = event.target.files[0]
      onSelect?.(file)
    },
    [onSelect],
  )

  return (
    <div onClick={onClick}>
      {children}
      <input type="file" accept={accept} className="hidden" ref={input} onChange={onInputChange} />
    </div>
  )
}

export default FileInput
