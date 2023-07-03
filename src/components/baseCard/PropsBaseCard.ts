import { IPropsBaseCard } from 'components/baseCard/BaseCard.vue'

const PropsBaseCard: IPropsBaseCard = {
  title: '',
  subtitle: '',
  loading: true,
  avatar: false,
  avatarColor: '',
  avatarIcon: '',
  avatarIconSize: 'md',
  closeButton: false,
  headerSeparator: true,
  bodySeparator: false,
  formValidation: false,
  showActions: false,
  actionsAlign: 'right', // right, left, center
  cancelBtn: true,
  cancelBtnLabel: 'Cancelar',
  acceptBtnLabel: 'Aceptar',
  width: '600px',
  showAlertErrors: false,
  formSubmit: false
}

export default PropsBaseCard
