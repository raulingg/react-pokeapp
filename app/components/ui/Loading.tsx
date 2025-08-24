import pokeball from '~/assets/pokeball.svg'

type LoadingProps = {
  message?: string
}

export default function Loading({ message = 'Loading...' } : LoadingProps) {
  return (
    <p className="inline-flex">
      {message}
      <img src={pokeball} alt="Pokeapp icon" className="w-8 animate-bounce" />
    </p>
  )
}
