import isEmpty from "lodash.isempty"

const THEME_LIGHT = "light"
const THEME_NIGHT = "dark"
const THEME_COOKIE_NAME = "theme"


const SET_THEME = "SET_THEME"

/**
 * Toggle theme between light and night
 * @param {"light"|"dark"} theme
 * @returns
 */
function toggleTheme(theme) {
    return theme === THEME_LIGHT
        ? THEME_NIGHT
        : THEME_LIGHT
}

/**
 * Set theme to cookie
 * @param {*} $cookies
 * @param {string} theme
 */
function setTheme($cookies, theme) {
    $cookies.set(THEME_COOKIE_NAME, theme)
}

/**
 * Get theme from cookie or default
 * @param {*} $cookies
 * @returns
 */
function getTheme($cookies) {
    let theme = $cookies.get(THEME_COOKIE_NAME)
    if (isEmpty(theme)) {
        theme = THEME_LIGHT
        setTheme($cookies, theme)
    }

    return theme
}

export const state = () => ({
    theme: THEME_LIGHT
})

export const getters = {
    getTheme(state) {
        return state.theme
    }
}

export const mutations = {
    [SET_THEME](state, theme) {
        state.theme = theme
    }
}

export const actions = {
    init({ commit }) {
        const theme = getTheme(this.$cookies)
        commit(SET_THEME, theme)
    },
    toggle({ commit, state }) {
        const theme = toggleTheme(state.theme)
        commit(SET_THEME, theme)
    },
    setTheme({ commit }, payload) {
        commit(SET_THEME, payload)
    },
}
