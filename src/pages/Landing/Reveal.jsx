import { useScrollReveal } from '../../hooks/useScrollReveal.js';

/**
 * Thin wrapper that fades/slides its children in once they scroll into
 * view. `delay` is in ms and just staggers children of the same group.
 */
export function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useScrollReveal();
  return (
    <Tag
      ref={ref}
      data-reveal
      className={className}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
