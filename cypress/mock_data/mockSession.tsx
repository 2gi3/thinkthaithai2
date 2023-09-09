const currentDateTime = new Date();
const futureDateTime = new Date(currentDateTime.getTime() + 24 * 60 * 60 * 1000); // 24 hours in milliseconds
const newExpires = futureDateTime.toISOString();

export const mockSession = {
    user: {
        name: "giuseppe I",
        email: "gippolito@hotmail.co.uk",
        image: "https://lh3.googleusercontent.com/a/AGNmyxaPifnVXMi0RiRzfupzV_i_2sQ9otYr7gH3a7qHbg=s96-c"
    },
    expires: newExpires
}