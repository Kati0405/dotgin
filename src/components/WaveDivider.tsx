type WaveDividerProps = {
  /** Color the torn edge reveals below (the next section's background). */
  fill?: string;
  /** Flip vertically — use when the torn edge should read as the top of a section. */
  flip?: boolean;
  className?: string;
};

/**
 * Irregular torn-paper edge. The jagged path (not a clean sine wave) plus a
 * soft drop-shadow filter is what sells the "ripped paper" read rather than
 * a scalloped/wave border.
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
              dy='6'
              stdDeviation='6'
              floodColor='#1c1c1a'
              floodOpacity='0.45'
            />
          </filter>
        </defs>
        <path
          filter='url(#torn-shadow)'
          fill={fill}
          d='M0,30
             L22,24 L48,33 L71,20 L95,29 L118,16 L146,27 L169,19
             L196,31 L221,22 L247,30 L272,17 L299,26 L324,14
             L350,25 L378,31 L402,21 L429,28 L455,18 L481,30
             L507,23 L533,32 L560,20 L586,27 L611,16 L638,29
             L664,22 L690,31 L716,19 L742,26 L768,15 L795,28
             L820,21 L847,30 L873,24 L899,32 L925,18 L951,27
             L977,22 L1003,31 L1029,20 L1055,28 L1081,16 L1107,29
             L1133,23 L1159,31 L1200,25
             L1200,80 L0,80 Z'
        />
      </svg>
    </div>
  );
}
