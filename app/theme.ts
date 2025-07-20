import { createTheme, DEFAULT_THEME } from "@mantine/core";
import { openSans } from "./font";

const theme = createTheme({
    fontFamily: `${openSans.style.fontFamily}`,
    fontFamilyMonospace: `${openSans.style.fontFamily}, Monaco, Courier, monospace`,
    headings: {
        fontFamily: `${openSans.style.fontFamily}, ${DEFAULT_THEME.fontFamily}`,
    },
    breakpoints: {
        xs: "40em",
        sm: "48em",
        md: "64em",
        lg: "80rem",
        xl: "96rem",
    },
});

export default theme;