import ListItem from '@material-ui/core/ListItem'
import { useRouter } from 'next/router'
import React from 'react'

export interface AppMenuItemComponentProps {
  className?: string
  link?: string | null // because the InferProps props allows alows null value
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
}

const AppMenuItemComponent: React.FC<AppMenuItemComponentProps> = props => {
  const { className, onClick, link, children } = props
  const router = useRouter();

  // If link is not set return the orinary ListItem
  if (!link || typeof link !== 'string') {
    return (
      <ListItem
        button
        className={className}
        children={children}
        onClick={onClick}
      />
    )
  }

  // Return a LitItem with a link component
  return (
    <ListItem
      button
      className={className}
      children={children}
      onClick={()=>router.push(link)}      
    />
  )
}

export default AppMenuItemComponent
