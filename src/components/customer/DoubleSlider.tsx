import * as Slider from '@radix-ui/react-slider'

interface DoubleSliderProps {
  min: number
  max: number
  value: [number, number]
  onChange: (value: [number, number]) => void
}

export default function DoubleSlider({
  min,
  max,
  value,
  onChange,
}: DoubleSliderProps) {
  return (
    <div className="w-full max-w-sm">
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        value={value}
        min={min}
        max={max}
        step={1}
        onValueChange={onChange}
      >
        <Slider.Track className="bg-gray-200 relative grow rounded-full h-1">
          <Slider.Range className="absolute bg-primary rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb
          className="block w-5 h-5 bg-white border border-gray-400 rounded-full shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Minimum value"
        />
        <Slider.Thumb
          className="block w-5 h-5 bg-white border border-gray-400 rounded-full shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Maximum value"
        />
      </Slider.Root>
      <div className="mt-2 text-sm text-gray-700">
        Range: {value[0]} - {value[1]}
      </div>
    </div>
  )
}
