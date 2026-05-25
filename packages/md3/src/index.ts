import { ButtonRoot, ButtonIcon, ButtonLabel } from './components/Button';

export * from './core/ColorScheme';
export * from './core/MD3ComponentProps';
export * from './core/StateLayer';

export const Button = Object.assign(ButtonRoot, {
    Icon: ButtonIcon,
    Label: ButtonLabel,
});
export * from './components/Icon';