import { Hct, TonalPalette } from "@material/material-color-utilities";

export type ColorRole =
    | 'primary'
    | 'onPrimary'
    | 'primaryContainer'
    | 'onPrimaryContainer'
    | 'secondary'
    | 'onSecondary'
    | 'secondaryContainer'
    | 'onSecondaryContainer'
    | 'tertiary'
    | 'onTertiary'
    | 'tertiaryContainer'
    | 'onTertiaryContainer'
    | 'error'
    | 'onError'
    | 'errorContainer'
    | 'onErrorContainer'
    | 'surface'
    | 'onSurface'
    | 'onSurfaceVariant'
    | 'surfaceContainerHighest'
    | 'surfaceContainerHigh'
    | 'surfaceContainer'
    | 'surfaceContainerLow'
    | 'surfaceContainerLowest'
    | 'inverseSurface'
    | 'inverseOnSurface'
    | 'outline'
    | 'outlineVariant'
    | 'primaryFixed'
    | 'onPrimaryFixed'
    | 'primaryFixedDim'
    | 'onPrimaryFixedVariant'
    | 'inversePrimary'
    | 'secondaryFixed'
    | 'onSecondaryFixed'
    | 'secondaryFixedDim'
    | 'onSecondaryFixedVariant'
    | 'tertiaryFixed'
    | 'onTertiaryFixed'
    | 'tertiaryFixedDim'
    | 'onTertiaryFixedVariant'
    | 'surfaceBright'
    | 'surfaceDim'
    | 'scrim'
    | 'shadow';

export type ColorRoleValues = Record<ColorRole, number>;

export type ColorSchemeData = Record<'light' | 'dark', Record<'standard' | 'medium' | 'high', ColorRoleValues>>;

export class ColorScheme {

    private data: ColorSchemeData;

    constructor(data: ColorSchemeData) {
        this.data = data;
    }

    colorRoleValuesFor(
        theme: 'light' | 'dark',
        contrast: 'standard' | 'medium' | 'high'
    ): ColorRoleValues {
        return this.data[theme][contrast];
    }

    colorFor(
        role: ColorRole,
        theme: 'light' | 'dark' = 'light',
        contrast: 'standard' | 'medium' | 'high' = 'standard'
    ): number {
        return this.data[theme][contrast][role];
    }

    toData(): ColorSchemeData {
        return this.data;
    }

    static fromSourceColorArgb(
        sourceColorArgb: number,
        // dynamicScheme?: never,
        // usesColorFidelity?: never
    ): ColorScheme {
        const sourceColorHct = Hct.fromInt(sourceColorArgb);

        // key color를 추출하지 않는 이유:
        // key color는 source color의 hue 및 각 key color 고유의 chroma 값을 가지며, 이 두 값만을 가지고
        // tonal palette를 생성하기 때문에 tone 값은 의미가 없음. 그러나 사용자가 직관적으로 색을 인지할 수 있도록,
        // T50에 가장 가까운 tone을 지정하여 보여주는 것에 불과함.

        // dynamic scheme에 따라 각 팔레트의 hue 및 chroma 결정 방식이 달라지나, 나중에 구현
        const palettePrimary = TonalPalette.fromHueAndChroma(sourceColorHct.hue, 48);
        const paletteSecondary = TonalPalette.fromHueAndChroma(sourceColorHct.hue, 16);
        const paletteTertiary = TonalPalette.fromHueAndChroma((sourceColorHct.hue + 60) % 360, 24);
        const paletteNeutral = TonalPalette.fromHueAndChroma(sourceColorHct.hue, 4);
        const paletteNeutralVariant = TonalPalette.fromHueAndChroma(sourceColorHct.hue, 8);

        return new ColorScheme({
            light: {
                standard: {
                    primary: palettePrimary.tone(40),
                    onPrimary: palettePrimary.tone(100),
                    primaryContainer: palettePrimary.tone(90),
                    onPrimaryContainer: palettePrimary.tone(30),
                    secondary: paletteSecondary.tone(40),
                    onSecondary: paletteSecondary.tone(100),
                    secondaryContainer: paletteSecondary.tone(90),
                    onSecondaryContainer: paletteSecondary.tone(30),
                    tertiary: paletteTertiary.tone(40),
                    onTertiary: paletteTertiary.tone(100),
                    tertiaryContainer: paletteTertiary.tone(90),
                    onTertiaryContainer: paletteTertiary.tone(30),
                    error: 0xffb3261e, // paletteError.tone(40)
                    onError: 0xffffffff, // paletteError.tone(100)
                    errorContainer: 0xfff9dedc, // paletteError.tone(90)
                    onErrorContainer: 0xff8c1d18, // paletteError.tone(30)
                    surface: paletteNeutral.tone(98),
                    onSurface: paletteNeutral.tone(10),
                    onSurfaceVariant: paletteNeutralVariant.tone(30),
                    surfaceContainerHighest: paletteNeutral.tone(90),
                    surfaceContainerHigh: paletteNeutral.tone(92),
                    surfaceContainer: paletteNeutral.tone(94),
                    surfaceContainerLow: paletteNeutral.tone(96),
                    surfaceContainerLowest: paletteNeutral.tone(100),
                    inverseSurface: paletteNeutral.tone(20),
                    inverseOnSurface: paletteNeutral.tone(95),
                    outline: paletteNeutralVariant.tone(50),
                    outlineVariant: paletteNeutralVariant.tone(80),
                    primaryFixed: palettePrimary.tone(90),
                    primaryFixedDim: palettePrimary.tone(80),
                    onPrimaryFixed: palettePrimary.tone(10),
                    onPrimaryFixedVariant: palettePrimary.tone(30),
                    inversePrimary: palettePrimary.tone(80),
                    secondaryFixed: paletteSecondary.tone(90),
                    secondaryFixedDim: paletteSecondary.tone(80),
                    onSecondaryFixed: paletteSecondary.tone(10),
                    onSecondaryFixedVariant: paletteSecondary.tone(30),
                    tertiaryFixed: paletteTertiary.tone(90),
                    tertiaryFixedDim: paletteTertiary.tone(80),
                    onTertiaryFixed: paletteTertiary.tone(10),
                    onTertiaryFixedVariant: paletteTertiary.tone(30),
                    surfaceBright: paletteNeutral.tone(98),
                    surfaceDim: paletteNeutral.tone(87),
                    scrim: 0xff000000, // paletteNeutral.tone(0)
                    shadow: 0xff000000, // paletteNeutral.tone(0)
                },
                medium: {
                    primary: palettePrimary.tone(30),
                    onPrimary: palettePrimary.tone(100),
                    primaryContainer: palettePrimary.tone(40),
                    onPrimaryContainer: palettePrimary.tone(100),
                    secondary: paletteSecondary.tone(30),
                    onSecondary: paletteSecondary.tone(100),
                    secondaryContainer: paletteSecondary.tone(40),
                    onSecondaryContainer: paletteSecondary.tone(100),
                    tertiary: paletteTertiary.tone(30),
                    onTertiary: paletteTertiary.tone(100),
                    tertiaryContainer: paletteTertiary.tone(40),
                    onTertiaryContainer: paletteTertiary.tone(100),
                    error: 0xff8c1d18, // paletteError.tone(30)
                    onError: 0xffffffff, // paletteError.tone(100)
                    errorContainer: 0xffb3261e, // paletteError.tone(40)
                    onErrorContainer: 0xffffffff, // paletteError.tone(100),
                    surface: paletteNeutral.tone(98),
                    onSurface: paletteNeutral.tone(0),
                    onSurfaceVariant: paletteNeutralVariant.tone(20),
                    surfaceContainerHighest: paletteNeutral.tone(90),
                    surfaceContainerHigh: paletteNeutral.tone(92),
                    surfaceContainer: paletteNeutral.tone(94),
                    surfaceContainerLow: paletteNeutral.tone(96),
                    surfaceContainerLowest: paletteNeutral.tone(100),
                    inverseSurface: paletteNeutral.tone(20),
                    inverseOnSurface: paletteNeutral.tone(100),
                    outline: paletteNeutralVariant.tone(30),
                    outlineVariant: paletteNeutralVariant.tone(50),
                    primaryFixed: palettePrimary.tone(40),
                    onPrimaryFixed: palettePrimary.tone(100),
                    primaryFixedDim: palettePrimary.tone(30),
                    onPrimaryFixedVariant: palettePrimary.tone(100),
                    inversePrimary: palettePrimary.tone(80),
                    secondaryFixed: paletteSecondary.tone(40),
                    onSecondaryFixed: paletteSecondary.tone(100),
                    secondaryFixedDim: paletteSecondary.tone(30),
                    onSecondaryFixedVariant: paletteSecondary.tone(100),
                    tertiaryFixed: paletteTertiary.tone(40),
                    onTertiaryFixed: paletteTertiary.tone(100),
                    tertiaryFixedDim: paletteTertiary.tone(30),
                    onTertiaryFixedVariant: paletteTertiary.tone(100),
                    surfaceBright: paletteNeutral.tone(98),
                    surfaceDim: paletteNeutral.tone(87),
                    scrim: 0xff000000, // paletteNeutral.tone(0)
                    shadow: 0xff000000, // paletteNeutral.tone(0)
                },
                high: {
                    primary: palettePrimary.tone(20),
                    onPrimary: palettePrimary.tone(100),
                    primaryContainer: palettePrimary.tone(30),
                    onPrimaryContainer: palettePrimary.tone(100),
                    secondary: paletteSecondary.tone(20),
                    onSecondary: paletteSecondary.tone(100),
                    secondaryContainer: paletteSecondary.tone(30),
                    onSecondaryContainer: paletteSecondary.tone(100),
                    tertiary: paletteTertiary.tone(20),
                    onTertiary: paletteTertiary.tone(100),
                    tertiaryContainer: paletteTertiary.tone(30),
                    onTertiaryContainer: paletteTertiary.tone(100),
                    error: 0xff601410, // paletteError.tone(20)
                    onError: 0xffffffff, // paletteError.tone(100)
                    errorContainer: 0xff8c1d18, // paletteError.tone(30)
                    onErrorContainer: 0xffffffff, // paletteError.tone(100)
                    surface: paletteNeutral.tone(98),
                    onSurface: paletteNeutral.tone(0),
                    onSurfaceVariant: paletteNeutralVariant.tone(0),
                    surfaceContainerHighest: paletteNeutral.tone(90),
                    surfaceContainerHigh: paletteNeutral.tone(92),
                    surfaceContainer: paletteNeutral.tone(94),
                    surfaceContainerLow: paletteNeutral.tone(96),
                    surfaceContainerLowest: paletteNeutral.tone(100),
                    inverseSurface: paletteNeutral.tone(20),
                    inverseOnSurface: paletteNeutral.tone(100),
                    outline: paletteNeutralVariant.tone(20),
                    outlineVariant: paletteNeutralVariant.tone(30),
                    primaryFixed: palettePrimary.tone(30),
                    onPrimaryFixed: palettePrimary.tone(100),
                    primaryFixedDim: palettePrimary.tone(20),
                    onPrimaryFixedVariant: palettePrimary.tone(100),
                    inversePrimary: palettePrimary.tone(80),
                    secondaryFixed: paletteSecondary.tone(30),
                    onSecondaryFixed: paletteSecondary.tone(100),
                    secondaryFixedDim: paletteSecondary.tone(20),
                    onSecondaryFixedVariant: paletteSecondary.tone(100),
                    tertiaryFixed: paletteTertiary.tone(30),
                    onTertiaryFixed: paletteTertiary.tone(100),
                    tertiaryFixedDim: paletteTertiary.tone(20),
                    onTertiaryFixedVariant: paletteTertiary.tone(100),
                    surfaceBright: paletteNeutral.tone(98),
                    surfaceDim: paletteNeutral.tone(87),
                    scrim: 0xff000000, // paletteNeutral.tone(0)
                    shadow: 0xff000000, // paletteNeutral.tone(0)
                }
            },
            dark: {
                standard: {
                    primary: palettePrimary.tone(80),
                    onPrimary: palettePrimary.tone(20),
                    primaryContainer: palettePrimary.tone(30),
                    onPrimaryContainer: palettePrimary.tone(90),
                    secondary: paletteSecondary.tone(80),
                    onSecondary: paletteSecondary.tone(20),
                    secondaryContainer: paletteSecondary.tone(30),
                    onSecondaryContainer: paletteSecondary.tone(90),
                    tertiary: paletteTertiary.tone(80),
                    onTertiary: paletteTertiary.tone(20),
                    tertiaryContainer: paletteTertiary.tone(30),
                    onTertiaryContainer: paletteTertiary.tone(90),
                    error: 0xfff2b8b5, // paletteError.tone(80)
                    onError: 0xff601410, // paletteError.tone(20)
                    errorContainer: 0xff8c1d18, // paletteError.tone(30)
                    onErrorContainer: 0xfff9dedc, // paletteError.tone(90)
                    surface: paletteNeutral.tone(6),
                    onSurface: paletteNeutral.tone(90),
                    onSurfaceVariant: paletteNeutralVariant.tone(80),
                    surfaceContainerHighest: paletteNeutral.tone(22),
                    surfaceContainerHigh: paletteNeutral.tone(17),
                    surfaceContainer: paletteNeutral.tone(12),
                    surfaceContainerLow: paletteNeutral.tone(10),
                    surfaceContainerLowest: paletteNeutral.tone(4),
                    inverseSurface: paletteNeutral.tone(90),
                    inverseOnSurface: paletteNeutral.tone(20),
                    outline: paletteNeutralVariant.tone(60),
                    outlineVariant: paletteNeutralVariant.tone(30),
                    primaryFixed: palettePrimary.tone(90),
                    onPrimaryFixed: palettePrimary.tone(10),
                    primaryFixedDim: palettePrimary.tone(80),
                    onPrimaryFixedVariant: palettePrimary.tone(30),
                    inversePrimary: palettePrimary.tone(40),
                    secondaryFixed: paletteSecondary.tone(90),
                    onSecondaryFixed: paletteSecondary.tone(10),
                    secondaryFixedDim: paletteSecondary.tone(80),
                    onSecondaryFixedVariant: paletteSecondary.tone(30),
                    tertiaryFixed: paletteTertiary.tone(90),
                    onTertiaryFixed: paletteTertiary.tone(10),
                    tertiaryFixedDim: paletteTertiary.tone(80),
                    onTertiaryFixedVariant: paletteTertiary.tone(30),
                    surfaceBright: paletteNeutral.tone(24),
                    surfaceDim: paletteNeutral.tone(6),
                    scrim: 0xff000000, // paletteNeutral.tone(0)
                    shadow: 0xff000000, // paletteNeutral.tone(0)
                },
                medium: {
                    primary: palettePrimary.tone(90),
                    onPrimary: palettePrimary.tone(10),
                    primaryContainer: palettePrimary.tone(60),
                    onPrimaryContainer: palettePrimary.tone(0),
                    secondary: paletteSecondary.tone(90),
                    onSecondary: paletteSecondary.tone(10),
                    secondaryContainer: paletteSecondary.tone(60),
                    onSecondaryContainer: paletteSecondary.tone(0),
                    tertiary: paletteTertiary.tone(90),
                    onTertiary: paletteTertiary.tone(10),
                    tertiaryContainer: paletteTertiary.tone(60),
                    onTertiaryContainer: paletteTertiary.tone(0),
                    error: 0xfff9dedc, // paletteError.tone(90)
                    onError: 0xff410e0b, // paletteError.tone(10)
                    errorContainer: 0xffe46962, // paletteError.tone(60)
                    onErrorContainer: 0xff000000, // paletteError.tone(0)
                    surface: paletteNeutral.tone(6),
                    onSurface: paletteNeutral.tone(100),
                    onSurfaceVariant: paletteNeutralVariant.tone(90),
                    surfaceContainerHighest: paletteNeutral.tone(22),
                    surfaceContainerHigh: paletteNeutral.tone(17),
                    surfaceContainer: paletteNeutral.tone(12),
                    surfaceContainerLow: paletteNeutral.tone(10),
                    surfaceContainerLowest: paletteNeutral.tone(4),
                    inverseSurface: paletteNeutral.tone(90),
                    inverseOnSurface: paletteNeutral.tone(10),
                    outline: paletteNeutralVariant.tone(70),
                    outlineVariant: paletteNeutralVariant.tone(60),
                    primaryFixed: palettePrimary.tone(90),
                    onPrimaryFixed: palettePrimary.tone(0),
                    primaryFixedDim: palettePrimary.tone(80),
                    onPrimaryFixedVariant: palettePrimary.tone(20),
                    inversePrimary: palettePrimary.tone(30),
                    secondaryFixed: paletteSecondary.tone(90),
                    onSecondaryFixed: paletteSecondary.tone(0),
                    secondaryFixedDim: paletteSecondary.tone(80),
                    onSecondaryFixedVariant: paletteSecondary.tone(20),
                    tertiaryFixed: paletteTertiary.tone(90),
                    onTertiaryFixed: paletteTertiary.tone(0),
                    tertiaryFixedDim: paletteTertiary.tone(80),
                    onTertiaryFixedVariant: paletteTertiary.tone(20),
                    surfaceBright: paletteNeutral.tone(24),
                    surfaceDim: paletteNeutral.tone(6),
                    scrim: 0xff000000, // paletteNeutral.tone(0)
                    shadow: 0xff000000, // paletteNeutral.tone(0)
                },
                high: {
                    primary: palettePrimary.tone(95),
                    onPrimary: palettePrimary.tone(0),
                    primaryContainer: palettePrimary.tone(80),
                    onPrimaryContainer: palettePrimary.tone(0),
                    secondary: paletteSecondary.tone(95),
                    onSecondary: paletteSecondary.tone(0),
                    secondaryContainer: paletteSecondary.tone(80),
                    onSecondaryContainer: paletteSecondary.tone(0),
                    tertiary: paletteTertiary.tone(95),
                    onTertiary: paletteTertiary.tone(0),
                    tertiaryContainer: paletteTertiary.tone(80),
                    onTertiaryContainer: paletteTertiary.tone(0),
                    error: 0xfffceeee, // paletteError.tone(95)
                    onError: 0xff000000, // paletteError.tone(0)
                    errorContainer: 0xfff2b8b5, // paletteError.tone(80)
                    onErrorContainer: 0xff000000, // paletteError.tone(0)
                    surface: paletteNeutral.tone(6),
                    onSurface: paletteNeutral.tone(100),
                    onSurfaceVariant: paletteNeutralVariant.tone(100),
                    surfaceContainerHighest: paletteNeutral.tone(22),
                    surfaceContainerHigh: paletteNeutral.tone(17),
                    surfaceContainer: paletteNeutral.tone(12),
                    surfaceContainerLow: paletteNeutral.tone(10),
                    surfaceContainerLowest: paletteNeutral.tone(4),
                    inverseSurface: paletteNeutral.tone(90),
                    inverseOnSurface: paletteNeutral.tone(0),
                    outline: paletteNeutralVariant.tone(95),
                    outlineVariant: paletteNeutralVariant.tone(80),
                    primaryFixed: palettePrimary.tone(90),
                    onPrimaryFixed: palettePrimary.tone(0),
                    primaryFixedDim: palettePrimary.tone(80),
                    onPrimaryFixedVariant: palettePrimary.tone(0),
                    inversePrimary: palettePrimary.tone(20),
                    secondaryFixed: paletteSecondary.tone(90),
                    onSecondaryFixed: paletteSecondary.tone(0),
                    secondaryFixedDim: paletteSecondary.tone(80),
                    onSecondaryFixedVariant: paletteSecondary.tone(0),
                    tertiaryFixed: paletteTertiary.tone(90),
                    onTertiaryFixed: paletteTertiary.tone(0),
                    tertiaryFixedDim: paletteTertiary.tone(80),
                    onTertiaryFixedVariant: paletteTertiary.tone(0),
                    surfaceBright: paletteNeutral.tone(24),
                    surfaceDim: paletteNeutral.tone(6),
                    scrim: 0xff000000, // paletteNeutral.tone(0)
                    shadow: 0xff000000, // paletteNeutral.tone(0)
                }
            }
        })
    }

    static fromKeyColors(
        primaryArgb: number, 
        secondaryArgb: number, 
        tertiaryArgb: number, 
        neutralArgb: number, 
        neutralVariantArgb: number
    ): void /* ColorScheme */ {
        // TODO
    }

}