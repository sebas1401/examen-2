import { motion } from 'framer-motion';
import type { PropsWithChildren, ComponentPropsWithoutRef } from 'react';

type Props = PropsWithChildren<ComponentPropsWithoutRef<typeof motion.button>> & { className?: string };

export default function Button({ children, className = '', ...rest }: Props) {
  return (
    <motion.button
      whileHover={{ scale: 1.035, y: -2 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: 'spring', stiffness: 300, damping: 18, mass: 0.4 }}
      className={`btn btn--shine ${className}`} {...rest}
    >
      {children}
    </motion.button>
  );
}
