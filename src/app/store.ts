import { create } from 'zustand'
import * as O from 'optics-ts'

import { immer } from 'zustand/middleware/immer'
import { Models } from 'appwrite'

type State = {
    isLoggedIn: boolean
    u_email: string
    u_pass: string
    u_name:  Models.User<Models.Preferences> | null

    loadingStates: loadingStates

    meta: userMetaData
}

type loadingStates = {
    loginLoading: boolean
    signoutLoading: boolean
    logoutLoading: boolean
}

type userMetaData = {
    isTeamsDone: boolean
}

type Action = {
    update_isLoggedIn: (bool: State["isLoggedIn"]) => void
    update_email: (email: State["u_email"]) => void
    update_pass: (pass: State["u_pass"]) => void
    update_name: (name: State["u_name"]) => void
    // meta handlers
    update_isTeamDone: (bool: State["meta"]["isTeamsDone"]) => void

    // // update loading staes
    // update_is_loginLoading: (bool: boolean) => void
    // update_is_signoutLoading: (bool: boolean) => void
    // update_is_logoutLoading: (bool: boolean) => void
}

const defState: State = {
    isLoggedIn: false,
    u_email: "",
    u_pass: "",
    u_name: null,

    loadingStates: {
        loginLoading: false,
        signoutLoading: false,
        logoutLoading: false
    },

    meta: {
        isTeamsDone: false
    }
}

const metaOptic = O.optic_<State>().prop("meta").prop("isTeamsDone")

// why its named as stateOptic?: cause i was using Optic and i didnt got a good name
const stateOptic = create<State & Action>((set) => ({
    ...defState,
    update_isTeamDone: (bool) => set(O.modify(metaOptic)((b) => b = bool)),
    update_isLoggedIn: (bool) => set((state) => ({isLoggedIn: !state.isLoggedIn})),
    update_name: (name) => set(() => ({u_name: name})),
    update_email: (email) => set(() => ({u_email: email})),
    update_pass: (pass) => set(() => ({u_pass: pass}))
}))


export { stateOptic }
