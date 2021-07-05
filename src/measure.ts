// @ts-ignore
import { LoudnessMeter } from '@domchristie/needles'

async function measure(file: File): Promise<number> {
  const url = URL.createObjectURL(file)
  const arrayBuffer = await fetch(url).then((res) => res.arrayBuffer())

  const audioContext = new AudioContext()
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)

  const offlineAudioContext = new OfflineAudioContext(
    audioBuffer.numberOfChannels,
    audioBuffer.length,
    audioBuffer.sampleRate,
  )
  const source = offlineAudioContext.createBufferSource()
  source.buffer = audioBuffer

  const loudnessMeter = new LoudnessMeter({
    source,
    modes: ['integrated'],
    workerUri: '/needles-worker.js',
  })

  const result = new Promise<number>((resolve, reject) => {
    loudnessMeter.on('dataavailable', (event: any) => {
      resolve(event.data.value)
    })
    loudnessMeter.on('error', reject)
  })

  loudnessMeter.start()

  return result
}

export { measure }
