
import localizeFilter from '@/filters/localize.filter'


export default {
    logout: 'Logout',
    login: 'FirstLogin',

    'auth/user-not-found': `${localizeFilter('NoUserWithEmail')}`,
    'auth/wrong-password': `${localizeFilter('WrongPassword')}`,
    'auth/email-already-in-use': `${localizeFilter('EmailInUse')}`
}