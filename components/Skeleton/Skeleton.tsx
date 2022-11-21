import React from 'react'
import { useClasses } from '@geist-ui/core'

interface SkeletonProps {
  children?: React.ReactNode,
  loading?: boolean,
  variant?: "text" | "circle" | "rectangle",
  width?: string, 
  height?: string, 
  randomWidth?: [number, number], 
  className?: string, 
  style?: React.CSSProperties, 
  title?: string
}

import styles from "./Skeleton.module.scss"

export const Skeleton = ({ children, loading = true, variant = "text", width, height = "auto-height", randomWidth, className, style, title, ...props }: SkeletonProps) => {
  const classes = useClasses(styles.skeleton, styles[variant.toString()], className )

  // Return children if we arent loading
  if (children && loading === false) {
    return <>{children}</>
  }

  if (randomWidth) {
    const [min, max] = randomWidth
    width = `${Math.random() * (max - min) + min}px`
  }

  return (
    <span
      className={classes}
      style={{ width, height, ...style }}
      title={title || 'Laster inn...'}
      {...props}
    />
  )
}

export default Skeleton
