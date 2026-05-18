export type MD3ComponentProps = {
    containerStyle?: React.CSSProperties;
    containerClassName?: string;
};

export type MD3InteractiveComponentProps = MD3ComponentProps & {
    stateLayerStyle?: React.CSSProperties;
    stateLayerClassName?: string;
    ripple?: boolean;
}