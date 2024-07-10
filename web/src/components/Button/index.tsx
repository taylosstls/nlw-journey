import { ComponentProps, ReactNode } from "react";
import { tv, VariantProps } from 'tailwind-variants';

interface ButtonProps extends ComponentProps<'button'>,
  VariantProps<typeof buttonVariants> {
  children: ReactNode;
}

const buttonFormat = 'rounded-lg px-5 justify-center font-medium flex items-center gap-2 transition-colors duration-300'

const buttonVariants = tv({
  variants: {
    variant: {
      primary: `${buttonFormat} bg-lime-300 text-lime-950 hover:bg-lime-400`,
      secondary: `${buttonFormat} bg-zinc-800 text-zinc-200 hover:bg-zinc-700`,
      guest: 'flex items-center gap-2 flex-1 text-left',
      blank: '',
    },

    size: {
      default: 'py-2',
      full: 'w-full h-11',
      blank: '',
    }
  },

  defaultVariants: {
    variant: 'primary',
    size: 'default',
  }
})

export function Button({ children, variant, size, ...props }: ButtonProps) {
  return (
    <button className={buttonVariants({ variant, size })} {...props}>
      {children}
    </button>
  )
}