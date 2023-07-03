import { IMainMenuItemProps } from 'src/modules/settings/components/MainMenuItems.vue'

const MainMenuItems:IMainMenuItemProps[] = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    routeName: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    routeName: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    routeName: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    routeName: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    routeName: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    routeName: 'https://facebook.quasar.dev'
  },
  {
    title: 'Sales',
    caption: 'Sales manage',
    icon: 'fa fa-file-invoice-dollar',
    routeName: 'Sales'
  },
  {
    type: 'separator'
  },
  {
    title: 'Inventory',
    type: 'label'
  },
  {
    title: 'Products',
    caption: 'Products manage',
    icon: 'fa fa-cubes',
    routeName: 'Products'
  },
  {
    title: 'Categories',
    caption: 'Categories manage',
    icon: 'category',
    routeName: 'Categories'
  },
  {
    type: 'separator'
  },
  {
    title: 'Cards',
    caption: 'Cards manage',
    icon: 'credit_card',
    routeName: 'Cards'
  },
  {
    title: 'Members',
    caption: 'Members manage',
    icon: 'account_box',
    routeName: 'Members'
  },
  {
    title: 'Labels',
    caption: 'Labels manage',
    icon: 'label',
    routeName: 'Labels'
  },
  {
    title: 'Grades',
    caption: 'Grades manage',
    icon: 'format_list_numbered',
    routeName: 'Grades'
  },
  {
    title: 'Courses',
    caption: 'Courses manage',
    icon: 'groups',
    routeName: 'Courses'
  },
  {
    title: 'Users',
    caption: 'users manage',
    icon: 'manage_accounts',
    routeName: 'Users'
  },
  {
    title: 'Roles',
    caption: 'roles manage',
    icon: 'settings_accessibility',
    routeName: 'Roles'
  }
]

export default MainMenuItems
