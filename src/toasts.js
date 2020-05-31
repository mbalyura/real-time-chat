import { toast } from 'react-toastify';
import i18next from 'i18next';

export const showSuccesToast = (text) => toast(i18next.t(text), { className: 'alert alert-success' });
export const showDangerToast = (text) => toast(i18next.t(text), { className: 'alert alert-danger' });
