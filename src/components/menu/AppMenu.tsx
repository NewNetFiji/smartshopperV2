import { createStyles, makeStyles } from '@material-ui/core'
import List from '@material-ui/core/List'
import IconBarChart from '@material-ui/icons/BarChart'
import IconDashboard from '@material-ui/icons/Dashboard'
import IconLibraryBooks from '@material-ui/icons/LibraryBooks'
import IconPeople from '@material-ui/icons/People'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import IconShoppingCart from '@material-ui/icons/ShoppingCart'
import React from 'react'
import AppMenuItem from './AppMenuItem'
import DeleteIcon from '@material-ui/icons/Delete';
import PostAddIcon from '@material-ui/icons/PostAdd';

const drawerWidth = 240

const useStyles = makeStyles(theme =>
  createStyles({
    appMenu: {
      width: '100%',
    },
    navList: {
      width: drawerWidth,
    },
    menuItem: {
      width: drawerWidth,
    },
    menuItemIcon: {
      color: theme.palette.secondary.main,
    },
  }),
)


const appMenuItems = [
  {
    name: 'Dashboard',
    link: '/',
    Icon: IconDashboard,
  },
  {
    name: 'Orders',
    link: '/orders',
    Icon: IconShoppingCart,
  },
  {
    name: 'Users',    
    Icon: IconPeople,
    items: [
      {
        name: 'Add Users',
        link: '/addUsers',
        Icon: PersonAddIcon
      },
      {
        name: 'Delete User',
        link: '/deleteUsers',
        Icon: DeleteIcon
      }      
      ]
  },
  {
    name: 'Reports',
    link: '/reports',
    Icon: IconBarChart,
  },
  {
    name: 'Products',
    Icon: IconLibraryBooks,
    items: [
      {
        name: 'Create Products',
        link: '/createProduct',
        Icon: PostAddIcon

      },
      {
        name: 'Delete Products',
        link: '/deleteProduct',
        Icon: DeleteIcon

      }
      
    ],
  },
]

const AppMenu: React.FC = () => {
  const classes = useStyles()

  return (
    <List component="nav" className={classes.appMenu} disablePadding>
      {/* <AppMenuItem {...appMenuItems[0]} /> */}
      {appMenuItems.map((item, index) => (
        <AppMenuItem {...item} key={index} />
      ))}
    </List>
  )
}

export default AppMenu
