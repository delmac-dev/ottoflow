import { createTheme, DEFAULT_THEME } from "@mantine/core";
import { geistSans } from "./font";

const theme = createTheme({
    fontFamily: `${geistSans.style.fontFamily}`,
    fontFamilyMonospace: `${geistSans.style.fontFamily}, Monaco, Courier, monospace`,
    headings: {
        fontFamily: `${geistSans.style.fontFamily}, ${DEFAULT_THEME.fontFamily}`,
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