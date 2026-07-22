type WaveDividerProps = {
  /** Color the torn edge reveals below (the next section's background). */
  fill?: string;
  /** Flip vertically — use when the torn edge should read as the top of a section. */
  flip?: boolean;
  className?: string;
};

const TOOTH_WIDTH = 7;
const TOOTH_DEPTH = 6;
const BASE_Y = 20;
const VIEWBOX_WIDTH = 1200;

function buildTeethPath(): string {
  const points: string[] = [`M0,${BASE_Y}`];
  let x = 0;
  let up = true;
  while (x < VIEWBOX_WIDTH) {
    x += TOOTH_WIDTH;
    const y = up ? BASE_Y - TOOTH_DEPTH : BASE_Y + TOOTH_DEPTH;
    points.push(`L${Math.min(x, VIEWBOX_WIDTH)},${y}`);
    up = !up;
  }
  points.push(`L${VIEWBOX_WIDTH},80 L0,80 Z`);
  return points.join(' ');
}

const TEETH_PATH = buildTeethPath();

/**
 * Regular triangular-tooth torn-paper edge, with a light drop shadow to
 * suggest the paper lifting slightly off the section below.
 */
export default function WaveDivider({
  fill = 'var(--background)',
  flip = false,
  className = '',
}: WaveDividerProps) {
  return (
    <div
      className={`pointer-events-none relative h-10 w-full overflow-hidden sm:h-14 lg:h-16 ${className}`}
      aria-hidden='true'
    >
      <svg
        viewBox='0 0 1200 80'
        preserveAspectRatio='none'
        className='absolute inset-0 h-full w-full'
        style={flip ? { transform: 'scaleY(-1)' } : undefined}
      >
        <defs>
          <filter id='torn-shadow' x='-10%' y='-50%' width='120%' height='220%'>
            <feDropShadow
              dx='0'
              dy='1'
              stdDeviation='1'
              floodColor='#1c1c1a'
              floodOpacity='0.5'
            />
          </filter>
        </defs>
        <path filter='url(#torn-shadow)' fill={fill} d={TEETH_PATH} />
      </svg>
    </div>
  );
}
