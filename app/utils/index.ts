export const changeTheme = (color: string) => {
    const colorLevel = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
    colorLevel.forEach((item) => {
        document.documentElement.style.setProperty(
            `--ui-color-primary-${item}`,
            `var(--color-${color}-${item})`
        );
    });
};
