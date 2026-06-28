import './styles.css';

import { ButtonRoot, ButtonIcon, ButtonLabel } from './components/Button';

/* ---------------------------------- core ---------------------------------- */
export * from './core/ColorScheme';
export * from './core/MD3ComponentProps';
export * from './core/MD3Provider';
export { useMD3Context } from './core/MD3ScopeContextProvider';
export * from './core/StateLayer';

/* ------------------------------- components ------------------------------- */
export * from './components/Badge';
export const Button = Object.assign(ButtonRoot, {
    Icon: ButtonIcon,
    Label: ButtonLabel,
});
export * from './components/Icon';